import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login/Login.js"
import Home from "./Components/Home/Home.js"
import Profile from "./Components/Profile/Profile.js"
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart.js"
import {useTheme} from '@mui/material/styles'


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='shoppingcart' element={<ShoppingCart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
