import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {client_id, client_secret, redirect_uri} from '../hidden' 
//import '../web-api-examples/authentication/authorization_code'

function App() {
  //const [count, setCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("");
  const [accessToekn, setAccessToekn] = useState("");
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
      .then(track => setAccessToekn(track.access_token))

  }, [])

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  async function FindSong(event) {
    // Use the searchQuery variable to perform search operation
    //console.log(`Performing search for "${searchQuery}"...`);
    console.log("Searching for " + userInput)

    var trackID = await fetch('https://api.spotify.com/v1/search')
  }

  return (
    <div className="App">

      <input
      type="text"
      placeholder='Recommend a track/album/artist'
      value={userInput}
      onChange={handleInput}
      />
      <button onClick={FindSong}>Post</button>
      <h1>{userInput}</h1>

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