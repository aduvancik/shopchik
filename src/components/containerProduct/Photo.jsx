import React, { useState } from 'react';
//react icon
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
//style
import "../../styles/slider.scss";


export default function Photo({ listElems }) {
  const [position, setPosition] = useState(0);
  const width = 130; // ширина картинки
  const count = 1; // видимое количество изображений

  const handlePrevClick = () => {
    // сдвиг влево
    let newPosition = position + width * count;
    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    newPosition = Math.min(newPosition, 0)
    setPosition(newPosition);
  };

  const handleNextClick = () => {
    // сдвиг вправо
    let newPosition = position - width * count;
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    newPosition = Math.max(newPosition, -width * (listElems.length - count));
    setPosition(newPosition);
  };

  // Перевірка, чи потрібно відображати пагінацію
  const showPagination = listElems.length > 1;

  return (
    <div className="carousel">
      <button className="arrow prev" onClick={handlePrevClick} style={{ display: showPagination ? "block" : "none" }}><FaArrowAltCircleLeft /></button>
      <div className="gallery" style={{ width: `${width * count}px` }}>
        <ul style={{ marginLeft: `${position}px` }}>
          {listElems.map((src, index) => (
            <li key={index}><img src={src} alt={`Images ${index + 1}`} /></li>
          ))}
        </ul>
      </div>
      <button className="arrow next" onClick={handleNextClick} style={{ display: showPagination ? "block" : "none" }}><FaArrowAltCircleRight /></button>
      {showPagination && (
        <div className="pagination">
          {listElems.map((_, index) => (
            <span
              key={index}
              className={position === -index * width ? "active" : ""}
              onClick={() => setPosition(-index * width)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
