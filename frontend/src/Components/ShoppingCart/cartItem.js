import React, { useState, useEffect, useRef, useContext } from "react";
import {Paper, Button} from '@mui/material';
import axios from "axios"
import { UserContext} from '../../Contexts/userContext';
import { NightlifeOutlined } from "@mui/icons-material";

function CartItem(props) {
  const { user, setUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [cart, setCart] = useState([]);
  return (
      <div className="Item">
      <Paper elevation={3}>
          <h3>{props.product.productName}</h3>
          <p>price: ${props.product.price}</p>
          <p>Category: {props.product.category}</p>
          <p>Listed by: {props.product.seller}</p>
          <p>Details: {props.product.details}</p>
        </Paper> 
      </div> 
  )
}

export default CartItem
