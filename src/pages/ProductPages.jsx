//react
import React from 'react';
import { useLocation } from 'react-router-dom';
//components
import Photo from '../components/containerProduct/Photo';
import DescriptionProduct from '../components/containerProduct/DescriptionProduct';
import Salesman from '../components/containerProduct/Salesman';
//style
import "../styles/productPages.scss";


export default function ProductPages() {
  const location = useLocation();
  const product = location.state && location.state.product;

  if (!product) {
    return <div className='red'>Помилка</div>;
  }
  return (
    <div className='productPages'>
      <div className='productPages__container'>
      <Photo listElems={product.product.photos} />
      <Salesman product={product} />
      </div>
      <DescriptionProduct description={product.product.description} />
      {/* <h1>{product.product.title}</h1>
      <p>{product.product.price} грн</p> */}
    </div>
  );
}