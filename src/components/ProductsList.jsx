import React, { useMemo, useState } from 'react';
//style
import "../styles/productsList.scss";
//components
import Product from './Product';

const PAGE_LIMIT = 10;

export default function ProductsList({ selectedCategory, filterProducts }) {
    const [activePage, setActivePage] = useState(0);

    const products = filterProducts;

    const filteredProducts = selectedCategory && selectedCategory !== "all"
        ? products.filter(product => product.product.category.alt && product.product.category.alt === selectedCategory)
        : products;


    const { pagItems, pagStart, pagEnd } = useMemo(() => {
        if (!filteredProducts) {
            return {
                pagItems: [],
                pagStart: 0,
                pagEnd: 0,
            };
        }

        const PageLimit = Math.ceil(filteredProducts.length / PAGE_LIMIT);
        const pagItems = [];

        for (let index = 0; index < PageLimit; index++) {
            pagItems.push(
                <button
                    key={index}
                    onClick={() => setActivePage(index)}
                    className={activePage === index ? 'active' : ''}
                >
                    {index + 1}
                </button>
            );
        }

        const pagStart = activePage * PAGE_LIMIT;
        const pagEnd = pagStart + PAGE_LIMIT;

        return {
            pagItems,
            pagStart,
            pagEnd,
        }
    },);

    return (
        <div className='productsList' id="productsList">
            <div className="productsList__container">
                <h1 className="productsList__title">Оголошення</h1>
                {filteredProducts?.length > 0 ? (
                    <>
                        <ul className="productsList__products">
                            {filteredProducts.slice(pagStart, pagEnd).map((product) => (
                                <Product
                                    key={product.uid}
                                    product={product}
                                // loading={loading}
                                />
                            ))}
                        </ul>
                        <p className="productsList__pagination">{pagItems}</p>
                    </>
                ) : <h2 className='productsList__title-h2 title-h2'>Оголошень незнайдено</h2>
                }
            </div>
        </div>
    );

}
