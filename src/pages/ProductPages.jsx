//react
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
//components
import DescriptionProduct from '../components/containerProduct/DescriptionProduct';
import Salesman from '../components/containerProduct/Salesman';
//style
import "../styles/productPages.scss";
import Slidere from '../components/containerProduct/Slider';
import Modal from '../components/Modal';


export default function ProductPages() {
  const location = useLocation();
  const product = location.state && location.state.product;
  const [error, setError] = useState(false);

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