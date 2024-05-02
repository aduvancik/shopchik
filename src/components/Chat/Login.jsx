import React, { useContext, useState } from 'react';
//style
import "../../styles/login.scss";
//firebase
import firebase from 'firebase/compat/app';
import { Context } from '../..';

export function Login() {
  const { auth } = useContext(Context);
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, width } = event.target.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    setBackgroundPosition({ x, y: 0 });
  };

  const handleContainerHover = (event) => {
    const { clientX } = event;
    const { left } = event.target.getBoundingClientRect();
    // if (clientX - left <= 20) {
    //   setIsHovered(false);
    // }
  };

  return (
    <div
      className='login'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url(/background.jpeg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
        backgroundSize: isHovered ? '110% 110%' : '100% 100%',
        transition: 'background-size 0.5s',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className='login__container'
        onMouseMove={handleContainerHover}
        style={{
          width: '30%',
          // height: '60%',
          padding: '80px',
          background: '#e5e0e0',
          boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
          border: '#002F34 3px solid',
          borderRadius: '40px 0px 0px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '30px',
          position: 'absolute'
        }}
      >
        <div>
          <h1>Виберіть обліковий запис</h1>
          <h2>щоб перейти в додаток</h2>
        </div>
        <button onClick={login} className='button'>Увійти за допомогою
          Google</button>
      </div>
    </div>
  );
}
