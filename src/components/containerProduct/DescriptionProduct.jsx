import React from 'react';
import "../../styles/descriptionProduct.scss";

export default function DescriptionProduct({ description, basket,viewCount,basketCount }) {
  return (
    <div className='descriptionProduct'>
      <h2 className='descriptionProduct__title'>Опис</h2>
      <p className='descriptionProduct__description'>{description}</p>
      <div className='descriptionProduct__line'></div>
      <div className='descriptionProduct__statistics'>
        <p className="descriptionProduct__like">Добавили в корзину: {basketCount}</p>
        <p className="descriptionProduct__views">Переглядів: {viewCount}</p>
      </div>
    </div>
  )
}
