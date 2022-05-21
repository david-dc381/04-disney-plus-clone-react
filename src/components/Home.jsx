import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setMovies } from '../features/movie/movieSlice.jsx';
import db from '../firebase.js';
import ImgSlider from './ImgSlider';
import Movies from './Movies';
import Viewers from './Viewers';

const Home = () => {

  // lo usamos para despachar es acción
  const dispatch = useDispatch();

  // se ejecutará cuando se carga
  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      console.log(snapshot)
      let tempMovies = snapshot.docs.map((doc) => {
        console.log(doc.data())
        return { id: doc.id, ...doc.data() }
      });
      // despachamos las películas
      dispatch(setMovies(tempMovies));
      console.log(tempMovies)
    })
  }, []);

  return (
    <Container> 
      <ImgSlider />
      <Viewers />
      <Movies />
    </Container>
  )
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  /* Para poner la imagen de background */
  &:before {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

`;