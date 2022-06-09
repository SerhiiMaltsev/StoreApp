import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login/Login.js"
import Home from "./Components/Home/Home.js"
import Profile from "./Components/Profile/Profile.js"
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from './Contexts/userContext';
import { render } from "react-dom";
import { UserContext} from './Contexts/userContext';
import Registration from "./Components/Login/Registration.js"
import NewProduct from "./Components/Home/newProduct.js"
import ShoppingCartGuest from "./Components/ShoppingCartGuest/ShoppingCartGuest.js"

const rootElement = document.getElementById('root');
render(
  <UserProvider>
    <BrowserRouter >
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/newProduct' element={<NewProduct/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/shoppingcart' element={<ShoppingCart/>}/>
            <Route path='login/registration' element={<Registration/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/shoppingcartguest' element={<ShoppingCartGuest/>}/>
          </Routes>
      </BrowserRouter>
    </UserProvider>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
