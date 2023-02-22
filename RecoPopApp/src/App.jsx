import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {client_id, client_secret, redirect_uri} from '../hidden' 
//import '../web-api-examples/authentication/authorization_code'

function App() {
  //const [count, setCount] = useState(0)
  const [track, setTrack] = useState("");
  const [iframe, setIFrame] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    //API Access token
    var parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id='+client_id+'&client_secret='+client_secret
    }

    fetch('https://accounts.spotify.com/api/token',parameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))

  }, [])

  function FrameComponent(ID){
    console.log("In framecomponent")
    return (
      <div>
      <iframe style={{borderRadius: 12 + 'px', marginBottom: '10px', marginTop: '10px'}} src={"https://open.spotify.com/embed/track/" + ID + "?utm_source=generator"}
      width="600px" height="152" frameBorder="0" allowFullScreen="" margin-top="20px" 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy"></iframe>
      </div>
    );
  }

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  async function FindSong(event) {
    //console.log("Searching for " + userInput)

    //Search for trackID
    var trackParameters= {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var trackID = await fetch('https://api.spotify.com/v1/search?q='+userInput+'&type=track' ,trackParameters)
      .then(response => response.json())
      .then(data => { return data.tracks.items[0].id})

    console.log("track ID is " + trackID);
    setTrack(trackID);

    const newIframe = FrameComponent(trackID);
    setIFrame([newIframe, ...iframe]);

  }

  return (
    <div className="App">

      <div className="container">

        <input
        className='recommend'
        type="text"
        placeholder='Recommend a track'
        value={userInput}
        onChange={handleInput}
        />
        <button className='post' onClick={FindSong}>Post</button>
      </div>
      {iframe}

    </div>
  )
}

export default App
