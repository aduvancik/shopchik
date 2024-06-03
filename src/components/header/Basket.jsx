import React, { useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import "../../styles/basket.scss";
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../utils/context/BasketContext';

export function Basket({ handleClose, setShowBasket }) {
  const { basket, removeFromBasket } = useBasket();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.basket')) {
        setShowBasket(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [setShowBasket]);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const navigateToProductPage = (event, product) => {
    handleClose(event);
    navigate(`product/${encodeURIComponent(product.product.title)}`, {
      state: { product }
    });
  };

  return (
    <div className='basket' onClick={handleClick}>
      <IoMdCloseCircle className='basket__icon' onClick={handleClose} />
      <h1 className='basket__title-h1'>Корзина {basket.length === 0 && "пуста"}</h1>
      {basket.map((product) => (
        product.product && product.product.title && (
          <div key={product.id} className='basket__product' onClick={(event) => navigateToProductPage(event, product)}>
            <div className='basket__title'>{product.product.title}</div>
            <div className='basket__price'>{product.product.price} грн.</div>
            {product.product.photos && product.product.photos[0] && (
              <img className="basket__img" src={product.product.photos[0]} alt="Фото" />
            )}
            <button
              className="button basket__delete"
              type='button'
              onClick={(event) => {
                event.stopPropagation();
                removeFromBasket(product.id);
              }}
            >
              Видалити
            </button>
          </div>
        )
      ))}
    </div>
  );
}
