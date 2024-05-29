import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';

export default function Navbar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <div>
      <div>
        {user ?
          <button className='button' onClick={() => auth.signOut()}>Вийти</button>
          :
          <Link to={LOGIN_ROUTE}>
            <button className='button'>Логин</button>
          </Link>

        }
      </div>
    </div>
  )
}
