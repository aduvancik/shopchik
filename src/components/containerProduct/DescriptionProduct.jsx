import React from 'react';
import "../../styles/descriptionProduct.scss";

export default function DescriptionProduct({ description }) {
  return (
    <div className='descriptionProduct'>
      <h2 className='descriptionProduct__title'>Опис</h2>
      <p className='descriptionProduct__description'>{description}</p>
      <div className='descriptionProduct__line'></div>
      <div className='descriptionProduct__statistics'>
        <p className="descriptionProduct__like">Добавили в корзину: 1</p>
        <p className="descriptionProduct__views">Переглядів: 2</p>
      </div>
    </div>
  )
}
