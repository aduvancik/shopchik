import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//components
import DescriptionProduct from '../components/containerProduct/DescriptionProduct';
import Salesman from '../components/containerProduct/Salesman';
import Slidere from '../components/containerProduct/Slider';
import Modal from '../components/Modal';
//style
import "../styles/productPages.scss";
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ProductPages() {
  const location = useLocation();
  const product = location.state && location.state.product;
  const [error, setError] = useState(false);
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [viewCount, setViewCount] = useState(0);
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    if (!product || !user) return;

    const productRef = firestore.collection("products").doc(product.uid);

    const addView = async () => {
      try {
        const productDoc = await productRef.get();
        if (productDoc.exists) {
          const productData = productDoc.data();
          const views = productData.view || [];
          const baskets = productData.basket || [];

          if (!views.includes(user.uid)) {
            views.push(user.uid);
            await productRef.update({ view: views });
          }
          setViewCount(views.length);
          setBasketCount(baskets.length);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    addView();
  }, [product, user, firestore]);

  if (!product) {
    return error && (<Modal text="Сторінка не знайдена" setError={setError} />);
  }

  return (
    <div className='productPages'>
      <div className='productPages__container'>
        <Slidere listPhotoSrc={product.product.photos} />
        <Salesman product={product} />
      </div>
      <DescriptionProduct
        description={product.product.description}
        basket={product.product.basket}
        viewCount={viewCount}
        basketCount={basketCount}
      />
    </div>
  );
}
