//react
import React, { useContext, useState } from 'react';
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

  if (!product) {
    return error && (<Modal text="Сторінка не знайдена" setError={setError} />)
  } 


  return (
    <div className='productPages'>
      <div className='productPages__container'>
        <Slidere listPhotoSrc={product.product.photos} />
        <Salesman product={product} />
      </div>
      <DescriptionProduct description={product.product.description} basket={product.product.basket}/>
    </div>
  );
}