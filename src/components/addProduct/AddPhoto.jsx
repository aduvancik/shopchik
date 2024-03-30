// AddPhoto.jsx

import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineMonochromePhotos, MdDeleteForever } from 'react-icons/md';

export default function AddPhoto(props) {
  const { url, onImageSelected, onImageDeleted } = props;

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      onImageSelected(imageURL);
    }
  };

  const handleDeleteClick = () => {
    onImageDeleted(url);
  };

  return (
    <div className="addProduct__Photo">
      <div className="addProduct__content">
        {url ? (
          <div className='addProduct__imgContainer'>
            <img src={url} alt="Зображення" className="addProduct__image" />
            <div className='addProduct__blur'>
              <MdDeleteForever className="addProduct__delete wave-animation" onClick={handleDeleteClick} />
            </div>
          </div>
        ) : (
          <div>
            <MdOutlineMonochromePhotos className="icons addProduct__icon" />
            <div className="addProduct__hoverPhoto">
              <IoMdAdd className="icons wave-animation" />
              <p>Додати фото</p>
            </div>
          </div>
        )}
        <input type="file" accept="image/*" className="input" onChange={handleFileInputChange} />
      </div>
    </div>
  );
}
