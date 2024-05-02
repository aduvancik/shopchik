import React from 'react'

export default function Salesman({ contactPerson }) {
  return (
    <div className='salesman'>
      <h3>ЗВ’ЯЗАТИСЯ З ПРОДАВЦЕМ</h3>
      <div className="salesman__container">
        {contactPerson}
      </div>
    </div>
  )
}
