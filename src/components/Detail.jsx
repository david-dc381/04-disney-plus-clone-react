import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
import db from '../firebase';

const Detail = () => {

  const { id } = useParams(); // obtenemos solo el id de la película

  // para cambiar el estado de la película
  const [movie, setMovie] = useState();

  // cuando se cargue la película
  useEffect(() => {
    // OObtenemos la información de película de la DB
    db.collection('movies')
      .doc(id)
      .get()
      // una vez ya obtenido la info del documento, veirificamos si existe para mostrar la data
      .then((doc) => {
        if (doc.exists) {
          // guardar la informción de la película
          setMovie(doc.data());
        } else {
          // reedirecciona al home
        }
      })
  }, [])

  return (
    <Container>

    {/* useEffect tarda en ejecutarse unos cuantos segundos hasta obtener los datos y por eso debemos verificar si esos datos existen antes de que los datos se carguen porque todavia no existen hasta que este listop el useEffect */}
      { movie && (
        <>
          <Background>
            <img
              src={ movie.backgroundImg }
              alt={ movie.title }
            />
          </Background>
          <ImageTitle>
            <img
              src={ movie.titleImg }
              alt={ movie.title }
            />
          </ImageTitle>
          <Controls>
            <PlayButton>
              <img src="/images/play-icon-black.png" alt="play button" />
              <span>PLAY</span>
            </PlayButton>
            <TrailerButton>
              <img src="/images/play-icon-white.png" alt="trailer button" />
              <span>Tailer</span>
            </TrailerButton>
            <AddButton>
              <span>+</span>
            </AddButton>
            <GroupWatchButton>
              <img src="/images/group-icon.png" alt="group watch icon" />
            </GroupWatchButton>
          </Controls>
          <SubTitle>
            { movie.subTitle }
          </SubTitle>
          <Description>
            { movie.description }
          </Description>
        </>
      )}
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;

const Background = styled.div`
  position: fixed;
  top: 0; 
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  width: 35vw;
  height: 30vh;
  min-width: 200px;
  min-height: 170px;
  margin-top: 60px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
`;

const PlayButton = styled.button`
  height: 56px;
  padding: 0 24px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background-color: rgb(198, 198, 198);
  }
`;

const TrailerButton = styled(PlayButton)`
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`;

const AddButton = styled.div`
  width: 44px;
  height: 44px;
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
  margin-right: 16px;

  span {
    margin-top: -5px;
    font-size: 30px;
    color: #fff;
  }
`;

const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`;

const Description = styled.div`
  max-width: 760px;
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
`;