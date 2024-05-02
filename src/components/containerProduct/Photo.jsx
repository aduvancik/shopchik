import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Photo = ({ photosArr }) => {
  const items = photosArr.map((photo, index) => (
    <img key={index} src={photo} alt="animal" onDragStart={handleDragStart} role="presentation" />
  ));

  return <AliceCarousel mouseTracking items={items} />;
}

export default Photo;
