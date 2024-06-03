import React, { useContext } from 'react';
import "../styles/profilePages.scss";
import Product from '../components/Product';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';

export default function ProfilePages() {
  const { auth, firestore } = useContext(Context);

  const [user] = useAuthState(auth);

  const products=[];
  return (
    <div className='profilePages'>
      <div className='profilePages__ti'>
        <h1 className='profilePages__title'>{user.displayName}</h1>
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
