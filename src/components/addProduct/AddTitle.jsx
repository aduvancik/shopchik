import React, { useState } from "react";
import SizeInput from "../SizeInput";
import DropDown from "../DropDown";

export default function AddTitle(props) {
  const { setProductData, productData } = props;
  const [sizeTitle, setSizeTitle] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);

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
      console.log(str, productData);
    } else {
      // Якщо довжина назви не відповідає вимогам, можна очистити title у стані productData.
      setProductData(prevData => ({
        ...prevData,
        // title: ""
      }));
    }
  }


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
          maxlength="70"
          onFocus={handleInputFocus}
          required
        />
        <SizeInput sizeTitle={sizeTitle} maxSize={70} minSize={16} inputFocused={inputFocused} />
      </div>
      <div className="addProduct__group">
        <label htmlFor="category">Категорія*</label>
        <DropDown />
      </div>
    </>
  );
}
