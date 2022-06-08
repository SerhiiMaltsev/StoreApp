import { UserContext } from "./Contexts/userContext";
import { useState, useContext } from 'react';
import Login from "./Components/Login/Login.js"
import Home from "./Components/Home/Home.js"

function App() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/shoppingcart' element={<ShoppingCart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
