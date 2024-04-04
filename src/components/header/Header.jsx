import React, { useContext, useState } from 'react';
//styles
import "../../styles/header.scss";
//react-icons
import { BsChat, BsBasket2 } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { BiMessageAltAdd } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";

import { Modal } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ADD_PRODUCT_ROUTE, CHAT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../utils/consts';

export default function Header() {
    const [showBasket, setShowBasket] = useState(false);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    const handleClose = () => setShowBasket(false);
    const handleShow = () => setShowBasket(true);

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
                        <div className="header__functional_item" onClick={handleShow}>
                            <BsBasket2 className='header__icon' />
                            <span>Коризна</span>
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
            <Modal show={showBasket} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Корзина</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            </Modal>
        </>
    )
}
