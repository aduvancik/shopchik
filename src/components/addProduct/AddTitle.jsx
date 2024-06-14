import React, { useState } from "react";
//components
import SizeInput from "../SizeInput";
import DropDown from "../DropDown";
//style
import "../../styles/addTitle.scss";

export default function AddTitle(props) {
  const { setProductData, productData } = props;
  const [sizeTitle, setSizeTitle] = useState(0);
  const [price, setPrice] = useState('');

  const [inputFocused, setInputFocused] = useState(false);

  //title
  const handleInputFocus = () => {
    setInputFocused(true);
  }

  const handleTitle = (event) => {
    const str = event.target.value;
    setSizeTitle(str.length);

    if (str.length >= 16 && str.length <= 70) {
      setProductData(prevData => ({
        ...prevData,
        title: str
      }));
    } else {
      setProductData(prevData => ({
        ...prevData,
        title: ""
      }))
    }
  }


  const handlePrice = (e) => {
    let value = e.target.value;
    if (/[^\d.]/.test(value)) {
      setPrice('');
    } else {
      const parts = value.split('.');
      if (parts[1] && parts[1].length > 1) {
        parts[1] = parts[1].substring(0, 1);
        value = parts.join('.');
      }
      setPrice(value);
      setProductData(prevData => ({
        ...prevData,
        price: value 
      }));
    }
  };

  return (
    <>
      <div className="addProduct__group">
        <label htmlFor="title">Вкажіть назву*</label>
        <input
          type="text"
          id="title"
          placeholder="Наприклад, Лабрадор‐ретривер цуценятка"
          className="input"
          onChange={handleTitle}
          maxLength="70"
          onFocus={handleInputFocus}
          required
        />
        <SizeInput sizeTitle={sizeTitle} maxSize={70} minSize={16} inputFocused={inputFocused} />
      </div>
      <div className="addProduct__group">
        <label htmlFor="price">Вкажіть ціну*</label>
        <div className="addProduct__price-container">
          <input
            type="number"
            id="price"
            placeholder=""
            className="input addProduct__price"
            onChange={(e) => {
              let value = e.target.value;
              if (value.length > 6) {
                value = value.slice(0, 6);
                e.target.value = value;
              }
              handlePrice(e);
            }}
            required
          />
          <p>грн.</p>
        </div>
      </div>
      <div className="addProduct__group">
        <label htmlFor="category">Категорія*</label>
        <DropDown setProductData={setProductData} productData={productData} />
      </div>
    </>
  );
}
