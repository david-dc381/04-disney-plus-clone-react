import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut
} from "../features/user/userSlice";
 import { auth, provider } from '../firebase';
 import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // para devolver el historial al login, cuando se cierra sesión
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  // usamos un useEffect, porque cada vez que recargamos la página se desaparacere el usuario logeado, porque el estado cambia
  useEffect(() => {
    // cuando el estado del auth cambia, es decir de la autenticación, entonces volvemos a llamara a los datos de la db.
    auth.onAuthStateChanged( async(user) => {
      if ( user ) {
        dispatch(setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
        history.push('/');
      }
    });
  }, [userName]);

  // para iniciar sesión con un popup
  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        // vamos a despachar al usuario y una vez despachado es decir logeado se nos mostrará el menu de navegación
        let user = result.user;
        dispatch(
          setUserLogin({
            // los datos los obtenemos de result cuando nos logeamos
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push('/home');
    });
  };

  // Para cerrar sesión, usamos setSignOut lo que definimos en userSlice
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push('/');
    });
  };

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {/* verificamos si existe un usuario logeado, si existe mostramos el menu y si no el boton de login */}
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a href="#">
              <img src="/images/home-icon.svg" alt="home icon" />
              <span>HOME</span>
            </a>
            <a href="#">
              <img src="/images/search-icon.svg" alt="search icon" />
              <span>SEARCH</span>
            </a>
            <a href="#">
              <img src="/images/watchlist-icon.svg" alt="watchlist icon" />
              <span>WATCHLIST</span>
            </a>
            <a href="#">
              <img src="/images/original-icon.svg" alt="originals icon" />
              <span>ORIGINALS</span>
            </a>
            <a href="#">
              <img src="/images/movie-icon.svg" alt="movie icon" />
              <span>MOVIES</span>
            </a>
            <a href="#">
              <img src="/images/series-icon.svg" alt="series icon" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg
              src={userPhoto}
              alt={userName}
            />
            <DropDown>
              <span onClick={ signOut }>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background-color: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;


const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  /* felx: 1, significa que la proporción de los elementos se adaptará al tamaño de la pantalla. Lo que hace que la foto de pérfil se vaya hacia la derecha. */
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: #fff;
    text-decoration: none;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 1.5px;
        display: block;
        background-color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0); /* hace que el div se redusca a un 0% de tamaño */
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const Login = styled.div`
  background-color: rbga(0, 0, 0, .6);
  border: 2px solid #f9f9f9;
  border-radius: 4px;
  padding: 8px 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const DropDown = styled.div`
  position: fixed;
  top: 48px;
  right: 10px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  text-align: center;
  width: 120px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:hover {
    /* asi seleccionamos otro elemento en styled components */
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;