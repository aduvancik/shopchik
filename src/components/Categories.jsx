import React from 'react'
import "../styles/categories.scss";
import CategiriesItem from './CategiriesItem';

const categoriesArr = [
  {
    title: "Все",
    alt: "all"
  },
  {
    title: "Коти",
    alt: "cat"
  },
  {
    title: "Собаки",
    alt: "dog"
  },
  {
    title: "Птахи",
    alt: "bird"
  },
  {
    title: "Рибки",
    alt: "fish"
  },
  {
    title: "Гризуни",
    alt: "rodents"
  },
  {
    title: "Рептилії",
    alt: "reptiles"
  },
]

export default function Categories({handleCategoryClick }) {
  return (
    <div className='categories'>
      <p className="categories__title">Категорії</p>
      <div className="categories__items">
        {categoriesArr.map((category) => (
          <CategiriesItem
            key={category.title}
            alt={category.alt}
            title={category.title}
            handleCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  )
}

