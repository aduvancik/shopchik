import React from 'react';
import "../styles/profilePages.scss";
import Product from '../components/Product';

export default function ProfilePages({products}) {
  return (
    <div className='profilePages'>
      <div className='profilePages__ti'>
        <h1 className='profilePages__title'>Олег Кривогуб</h1>
        <div className='productsList' id="productsList">
            <div className="productsList__container">
                <h1 className="productsList__title">Ваші оголошення</h1>
                {products?.length > 0 ? (
                    <>
                        <ul className="productsList__products">
                            {products.map((product) => (
                                <Product
                                    key={product.uid}
                                    product={product}
                                />
                            ))}
                        </ul>
                    </>
                ) : <h2 className='productsList__title-h2 title-h2'>Оголошень незнайдено</h2>
                }
            </div>
        </div>
      </div>
    </div>
  )
}
