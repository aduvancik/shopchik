import React, { useContext, useState } from 'react';
import "../../styles/salesMan.scss";
import { formatDate } from '../../utils/date';
// import { BsBasket2 } from 'react-icons/b';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import { CHAT_ROUTE } from '../../utils/consts';
import { useBasket } from '../../utils/context/BasketContext';
import { BsBasket2 } from 'react-icons/bs';
// Basket context
// import { useBasket } from '../../context/BasketContext'; // замініть на ваш шлях до BasketContext

export default function Salesman({ product }) {
  const { auth, firestore } = useContext(Context);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("Показати телефон");
  const navigate = useNavigate();
  const { basket, addToBasket, loading: basketLoading } = useBasket();

  const handleNavigateToChat = () => {
    navigate(CHAT_ROUTE, {
      state: { product },
    });
  };

  return (
    <div className='salesMan'>
      {error && <Modal setError={setError} text="Щось пішло не так, можливо ви не ввійшли" />}
      <div className='salesMan__container-dataIcon'>
        <p className='salesMan__data'>Опубліковано {formatDate(product.createdAt)}</p>
        <BsBasket2
          onClick={(e) => {
            e.stopPropagation();
            addToBasket(product.uid);
          }}
          className={basket.includes(product.uid) ? "basket-icon basket__active" : "basket-icon"}
        />
      </div>
      <h1 className='salesMan__title'> {product.product.title}</h1>
      <p className='salesMan__price'>{product.product.price} грн.</p>
      <div className='salesMan__container-button'>
        <button type='salesMan__button_message button' className='button' onClick={handleNavigateToChat}>Повідомлення</button>
        <button className='salesMan__button_tel button' onClick={() => setPhone(product.product.telephone)}>{phone}</button>
      </div>
    </div>
  )
}
