//react
import React from 'react';
import { useLocation } from 'react-router-dom';
import Photo from '../components/containerProduct/Photo';
import DescriptionProduct from '../components/containerProduct/DescriptionProduct';
import Salesman from '../components/containerProduct/Salesman';
//components


export default function ProductPages() {
  const location = useLocation();
  const product = location.state && location.state.product;

  if (!product) {
    // Handle the case where there is no product in the location state
    return <div>Помилка</div>;
  }
  return (
    <div>
      <Photo photosArr={product.product.photos} />
      <DescriptionProduct description={product.product.description} />
      <Salesman contactPerson={product.product.contactPerson} />
    </div>
  );
}