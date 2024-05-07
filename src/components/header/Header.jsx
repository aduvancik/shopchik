import React, { useContext, useEffect, useState } from 'react';
//styles
import "../../styles/header.scss";
//react-icons
import { BsChat, BsBasket2 } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { BiMessageAltAdd } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
//
import { Link, NavLink } from 'react-router-dom';
import { Context } from '../..';
//firebase
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ADD_PRODUCT_ROUTE, CHAT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../utils/consts';
import { Basket } from './Basket';

export default function Header() {
    const [showBasket, setShowBasket] = useState(false);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const [productsArr, setProductsArr] = useState([]);
    const { firestore } = useContext(Context);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartDoc = await firestore.collection("carts").doc(user.uid).get();
                if (cartDoc.exists) {
                    const cartData = cartDoc.data().products;
                    const products = await Promise.all(cartData.map(async (productId) => {
                        const productDoc = await firestore.collection("products").doc(productId).get();
                        if (productDoc.exists) {
                            return { id: productDoc.id, ...productDoc.data() };
                        } else {
                            console.log("Product does not exist with id:", productId);
                            return null;
                        }
                    }));
                    setProductsArr(products);
                } else {
                    console.log("Cart does not exist for user:", user.uid);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [showBasket, user.uid]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await firestore.collection("carts").doc(user.uid).update({
                products: firebase.firestore.FieldValue.arrayRemove(productId)
            });
            // Оновлюємо список продуктів у корзині після видалення
            const updatedCartDoc = await firestore.collection("carts").doc(user.uid).get();
            const updatedCartData = updatedCartDoc.data();
            const updatedProducts = await Promise.all(updatedCartData.products.map(async (productId) => {
                const productDoc = await firestore.collection("products").doc(productId).get();
                return { id: productDoc.id, ...productDoc.data() };
            }));
            setProductsArr(updatedProducts);
            console.log("Product removed from cart:", productId);
        } catch (error) {
            console.error("Помилка видалення продукту з корзини:", error);
        }
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setShowBasket(false)
    };
    const handleShow = () => setShowBasket(!showBasket);



    return (
        <>
            <header className='header'>
                <div className="header__content">
                    <Link to="/" className="header__functional_item">
                        <div className="header__logo">Shop</div>
                    </Link>
                    <div className="header__functional">
                        <NavLink to={CHAT_ROUTE} className="header__functional_item">
                            <BsChat className='header__icon' />
                            <span>Повідомлення</span>
                        </NavLink>
                        <div className="header__functional_item relative" onClick={handleShow}>
                            <BsBasket2 className='header__icon' />
                            <span>Коризна</span>
                            {showBasket && <Basket setShowBasket={setShowBasket} handleClose={handleClose} productsArr={productsArr} handleRemoveFromCart={handleRemoveFromCart} />}
                        </div>
                        <NavLink to={PROFILE_ROUTE} className="header__functional_item">
                            <MdSupervisorAccount className='header__icon' />
                            <span>Ваш профіль</span>
                        </NavLink>
                        <NavLink to={ADD_PRODUCT_ROUTE} className="header__functional_item">
                            <BiMessageAltAdd className='header__icon' />
                            <span>Додати оголошення</span>
                        </NavLink>
                        {user ?
                            <div className="header__functional_item">
                                <CiLogin className="header__icon" />
                                <span onClick={() => auth.signOut()}>Вийти</span>
                            </div>
                            :
                            <NavLink to={LOGIN_ROUTE} className="header__functional_item" >
                                <CiLogin className="header__icon" />
                                <span>Логин</span>
                            </NavLink>

                        }
                    </div>
                </div>
            </header >
        </>
    )
}
