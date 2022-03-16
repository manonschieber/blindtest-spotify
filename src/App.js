/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = '<<Copiez le token de Spotify ici>>';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const AlbumCover = (props) =>  {
  const track = props.track;
  var src = "";
  if(track){
    src = track.album.images[0].url;
  }
  return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}

const App = () => {
  const apiToken = "BQAd7m2ji9MCMiKHJS6pINiEzhnCMbde2KFOPqI4QE2ungLo9a04Qed3J2LT2pPdiQaJ0zNvzpelCoaXB9AAIiBT0LfWzXCGfk6k_3YaNEcacyW6X28JhQhbxdc2cVd50TkpJn90_bzJ1Z-YJ2CoIVwisQ839-VRJ81soRvm52hIO98utWHgFfGs9xEH8ZyKmn_hTIUCwr2K1Iy8DiDPP0c6ONd7P2UpQs2qw-Jkth2jsyXSgoX34sqzQ4Dfe4j7Zn4WX6WBC1gx1w0yWCdrHEdR25h0iObLw_puN40i";
  const [text, setText] = useState('');
  const [randomSong1, setRandomSong1] = useState(0);
  const [randomSong2, setRandomSong2] = useState(0);
  const [randomSong3, setRandomSong3] = useState(0);
  const [currentSong, setCurrentSong] = useState('');
  const [randomID, setRandomID] = useState(0);
  const [play, setPlay] = useState(false);
  const [tracks, setTracks] = useState('');
  const [songsLoaded, setSongsLoaded] = useState(false);
  useEffect(() => {
    setRandomSong1(getRandomNumber(20));
    setRandomSong2(getRandomNumber(20));
    setRandomSong3(getRandomNumber(20));
  fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
     Authorization: 'Bearer ' + apiToken,
    },
  })
    .then(response => response.json())
    .then((data) => {
      setTracks(data.items);
      setSongsLoaded(true);
    })
    .catch(() => {
      setSongsLoaded(false);
    })}, [])

    useEffect(() => {
      const a = getRandomNumber(3);
      console.log(a);
      if(a===0 && tracks && tracks[randomSong1] && tracks[randomSong1].track && tracks[randomSong1].track.preview_url){
        setCurrentSong(tracks[randomSong1].track.preview_url);
        console.log("toto");
      } else{
        if(a===1 && tracks && tracks[randomSong1] && tracks[randomSong1].track && tracks[randomSong1].track.preview_url){
          setCurrentSong(tracks[randomSong2].track.preview_url);
        } else{
          if (a===2 && tracks && tracks[randomSong1] && tracks[randomSong1].track && tracks[randomSong1].track.preview_url){
            setCurrentSong(tracks[randomSong3].track.preview_url);
        }
      }
    }
    }, [randomSong1, randomSong2, randomSong3, tracks])

  function checkAnswer(idSong) {
    console.log(idSong);
    console.log(currentSong);
    if(currentSong===idSong){
      swal('Bravo', 'Sous-titre', 'success');
    } else{
      swal('Alerte !!', 'Ceci est une alerte', 'error');
    }
  }

  console.log(currentSong);
  return songsLoaded ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        {/* <AlbumCover track={tracks && tracks[0] && tracks[0].track} /> */}
        <Sound url={play && currentSong} playStatus={Sound.status.PLAYING}/>
      </div>
      <div className="App-buttons">
      <Button onClick={() => setPlay(true) }>Play</Button>
      <Button onClick={() => setPlay(false)}>Pause</Button>
      <Button onClick={() => checkAnswer(tracks[randomSong1].track.preview_url)}>{tracks && tracks[randomSong1] && tracks[randomSong1].track && tracks[randomSong1].track.name}</Button>
      <Button onClick={() => checkAnswer(tracks[randomSong2].track.preview_url)}>{tracks && tracks[randomSong2] && tracks[randomSong2].track && tracks[randomSong2].track.name}</Button>
      <Button onClick={() => checkAnswer(tracks[randomSong3].track.preview_url)}>{tracks && tracks[randomSong3] && tracks[randomSong3].track && tracks[randomSong3].track.name}</Button>
      </div>
    </div>) : (    <div className="App">
      <header className="App-header">
        <img src={loading} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <AlbumCover track={tracks && tracks[0] && tracks[0].track} />
        <Sound url={play && tracks && tracks[0]  && tracks[0].track && tracks[0].track.preview_url} playStatus={Sound.status.PLAYING}/>
        <p>{text}</p>
      </div>
      <div className="App-buttons">
      <Button onClick={() => setPlay(true)}>Play</Button>
      <Button onClick={() => setPlay(false)}>Pause</Button>
      </div>
    </div>)
}

export default App;
