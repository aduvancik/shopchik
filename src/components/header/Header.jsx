import React, { useState } from 'react';
//react-icons
import { BsChat, BsBasket2 } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { BiMessageAltAdd } from "react-icons/bi";
//styles
import "../../styles/header.scss";
import { Modal } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    const [showBasket, setShowBasket] = useState(false);

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
                        <NavLink to="/" className="header__functional_item">
                            <BsChat className='header__icon' />
                            <span>Повідомлення</span>
                        </NavLink>
                        <div className="header__functional_item" onClick={handleShow}>
                            <BsBasket2 className='header__icon' />
                            <span>Коризна</span>
                        </div>
                        <NavLink to="/profile" className="header__functional_item">
                            <MdSupervisorAccount className='header__icon' />
                            <span>Ваш профіль</span>
                        </NavLink>
                        <NavLink to="/Add-product" className="header__functional_item">
                            <BiMessageAltAdd className='header__icon' />
                            <span>Додати оголошення</span>
                        </NavLink>
                    </div>
                </div>
            </header>
            <Modal show={showBasket} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Корзина</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            </Modal>
        </>
    )
}
