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

  var [listOfProducts, setListOfProducts] = useState([])
  var [shownProducts, setShownProducts] = useState([])
  const [cart, setCart] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  let navigate= useNavigate();
  const { user, setUser } = useContext(UserContext);

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

    fetch("http://localhost:9000/users/getUsers")
      .then((res) => res.json())
      .then((text) => setAllUsers(text.result))
      .catch((err) => console.log(err))

    fetch("http://localhost:9000/products/allProducts")
      .then((res) => res.json())
      .then((text) => setProducts(text.result))
      .catch((err) => console.log(err))

      //listOfProducts=products
      //shownProducts=products

  }, [])

  useEffect(() => {
    for(let i=0; i<allUsers.length; i++) {
      console.log(allUsers[i].name)
      if(allUsers[i].name===user) {
        setCart(allUsers[i].cart)
        break;
      }
    }
   
    const includeProducts=[]
    for(let i=0; i<products.length; i++) {
      if(!cart.includes(products[i].id)) {
        includeProducts.push(products[i])
      }
    }
    setListOfProducts(includeProducts)
    setShownProducts(includeProducts)

  }, [allUsers, products])


  function reset(){
    setProducts(listOfProducts)
  }

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

  const shoppingCartGuestClick = () =>{
    navigate("/shoppingcartguest")
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
          {user!=='Guest User' &&
          <Button onClick={shoppingCartClick} color="inherit" sx={{color:'#232D4B'}}>Cart</Button>
          }
          {user==='Guest User' &&
          <Button onClick={registerClick} color="inherit" sx={{color:'#232D4B'}}>Register</Button>
          }
          {user==='Guest User' &&
          <Button onClick={shoppingCartGuestClick} color="inherit" sx={{color:'#232D4B'}}>Cart</Button>
          }
          {user!=='Guest User' &&
          <Button onClick={listProductClick} color="inherit" sx={{color:'#232D4B'}}>List Product</Button>
          }
          <Button onClick={profileClick} color="inherit" sx={{color:'#232D4B'}}>Profile</Button>

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
        <Box sx={{ overflow: 'auto', margin: 5, }}>
          <div className="SearchElems">
            <TextField id="Search-bar" label="Search" variant="outlined" onChange={(e) => {setSearchInput(e.target.value)}} sx={{marginTop: "30px"}}/>
            <div className="SearchButton">
              <Button variant="contained" onClick={search} sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Search</Button>
              <Button variant="contained" onClick={reset} sx={{ marginTop: "2vh", color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Reset</Button>
              {user!=="Guest User" &&
              <h2>Logged In As: {user}</h2>
            }
            {user==="Guest User" &&
              <h2>Currently Not Logged In </h2>
            }
            </div>
          </div>
        </Box>
      </Drawer>

      <Box component="main" >
        <Toolbar />
        <Grid className="Products" container spacing={10}>
          {Object.keys(listOfProducts).map((keyName, i) => (
            <Grid className="Product" item xs={2.5}>
              <Item product={listOfProducts[i]}/>
            </Grid>
          ))}
        </Grid>
        </Box>
    </Box>
  );
}
