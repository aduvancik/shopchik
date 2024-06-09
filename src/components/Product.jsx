import React, { useContext, useEffect, useState } from "react";
import { BsBasket2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
//style
import "../styles/product.scss";
//
import Loader from "./Loader";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatDate } from "../utils/date";
import { addBasket } from "../utils/addBasket";
import Modal from "./Modal";

export default function Product({ product, loading }) {
  const { auth, firestore, storage } = useContext(Context);
  const [user] = useAuthState(auth);
  const [basket, setBasket] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPhotoURL = async () => {
      if (product.product && product.product.photos && product.product.photos.length > 0) {
        try {
          const photoRef = storage.refFromURL(product.product.photos[0]);
          const url = await photoRef.getDownloadURL();
          setPhotoURL(url);
        } catch (error) {
          console.error("Помилка отримання URL-адреси фото з Firebase Storage:", error);
        }
      }
    };

    getPhotoURL();

    const checkBasket = async () => {
      try {
        const userCartRef = firestore.collection("carts").doc(user.uid);
        const userCartDoc = await userCartRef.get();
        if (userCartDoc.exists) {
          const cartData = userCartDoc.data();
          setBasket(cartData.products.includes(product.uid));
        } else {
          setBasket(false);
        }
      } catch (error) {
        console.error("Error checking basket:", error);
      }
    };

    if (user && product) {
      checkBasket();
    }
  }, [product, user, firestore, storage]);

  const navigateToProductPage = () => {
    if (product.product) {
      navigate(`/product/${encodeURIComponent(product.product.title)}`, {
        state: { product },
      });
    }
  };

  if (!product || !product.product) {
    return null; // or some fallback UI
  }

  return (
    <li className="product" onClick={navigateToProductPage}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Modal setError={setError} text="Щось пішло не так" />}
          {photoURL && <img src={photoURL} alt={product.product.title} className="product__img" />}
          <div className="product__info">
            <h3 className="product__infoTitle">{product.product.title}</h3>
            <BsBasket2 onClick={(e) => addBasket(e, product, setBasket, user, firestore, setError)} className={basket ? "basket__active basket-icon" : "basket-icon"} />
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
