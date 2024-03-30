import React, { useState } from "react";
import "../styles/addProduct.scss";
import "../styles/addphoto.scss";
import AddTitle from "../components/addProduct/AddTitle";
import AddPhoto from "../components/addProduct/AddPhoto";
import Description from "../components/addProduct/Description";
import Contacts from "../components/addProduct/Contacts";

export default function AddProduct() {
  const [arrImg, setArrImg] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    // photos: [],
    // category: "",
    // description: "",
    // contactPerson: "",
    // telephone: "",
  });

  const handleTitleChange = (event) => {
    setProductData({ ...productData, title: event.target.value });
  };

  const remainingCount = Math.max(6 - arrImg.length, 0);
  
  const additionalAddPhotos = Array.from({ length: remainingCount }, (_, index) => (
    <AddPhoto key={index} onImageSelected={handleImageSelected} onImageDeleted={handleImageDeleted} />
    ));
    
    function handleImageSelected(imageURL) {
      setArrImg(prevArrImg => [...prevArrImg, imageURL]);
    }
    
    function handleImageDeleted(imageURL) {
      setArrImg(prevArrImg => prevArrImg.filter(image => image !== imageURL));
    }
    
    const handlePublish = (event) => {
      event.preventDefault();
      // setProductData(prevData => ({
      //   title: "ka"
      // }));
      console.log(productData);
  };



  return (
    <div className="addProduct">
      <h1 className="addProduct__title title">Створити оголошення</h1>
      <div className="addProduct__container">
        <h2 className="title-h2">Опишіть у подробицях</h2>
        <form>
          <AddTitle setProductData={setProductData} productData={productData}/>
          <div>
            <h2 className="title-h2 addProduct__title_margin">Фото</h2>
            <div className="addProduct__containerPhoto">
              {arrImg.map((url, index) => (
                <AddPhoto key={index} url={url} onImageDeleted={handleImageDeleted} />
              ))}
              {additionalAddPhotos}
            </div>
          </div>
          <Description />
          <Contacts />
          <button className="button maxContent" onClick={handlePublish}>Опублікувати</button>
        </form>
      </div>
    </div>
  );
}
