import React, { useContext, useEffect, useState } from "react";
// icon
import { BsBasket2 } from "react-icons/bs";
// style
import "../styles/product.scss";
// roter
import { useNavigate } from "react-router-dom";
import Loader from "./Chat/Loader";
import { Context } from "..";

export default function Product({ product, loading }) {
  const [basket, setBasket] = useState(false);
  const [photoURL, setPhotoURL] = useState(null); // Стейт для збереження URL-адреси фото
  const navigate = useNavigate();
  const { storage } = useContext(Context);

  useEffect(() => {
    // Функція для отримання URL-адреси фото з Firebase Storage
    const getPhotoURL = async () => {
      try {
        const photoRef = storage.refFromURL(product.product.photos[0]); // Отримати посилання на фото з Firebase Storage
        const url = await photoRef.getDownloadURL(); // Отримати URL-адресу фото
        setPhotoURL(url); // Зберегти URL-адресу фото у стейт
      } catch (error) {
        console.error("Помилка отримання URL-адреси фото з Firebase Storage:", error);
      }
    };

    if (product.product.photos && product.product.photos.length > 0) {
      getPhotoURL(); // Викликати функцію для отримання URL-адреси фото при завантаженні компонента
    }
  }, [product.product.photos, storage]);

  const addBasket = (event) => {
    event.stopPropagation();
    setBasket(!basket);
  };

  const navigateToProductPage = () => {
    navigate(`product/${encodeURIComponent(product.product.title)}`, {
      state: { product },
    });
  };


  const formatDate = () => {
    const timestamp = product.createdAt;

    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

    const date = new Date(milliseconds);

    const today = new Date(); // Поточна дата та час
    const padZero = (num) => (num < 10 ? '0' : '') + num;

    // Якщо оголошення створено сьогодні
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = padZero(date.getHours()) + ':' + padZero(date.getMinutes());
      return 'сьогодні о ' + formattedTime;
    } else {
      // Інакше, виводимо тільки дату
      const formattedDate =
        date.getDate() +
        ' ' +
        ['січ', 'лют', 'бер', 'квіт', 'трав', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'груд'][date.getMonth()] +
        ' ' +
        date.getFullYear();
      return formattedDate;
    }
  };




  return (
    <li className="product" onClick={navigateToProductPage}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {photoURL && <img src={photoURL} alt={product.product.title} className="product__img" />}
          <div className="product__info">
            <h3 className="product__infoTitle">{product.product.title}</h3>
            <BsBasket2 onClick={addBasket} />
            <p className="product__price">{product.product.price} грн</p>
            <span className="product__place-data">
              <p>{product.product.categori}</p>
              <p>{formatDate()}</p>
            </span>
          </div></>
      )
      }
    </li>
  );
}

