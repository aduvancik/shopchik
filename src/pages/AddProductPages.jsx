import React, { useContext, useState } from "react";
import { HOME_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "../styles/addProduct.scss";
import "../styles/addphoto.scss";
import AddTitle from "../components/addProduct/AddTitle";
import AddPhoto from "../components/addProduct/AddPhoto";
import Description from "../components/addProduct/Description";
import Contacts from "../components/addProduct/Contacts";
import Modal from "../components/Modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import firebase from 'firebase/compat/app';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Loader from "../components/Loader";

export default function AddProduct() {
  const { auth, firestore, storage } = useContext(Context);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [arrImg, setArrImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrPhoto, setArrPhoto] = useState([]);
  const [error, setError] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    telephone: "",
    contactPerson: "",
    category: "",
    photos: [],
    view: 0,
    basket: [],
  });

  const remainingCount = Math.max(6 - arrImg.length, 0);
  const additionalAddPhotos = Array.from({ length: remainingCount }, (_, index) => (
    <AddPhoto key={index} onImageSelected={handleImageSelected} onImageDeleted={handleImageDeleted} />
  ));

  function handleImageSelected(imageURL, file) {
    setArrImg(prevArrImg => {
      const newArrImg = [...prevArrImg, imageURL];
      setProductData(prevData => ({
        ...prevData,
        photos: newArrImg,
      }));
      setArrPhoto(prevArrPhoto => [...prevArrPhoto, file]);
      return newArrImg;
    });
  }

  function handleImageDeleted(imageURL, file) {
    setArrImg(prevArrImg => prevArrImg.filter(image => image !== imageURL));
    setProductData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter(photo => photo !== imageURL),
    }));

    setArrPhoto((prevArrPhoto) => prevArrPhoto.filter((photo) => {

      return photo !== file
    }));
  }



  const handlePublish = async (event) => {
    event.preventDefault();
    let hasEmptyValues = false;
    //перевірка чи всі дані заповнені
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'view' && key !== 'basket' && (value === "" || (Array.isArray(value) && value.length === 0))) {
        hasEmptyValues = true;
      }
    });

    if (hasEmptyValues) {
      setError(true);
    } else {
      setError(false);

      const photoURLs = [];

      try {
        setLoading(true);
        // Завантажуємо всі фотографії
        await Promise.all(arrPhoto.map(async (photo) => {
          const photoRef = ref(storage, `photos/${uuidv4()}`);
          await uploadBytesResumable(photoRef, photo);
          const downloadURL = await getDownloadURL(photoRef);
          photoURLs.push(downloadURL);
        }));

        // Додаємо продукт до firestore
        const uid = uuidv4();
        await firestore.collection("products").doc(uid).set({
          uid: uid,
          uidUser: user.uid,
          product: {
            ...productData,
            photos: photoURLs,
          },
          createdAt: firebase.firestore.Timestamp.now()
        });

        // Переходимо на домашню сторінку
        navigate(HOME_ROUTE);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading photos or adding product:", error);
        setError(true);
      }
    }
  };

  return (
    <div className="addProduct">
      {!loading ? (
        <>
          <h1 className="addProduct__title title">Сворити оголошення</h1>
          {error && <Modal setError={setError} text="Введіть усі поля" />}
          <div className="addProduct__container">
            <h2 className="title-h2">Опишіть у подробицях</h2>
            <form autoComplete="on">
              <AddTitle setProductData={setProductData} productData={productData} />
              <div>
                <h2 className="title-h2 addProduct__title_margin">Photos</h2>
                <div className="addProduct__containerPhoto">
                  {arrImg.map((url, index) => (
                    <AddPhoto key={index} url={url} index={index} onImageDeleted={handleImageDeleted} />
                  ))}
                  {additionalAddPhotos}
                </div>
              </div>
              <Description setProductData={setProductData} />
              <Contacts setProductData={setProductData} />
              <button type="submit" className="button maxContent" onClick={handlePublish}>Опублікувати</button>
            </form>
          </div>
        </>
      ) : (<Loader />)}
    </div>
  );
}