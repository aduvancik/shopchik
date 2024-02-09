import React, { useEffect, useMemo, useState } from 'react';
//style
import "../styles/productsList.scss";
//components
import Product from './Product';
import { products } from '../listProducts';


const PAGE_LIMIT = 2;

export default function ProductsList({ selectedCategory }) {
    const [activePage, setActivePage] = useState(0);

    const filteredProducts = selectedCategory && selectedCategory !== "all"
        ? products.filter(product => product.categories === selectedCategory)
        : products;

    const { pagItems, pagStart, pagEnd} = useMemo(() => {
        const PageLimit = Math.ceil(filteredProducts.length / PAGE_LIMIT);
        const pagItems = [];

        for (let index = 0; index < PageLimit; index++) {
            pagItems.push(
                <button
                key={index}
                onClick={() => setActivePage(index)}
                className={activePage === index ? 'active' : ''}
                >
                    {index+1}
                </button>
            )  
        }
        const pagStart = activePage * PAGE_LIMIT;
        const pagEnd = pagStart + PAGE_LIMIT;
        let i = 1;
        console.log(i+1,"l",activePage);
        return{
            pagItems,
            pagStart,
            pagEnd,
        };
    }, [activePage, filteredProducts.length])


    return (
        <div className='productsList'>
            <div className="productsList__container">
                <h1 className="productsList__title">Оголошення</h1>
                <ul className="productsList__products">
                    {filteredProducts.slice(pagStart, pagEnd).map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    ))}
                </ul>
                <p className="productsList__pagination">{pagItems}</p>
            </div>
        </div>
    );
}
