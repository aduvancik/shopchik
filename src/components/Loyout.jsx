import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

function Loyout() {
  return (
    <>
      <Header />
      <div className='loyout'>
        <Outlet />
      </div>
    </>
  )
}

export { Loyout }
