import React, { useContext, useEffect, useState } from "react";
import { BsBasket2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
//style
import "../styles/product.scss";
import Loader from "./Chat/Loader";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Product({ product, loading }) {
  const { auth, firestore, storage } = useContext(Context);
  const [user] = useAuthState(auth);
  const [basket, setBasket] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const navigate = useNavigate();

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

    // Перевіряємо, чи продукт є у кошику користувача під час завантаження сторінки
    const checkBasket = async () => {
      try {
        const userCartRef = firestore.collection("carts").doc(user.uid);
        const userCartDoc = await userCartRef.get();
        if (userCartDoc.exists) {
          const cartData = userCartDoc.data();
          if (cartData.products.includes(product.uid)) {
            setBasket(true);
          } else {
            setBasket(false);
          }
        } else {
          setBasket(false);
        }
      } catch (error) {
        console.error("Помилка перевірки продукту у кошику користувача:", error);
      }
    };

    if (user && product) {
      checkBasket();
    }
  }, [product, user, firestore, storage]);

  const addBasket = async (event) => {
    event.stopPropagation();
    try {
      const userCartRef = firestore.collection("carts").doc(user.uid);
      const userCartDoc = await userCartRef.get();
      if (!userCartDoc.exists) {
        await userCartRef.set({ products: [product.uid] });
        setBasket(true);
      } else {
        const cartData = userCartDoc.data();
        const updatedProducts = cartData.products.includes(product.uid)
          ? cartData.products.filter((productId) => productId !== product.uid)
          : [...cartData.products, product.uid];
        await userCartRef.update({ products: updatedProducts });
        setBasket(!basket);
      }
    } catch (error) {
      console.error("Помилка додавання або видалення продукту з кошика:", error);
    }
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
    const today = new Date();
    const padZero = (num) => (num < 10 ? '0' : '') + num;

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const formattedTime = padZero(date.getHours()) + ':' + padZero(date.getMinutes());
      return 'сьогодні о ' + formattedTime;
    } else {
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
            <BsBasket2 onClick={addBasket} className={basket ? "basket__active" : ""} />
            <p className="product__price">{product.product.price} грн</p>
            <span className="product__place-data">
              <p>{product.product.categori}</p>
              <p>{formatDate()}</p>
            </span>
          </div>
        </>
      )}
    </li>
  );
}
