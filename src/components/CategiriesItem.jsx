import React, { useState, useEffect } from 'react';

export default function CategoriesItem({ title, alt, handleCategoryClick, selectedCategory }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (selectedCategory === alt) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selectedCategory, alt]); 

  const handleClick = () => {
    handleCategoryClick(alt);
    setIsActive(isActive);
  };

  return (
    <div
      className="categories__item"
      onClick={handleClick}
    >
      <img
        className={`categories__img ${isActive ? 'categories__active' : ''}`}
        src={require(`../img/categories/${alt}.jpg`)}
        alt={alt}
      />
      <p className="categories__text">{title}</p>
    </div>
  );
}
