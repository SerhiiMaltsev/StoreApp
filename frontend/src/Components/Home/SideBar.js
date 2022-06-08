import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import "./SideBar.css"
import Item from "./Item.js"
import {useNavigate} from 'react-router-dom'
import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import uuid from "react-uuid"
import axios from "axios"

const drawerWidth = "35vh";

export default function ClippedDrawer() {

  var listOfProducts = [{name: "product1"}, {name: "product2"}, {name: "product3"}, {name: "product4"}, {name: "product5"}, {name: "product6"}, {name: "product7"}, {name: "product8"}, {name: "product9"}, {name: "product10"}, {name: "product11"}]
  var shownProducts = [{name: "product1"}, {name: "product2"}, {name: "product3"}, {name: "product4"}, {name: "product5"}, {name: "product6"}, {name: "product7"}, {name: "product8"}, {name: "product9"}, {name: "product10"}, {name: "product11"}]

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [popup,setPopUp] = useState(false);
  const [shoppingCartItems, setShoppingCartItems] = useState({});
  const [shoppingCartTotal, setShoppingCartTotal] = useState();

  if (document.cookie) {
    console.log(document.cookie)
  } else {
    const userUUID = `userUUID=${uuid()}`
    console.log(userUUID)
    const expiration = `expires=${new Date('01/01/2100').toUTCString()}`
    document.cookie = `${userUUID};${expiration};SameSite=Lax`;
  }

  function closewindow(e){
      e.preventDefault();
      setPopUp(!popup);
      var tempDictOfItems = {};
      var total = 0;
      Object.entries(shoppingCartItems)
      .map(([key, value])=>{
        if (key != "uuid"){
          tempDictOfItems[key] = value;
          total += value;
        }
      })
      console.log(total);
      console.log(shoppingCartItems);
      setShoppingCartTotal(total);
      setShoppingCartItems(tempDictOfItems);
  };

  function search(){
    shownProducts = []
    for (let i = 0; i < listOfProducts.length; i++) {
      if (listOfProducts[i].name.includes(searchInput)){
        shownProducts.push(listOfProducts[i])
      }
    }
    setProducts(shownProducts)
    console.log(products)
  }

  useEffect(() => {
    setProducts(shownProducts)

    axios.put("http://localhost:9000/cartsguests/getitems", {
        uuid: document.cookie,
    })
    .then((res) => setShoppingCartItems(res.data.result.cart))
    .catch((err) => console.log(err))
  }, [])

  function reset(){
    setProducts(listOfProducts)
  }
  let navigate= useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    navigate("/")
  }, [])

  const loginClick = () =>{
    setUser('')
    navigate("/login")
  }
  const homeClick = () =>{
    navigate("/")
  }
  const profileClick = () =>{
    navigate("/profile")
  }
  const shoppingCartClick = () =>{
    navigate("/shoppingcart")
  }
  const registerClick = () =>{
    navigate("/registration")
  }
  const logoutClick = () =>{
    setUser('')
    navigate("/login")
  }
  const listProductClick = () =>{
    navigate("/newProduct")
  }

  const openCart = () =>{
    console.log("Open cart")
  }

  return (
    <Box sx={{ display: 'flex', color:"#F84C1E", fontFamily: 'Georgia, serif'  }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:'#F84C1E'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{color:'#232D4B', marginRight: "125px"}}>
            UVA Market Place
          </Typography> <br></br>
          {user==='Guest User' &&
            <Button onClick={loginClick} color="inherit" sx={{color:'#232D4B'}}>Login</Button>
          }
          <Button onClick={homeClick} color="inherit" sx={{color:'#232D4B'}}>Home</Button>
          <Button onClick={shoppingCartClick} color="inherit" sx={{color:'#232D4B'}}>Shop</Button>
          <Button onClick={shoppingCartClick} color="inherit" sx={{color:'#232D4B'}}>Cart</Button>
          {user==='Guest User' &&
          <Button onClick={registerClick} color="inherit" sx={{color:'#232D4B'}}>Register</Button>
          }
          {user!=='Guest User' &&
          <Button onClick={listProductClick} color="inherit" sx={{color:'#232D4B'}}>List Product</Button>
          }
          <Button onClick={profileClick} color="inherit" sx={{color:'#232D4B'}}>Profile</Button>
          <ShoppingCartIcon sx={{ color: "black"}} onClick={closewindow}/>
          {user!=='Guest User' &&
            <Button onClick={logoutClick} color="inherit" sx={{color:'#232D4B', marginLeft: "755px" }}>Logout</Button>
          }

          <Dialog open={popup} fullWidth={30}>
            <DialogTitle>Shopping Cart</DialogTitle>
            <DialogContent>
              <ul>
                {Object.entries(shoppingCartItems).map(([key, value]) => (
                  <li><p>{key} - ${value}</p></li>
                ))}
              </ul>
              <p> Total: ${shoppingCartTotal}</p>
            </DialogContent>
            <DialogActions>
              <Button color="inherit" sx={{color:'#232D4B', marginLeft: "755px" }}>Checkout</Button>
              <Button onClick={closewindow} color="inherit" sx={{color:'#232D4B', marginLeft: "755px" }}>Close</Button>
            </DialogActions>
          </Dialog>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          marginTop: "50px"
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <div className="SearchElems">
            <TextField id="Search-bar" label="Search" variant="outlined" onChange={(e) => {setSearchInput(e.target.value)}} sx={{marginTop: "30px"}}/>
            <div className="SearchButton">
              <Button variant="contained" onClick={search} sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Search</Button>
              <Button variant="contained" onClick={reset} sx={{ marginTop: "2vh", color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Reset</Button>
              {user!=="Guest User" &&
              <h1>Logged In As: {user}</h1>
            }
            {user==="Guest User" &&
              <h1>Currently Not Logged In </h1>
            }
            </div>
          </div>
        </Box>
      </Drawer>

      <Box component="main" >
        <Toolbar />
        <Grid className="Products" container spacing={10}>
          {Object.keys(products).map((keyName, i) => (
            <Grid className="Product" item xs={2.5}>
              <Item product={products[i]}/>
            </Grid>
          ))}
        </Grid>
        </Box>
    </Box>
  );
}
