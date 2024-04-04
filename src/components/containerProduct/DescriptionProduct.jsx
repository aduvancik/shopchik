import React from 'react'

export default function DescriptionProduct({product}) {
  return (
    <div className='description'>
        <h2>Опис</h2>
        <p>{product.description}</p>

    </div>
  )
}
