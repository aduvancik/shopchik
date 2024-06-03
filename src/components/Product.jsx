import React, { useContext, useEffect, useState } from "react";
import { BsBasket2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../styles/product.scss";
import Loader from "./Loader";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatDate } from "../utils/date";
import { useBasket } from "../utils/context/BasketContext";
import Modal from "./Modal";

export default function Product({ product, loading }) {
  const { auth, storage } = useContext(Context);
  const [user] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { basket, addToBasket, removeFromBasket } = useBasket();

  useEffect(() => {
    const getPhotoURL = async () => {
      try {
        const photoRef = storage.refFromURL(product.product.photos[0]);
        const url = await photoRef.getDownloadURL();
        setPhotoURL(url);
      } catch (error) {
        console.error("Помилка отримання URL-адреси фото з Firebase Storage:", error);
      }
    };

    if (product.product.photos && product.product.photos.length > 0) {
      getPhotoURL();
    }
  }, [product, storage]);

  const isInBasket = basket.some(item => item.id === product.uid);

  const handleBasketClick = (e) => {
    e.stopPropagation();
    if (isInBasket) {
      removeFromBasket(product.uid);
    } else {
      addToBasket(product);
    }
  };

  const navigateToProductPage = () => {
    navigate(`product/${encodeURIComponent(product.product.title)}`, {
      state: { product },
    });
  };

  return (
    <li className="product" onClick={navigateToProductPage}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Modal setError={setError} text="Щось пішло не так, можливо ви не ввійшли" />}
          {photoURL && <img src={photoURL} alt={product.product.title} className="product__img" />}
          <div className="product__info">
            <h3 className="product__infoTitle">{product.product.title}</h3>
            <BsBasket2 onClick={handleBasketClick} className={isInBasket ? "basket__active basket-icon" : "basket-icon"} />
            <p className="product__price">{product.product.price} грн</p>
            <span className="product__place-data">
              <p>{product.product.categori}</p>
              <p>{formatDate(product.createdAt)}</p>
            </span>
          </div>
        </>
      )}
    </li>
  );
}
