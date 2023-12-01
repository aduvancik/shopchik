import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './header/Header';

const setActive = ({isActive}) => isActive ? 'active-link' : '';

function Loyout() {
  return (
    <>
        <Header />
      <Outlet />
      <footer>2023</footer>
    </>
  )
}

export { Loyout }
