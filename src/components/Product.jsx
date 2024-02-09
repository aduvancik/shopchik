import React, { useState } from "react";
//icon
import { BsBasket2 } from "react-icons/bs";
//style
import "../styles/product.scss";
//roter
import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const [basket, setBasket] = useState(false);
  const navigate = useNavigate();

  const addBasket = () => {
    setBasket(!basket);
    console.log(basket);
  };

  const navigateToProductPage = () => {
    navigate(`product/${encodeURIComponent(product.title)}`, {
      state: { product },
    });
  };

  return (
    <li className="product" onClick={navigateToProductPage}>
      <img src={product.img} alt="animal" className="product__img" />
      <div className="product__info">
        <h3 className="product__infoTitle">{product.title}</h3>
        <BsBasket2 onClick={addBasket} />
        <p className="product__price">{product.price} грн</p>
        <span className="product__place-data">
          <p>{product.categories}</p>
          <p>Сьогодні о 00:24</p>
        </span>
      </div>
    </li>
  );
}
