import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

function Loyout() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "100px auto", background: "#fff" }}>
        <Outlet />
      </div>
    </>
  )
}

export { Loyout }
