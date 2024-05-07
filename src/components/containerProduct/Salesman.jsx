import React from 'react'

export default function Salesman({ product }) {

  return (
    <div className='salesman'>
      <p>Опубліковано </p>
      <h1>{product.product.title}</h1>
      <p>{product.product.price} грн</p>
      <button>повідомлення</button>
      <button>показати телефон</button>
      <div className="salesman__container">
      </div>
    </div>
  )
}
