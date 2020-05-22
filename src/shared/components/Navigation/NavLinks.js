import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();

    auth.logout();
  };

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/places/new'>New Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth'>Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <a href='/' onClick={logoutHandler}>
            Logout
          </a>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
