import React, { useState, useEffect, useRef, useContext } from "react";
import {Paper, Button} from '@mui/material';
import axios from "axios"
import { UserContext} from '../../Contexts/userContext';
import { NightlifeOutlined } from "@mui/icons-material";

function Item(props) {
  const { user, setUser } = useContext(UserContext);
  const cart=props.cart;

  const addToCart = async () => {
    await axios.put("http://localhost:9000/users/addToCart", {
      productID: props.product.id,
      user: user
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }

  return (
      <div className="Item">
        <Paper elevation={3}>
          <p>{props.product.name}</p>
          <p>price: ${props.product.price}</p>
          <p>Category: {props.product.category}</p>
          <p>Listed by: {props.product.seller}</p>
          <p>Details: {props.product.details}</p>
          <Button onClick={addToCart} variant="contained" sx={{marginBottom: "10px", color: '#232D4B', 
          borderColor: '#232D4B', width: "150px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Add to Cart</Button>
        </Paper>
      </div> 
  )
}

export default Item
