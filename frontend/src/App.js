import { UserContext } from "./Contexts/userContext";
import { useState, useContext } from 'react';
import Login from "./Components/Login/Login.js"
import Home from "./Components/Home/Home.js"

function App() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      {username==='' ? <Login
      /> : <Home
      />
      } 
    </div>
  );
}

export default App;
