import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
//import '../web-api-examples/authentication/authorization_code'

function FindSong(event) {
  // Use the searchQuery variable to perform search operation
  //console.log(`Performing search for "${searchQuery}"...`);
  
}

function App() {
  //const [count, setCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

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