import React, { useState, useEffect, useRef, useContext } from "react";
import {Paper, Button} from '@mui/material';
import axios from "axios"
import { UserContext} from '../../Contexts/userContext';
import { NightlifeOutlined } from "@mui/icons-material";
import uuid from "react-uuid"

function Item(props) {
  const { user, setUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    fetch("/users/getUsers")
      .then((res) => res.json())
      .then((text) => setAllUsers(text.result))
      .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
      for(let i=0; i<allUsers.length; i++) {
        console.log(allUsers[i].name)
        if(allUsers[i].name===user) {
          setCart(allUsers[i].cart)
          break;
        }
      }
    //  alert(cart)
    }, [allUsers])

    if (document.cookie) {
      console.log(document.cookie)
    } else {
      const userUUID = `userUUID=${uuid()}`
      console.log(userUUID)
      const expiration = `expires=${new Date('01/01/2100').toUTCString()}`
      document.cookie = `${userUUID};${expiration};SameSite=Lax`;
    }

    const addToCart = async () => {
        console.log()
        if (user!=="Guest User") {
          await axios.put("/users/addToCart", {
            productID: props.product.id,
            user: user
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err))
        } else {
          await axios.put("/cartsguests/additem", {
            productID: props.product.id,
            uuid: document.cookie,
            name: props.product.productName,
            price: props.product.price
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err))
        }
      }


  return (
      <div className="Item">
      <Paper elevation={3}>
          <h3>{props.product.productName}</h3>
          <p>price: ${props.product.price}</p>
          <p>Category: {props.product.category}</p>
          <p>Listed by: {props.product.seller}</p>
          <p>Details: {props.product.details}</p>
          <Button onClick={addToCart} variant="contained" xs={2.5} sx={{marginBottom: "10px", color: '#232D4B', 
          borderColor: '#232D4B', width: "150px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Add to Cart</Button>
        </Paper> 
      </div> 
  )
}

export default Item
