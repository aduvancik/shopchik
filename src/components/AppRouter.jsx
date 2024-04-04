import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { privateRoutes, publicRoutes } from '../routes';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
//components
import { Login } from './Chat/Login';
import { Context } from '..';
//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { Loyout } from './Loyout';
import HomePages from '../pages/HomePages';

export default function AppRouter() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);




  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Loyout />}>

          {privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} exact />
          ))}
          <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          <Route index element={<HomePages />} />
        </Route>
      ) : (<>
        <Route path="/" element={<Loyout />}>

          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} exact />
          ))}

          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
          <Route index element={<HomePages />} />
        </Route>
        <Route path={LOGIN_ROUTE} element={<Login />} />
      </>
      )}
    </Routes>
  );
}
