import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {client_id, client_secret, redirect_uri} from '../hidden' 
//import '../web-api-examples/authentication/authorization_code'

function App() {
  //const [count, setCount] = useState(0)
  const [track, setTrack] = useState("");
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

    //Get request with trackID to get the track
    // var returnedTrack = await fetch('https://api.spotify.com/v1/tracks/' + trackID + '?include_groups=preview_url',trackParameters)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });

  }

  return (
    <div className="App">

      <input
      type="text"
      placeholder='Recommend a track'
      value={userInput}
      onChange={handleInput}
      />
      <button onClick={FindSong}>Post</button>
      <h1>{userInput}</h1>
      <iframe style={{borderRadius: 12 + 'px'}} src={"https://open.spotify.com/embed/track/" + track + "?utm_source=generator"}
      width="100%" height="152" frameBorder="0" allowFullScreen="" 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy"></iframe>

    </div>
  )
}

export default App

{/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}