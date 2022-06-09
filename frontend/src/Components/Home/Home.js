import React from 'react'
import { Button } from '@mui/material'
import { ShoppingCartIcon } from '@mui/icons-material';
import uuid from "react-uuid"
import ButtonAppBar from "../Navbar/Navbar.js"
import ClippedDrawer from "./SideBar.js"
import axios from 'axios'
import { Helmet } from 'react-helmet';

function Home() {

  var product = {name: "product", price: "$100.00"}
  var shoppingCart = []

  if (document.cookie) {
    console.log(document.cookie)
  } else {
    const userUUID = `userUUID=${uuid()}`
    console.log(userUUID)
    const expiration = `expires=${new Date('01/01/2100').toUTCString()}`
    document.cookie = `${userUUID};${expiration};SameSite=Lax`;
    console.log(document.cookie)
  }

  return (
    <div className="Home">
      <Helmet><title>Home</title></Helmet>

      <ClippedDrawer/>
    </div>
  )
}

export default Home;
