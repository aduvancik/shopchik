import React from 'react'
import "../styles/categories.scss";
import CategiriesItem from './CategiriesItem';

const categoriesArr = [
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

export default function Categories() {
  return (
    <div className='categories'>
      <p className="categories__title">Категорії</p>
      <div className="categories__items">
        {categoriesArr.map((category) => (
          <CategiriesItem
            key={category.title}
            alt={category.alt}
            title={category.title}
          />
        ))}
      </div>
    </div>
  )
}

