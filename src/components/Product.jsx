import React from 'react'
//icon
import { BsBasket2 } from 'react-icons/bs'
//style
import "../styles/product.scss"; 


export default function Product() {
  return (
    <li className="product">
    <img
        src="https://sheplis.com.ua/typo3temp/fl_realurl_image/bilka44-d5.jpg"
        alt="animal" 
        className="product__img" />
    <div className="product__info">
        <h3 className="product__infoTitle">Білка домашня</h3>
        <BsBasket2 />
        <p className="product__price">523 грн</p>
        <p className="product__place-data">
            <p>Івано-франківськ</p>
            <p>Сьогодні о 00:24</p>
        </p>
    </div>
</li>
  )
}
