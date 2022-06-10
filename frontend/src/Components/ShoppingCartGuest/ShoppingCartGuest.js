import { Button } from '@mui/material';
import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext} from '../../Contexts/userContext';
import ButtonAppBar from '../Navbar/Navbar.js'
import uuid from "react-uuid"
import axios from "axios"
import "./ShoppingCartGuest.css"

function ShoppingCartGuest() {

  const [shoppingCartItems, setShoppingCartItems] = useState({});
  const [shoppingCartTotal, setShoppingCartTotal] = useState();
  const { user, setUser } = useContext(UserContext);

  if (document.cookie) {
    console.log(document.cookie)
  } else {
    const userUUID = `userUUID=${uuid()}`
    console.log(userUUID)
    const expiration = `expires=${new Date('01/01/2100').toUTCString()}`
    document.cookie = `${userUUID};${expiration};SameSite=Lax`;
  }

  useEffect(() => {
    axios.put("http://localhost:9000/cartsguests/getitems", {
        uuid: document.cookie,
    })
    .then((res) => {

      var total = 0.0;
      var tempDictOfItems = {};

      Object.entries(res.data.result.cart)
      .map(([key, value])=>{
        if (key != "uuid"){
          total += value;
          tempDictOfItems[key] = value;
        }
      })

      setShoppingCartItems(tempDictOfItems)
      setShoppingCartTotal(total);

    })
    .catch((err) => console.log(err))
  }, [])

  const deleteItem = async (name) => {
    console.log(name)
    await axios.put("http://localhost:9000/cartsguests/deleteitem", {
      uuid: document.cookie,
      name: name
    })
    .then(window.location.reload(false))
    .catch((err) => console.log(err))
  }

  return (
    <div>
      {setUser("Guest User")}
      <ButtonAppBar/>
      <div className="GuestCart">
          {Object.entries(shoppingCartItems).map(([key, value]) => (
            <p>{key} - ${value} <Button onClick={() => deleteItem(key)} variant="contained" sx={{ color: 'yellow', backgroundColor: 'red', borderColor: 'green' }}>Delete</Button></p>
          ))}
        <p> Total: ${shoppingCartTotal}</p>
        <Button variant="contained" sx={{ color: 'yellow', backgroundColor: 'red', borderColor: 'green' }}>Checkout</Button>
      </div>
    </div>
  )
}

export default ShoppingCartGuest
