import React, { useContext, useState } from "react";
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

export default function AddProduct() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const [arrImg, setArrImg] = useState([]);
  const [error, setError] = useState(false)
  const [productData, setProductData] = useState({
    title: "",
    photos: [],
    category: "",
    description: "",
    contactPerson: "",
    telephone: "",
    price: "",
  });


  const remainingCount = Math.max(6 - arrImg.length, 0);

  const additionalAddPhotos = Array.from({ length: remainingCount }, (_, index) => (
    <AddPhoto key={index} onImageSelected={handleImageSelected} onImageDeleted={handleImageDeleted} />
  ));

  function handleImageSelected(imageURL) {
    setArrImg(prevArrImg => {
      const newArrImg = [...prevArrImg, imageURL];
      setProductData(prevData => ({
        ...prevData,
        photos: newArrImg,
      }));
      return newArrImg;
    });
  }


  function handleImageDeleted(imageURL) {
    setArrImg(prevArrImg => prevArrImg.filter(image => image !== imageURL));
    setProductData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter(photo => photo !== imageURL),
    }));
  }


  const handlePublish = (event) => {

    event.preventDefault();


    let hasEmptyValues = false;
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'telephone' && (value === "" || (Array.isArray(value) && value.length === 0))) {
        hasEmptyValues = true;
      }
    });

    if (hasEmptyValues) {
      setError(true);
      console.log(error, productData);
    } else {
      setError(false)
      firestore.collection("products").add({
        uid: user.uid,
        product: productData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log(productData);
    }
  };

  return (
    <div className="addProduct">
      <h1 className="addProduct__title title">Створити оголошення</h1>
      {error && <Modal setError={setError} text="Ви заповнили не всі поля" />}
      <div className="addProduct__container">
        <h2 className="title-h2">Опишіть у подробицях</h2>
        <form>
          <AddTitle setProductData={setProductData} productData={productData} />
          <div>
            <h2 className="title-h2 addProduct__title_margin">Фото</h2>
            <div className="addProduct__containerPhoto">
              {arrImg.map((url, index) => (
                <AddPhoto key={index} url={url} onImageDeleted={handleImageDeleted} />
              ))}
              {additionalAddPhotos}
            </div>
          </div>
          <Description setProductData={setProductData} />
          <Contacts setProductData={setProductData} />
          <button typу="button" className="button maxContent" onClick={handlePublish}>Опублікувати</button>
        </form>
      </div>
    </div>
  );
}
