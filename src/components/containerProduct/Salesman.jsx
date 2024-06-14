import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/date';
//react icon
import { BsBasket2 } from 'react-icons/bs';
import { addBasket } from '../../utils/addBasket';
//
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
//
import Modal from '../Modal';
import { CHAT_ROUTE } from '../../utils/consts';
//style
import "../../styles/salesMan.scss";

export default function Salesman({ product }) {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [basket, setBasket] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("Показати телефон");
  const navigate = useNavigate();

  useEffect(() => {
    const checkBasket = async () => {
      try {
        const userCartRef = firestore.collection("carts").doc(user.uid);
        const userCartDoc = await userCartRef.get();
        if (userCartDoc.exists) {
          const cartData = userCartDoc.data();
          if (cartData.products.includes(product.uid)) {
            setBasket(true);
          } else {
            setBasket(false);
          }
        } else {
          setBasket(false);
        }
      } catch (error) {
        console.error("Помилка перевірки продукту у кошику користувача:", error);
      }
    };

    if (user && product) {
      checkBasket();
    }
  }, [product, user, firestore]);

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
            addBasket(e, product, setBasket, user, firestore, setError)
              .catch((err) => console.error("Помилка додавання до кошика:", err));
          }}
          className={basket ? "basket-icon basket__active" : "basket-icon"}
        />
      </div>
      <h1 className='salesMan__title'> {product.product.title}</h1>
      <p className='salesMan__price'>{product.product.price} грн.</p>
      <h1 className='salesMan__data'> контактна персона: {product.product.contactPerson}</h1>
      <div className='salesMan__container-button'>
        {
          !(user.uid === product.uidUser) &&
          <button type='salesMan__button_message button' className='button salesMan__button_send' onClick={handleNavigateToChat}>Повідомлення</button>
        }
        <button className='salesMan__button_tel button' onClick={() => setPhone(product.product.telephone)}>{phone}</button>
      </div>
    </div>
  );
}
