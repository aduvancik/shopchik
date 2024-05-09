import React, { useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import "../../styles/basket.scss";
import { useNavigate } from 'react-router-dom';


export function Basket({ productsArr, handleRemoveFromCart, handleClose, setShowBasket }) {
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (event) => {
        if (!event.target.closest('.header')) {
            setShowBasket(false);
        }
    };

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
            <IoMdCloseCircle className='basket__icon' onClick={(e) => handleClose(e)} />
            <h1 className='basket__title-h1'>Корзина {productsArr.length === 0 && "пуста"}</h1>
            {productsArr.map(product => (
                <div key={product.id} className='basket__product' onClick={(event) => navigateToProductPage(event, product)}>
                    <div className='basket__title'>{product.product.title}</div>
                    <div className='basket__price'>{product.product.price} грн.</div>
                    <img className="basket__img" src={product.product.photos[0]} alt="Фото" />
                    <button className="button basket__delete" type='button' onClick={(event) => handleRemoveFromCart(event, product.id)}>Видалити</button>
                </div>
            ))}
        </div>
    );
}
