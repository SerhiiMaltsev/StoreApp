import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import ButtonAppBar from '../Navbar/Navbar.js'
import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";
import CartItem from "./cartItem.js"

function ShoppingCart() {
  const { user, setUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [subTotal, setSubtotal] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/users/getUsers")
    .then((res) => res.json())
    .then((text) => setAllUsers(text.result))
    .catch((err) => console.log(err))

    fetch("http://localhost:9000/products/allProducts")
    .then((res) => res.json())
    .then((text) => setProducts(text.result))
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    for(let i=0; i<allUsers.length; i++) {
      if(allUsers[i].name===user) {
        setCart(allUsers[i].cart)
        break;
      }
    }
    const itemsInCart=[]
    for(let i=0; i<products.length; i++) {
      if(cart.includes(products[i].id)) {
        itemsInCart.push(products[i])
      }
    }
    setCartProducts(itemsInCart)
    var total=0;
    for(let i=0; i<itemsInCart.length; i++) {
      const numPrice=parseFloat(itemsInCart[i].price);
      total=total+numPrice;
    }
    console.log(total)
    setSubtotal(total)
  }, [allUsers, products])

  return (
    <div>
      <ButtonAppBar/>
      <Box component="main" >
        <Toolbar />
        <Grid className="Products" container spacing={10}>
          {Object.keys(cartProducts).map((keyName, i) => (
            <Grid className="Product" item xs={2.5}>
              <CartItem product={cartProducts[i]}/>
            </Grid>
          ))}
        </Grid>
        </Box>
        <hr></hr>
        <center>
          <h1>Subtotal: ${subTotal}</h1>
        </center>
    </div>
  )
}

export default ShoppingCart
