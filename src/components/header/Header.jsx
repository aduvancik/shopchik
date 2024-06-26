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
import Modal from '../Modal';

export default function Header() {
    const [showBasket, setShowBasket] = useState(false);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const [productsArr, setProductsArr] = useState([]);
    const { firestore } = useContext(Context);
    const [error, setError] = useState(false);
    const [showHeader, setShowHeader] = useState(false);

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
                            setError(true);
                            return null;
                        }
                    }));

                    setProductsArr(products);
                } else {
                    if (showBasket) setError(true);

                }
            } catch (error) {
                if (showBasket)
                    setError(true);

            }
        };

        fetchCart();
    }, [error, firestore, showBasket]);




    const handleRemoveFromCart = async (event, productId) => {
        event.stopPropagation();

        try {
            await firestore.collection("carts").doc(user.uid).update({
                products: firebase.firestore.FieldValue.arrayRemove(productId)
            });

            const updatedCartDoc = await firestore.collection("carts").doc(user.uid).get();
            const updatedCartData = updatedCartDoc.data();
            const updatedProducts = await Promise.all(updatedCartData.products.map(async (productId) => {
                const productDoc = await firestore.collection("products").doc(productId).get();
                return { id: productDoc.id, ...productDoc.data() };
            }));
            setProductsArr(updatedProducts);
        } catch (error) {
            setError(true)
        }
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setShowBasket(false)
    };
    const handleShow = () => {
        setShowBasket(!showBasket)
    }
        ;

    return (
        <>
            <header className='header'>
                <div className="header__content">
                    <Link to="/" className="header__functional_item header__functional_logo" onClick={() => setShowHeader(false)}>
                        <div className="header__logo">OLMX</div>
                    </Link>
                    <div className={`header__functional ${showHeader ? "header__functional_show" : "header__functional"}`} >
                        <NavLink to={CHAT_ROUTE} className="header__functional_item" onClick={() => setShowHeader(false)}>
                            <BsChat className='header__icon' />
                            <span>Повідомлення</span>
                        </NavLink>
                        <div className="header__functional_item relative" onClick={() => handleShow()} >
                            <BsBasket2 className='header__icon' />
                            <span>Коризна</span>
                            {showBasket && <Basket setShowBasket={setShowBasket} handleClose={handleClose} productsArr={productsArr} handleRemoveFromCart={handleRemoveFromCart} />}
                        </div>
                        <NavLink to={PROFILE_ROUTE} className="header__functional_item" onClick={() => setShowHeader(false)}>
                            <MdSupervisorAccount className='header__icon' />
                            <span>Ваш профіль</span>
                        </NavLink>
                        <NavLink to={ADD_PRODUCT_ROUTE} className="header__functional_item" onClick={() => setShowHeader(false)}>
                            <BiMessageAltAdd className='header__icon' />
                            <span>Додати оголошення</span>
                        </NavLink>
                        {user ?
                            <div className="header__functional_item" onClick={() => setShowHeader(false)}>
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
                    <div className="header__burgerMenu" onClick={() => setShowHeader(!showHeader)}>
                        <svg id="hamburger" className={`header__toggle-svg ${showHeader ? "svg-hover" : ""}`} viewBox="0 0 60 40" width="40" height="40">
                            <g stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <path id="top-line" d="M10,10 L50,10 Z"></path>
                                <path id="middle-line" d="M10,20 L50,20 Z"></path>
                                <path id="bottom-line" d="M10,30 L50,30 Z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </header >
        </>
    )
}
