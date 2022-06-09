import {Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import "./SideBar.css"
import Item from "./Item.js"
import {useNavigate} from 'react-router-dom'
import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";

const drawerWidth = "35vh";

export default function ClippedDrawer() {
  var listOfProducts = []
  var shownProducts = []
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [cart, setCart] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  let navigate= useNavigate();
  const { user, setUser } = useContext(UserContext);

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
    fetch("http://localhost:9000/users/getUsers")
      .then((res) => res.json())
      .then((text) => setAllUsers(text.result))
      .catch((err) => console.log(err))

      console.log(allUsers)
      for(let i=0; i<allUsers.length; i++) {
        console.log(allUsers[i].name)
        if(allUsers[i].name===user) {
          setCart(allUsers[i].cart)
          break;
        }
      }

    fetch("http://localhost:9000/products/allProducts")
      .then((res) => res.json())
      .then((text) => setProducts(text.result))
      .catch((err) => console.log(err))

      listOfProducts=products
      shownProducts=products

      console.log(cart)
      const finalProducts=[]
      for(let i=0; i<products.length; i++) {
        console.log(products[i].id)
        if(!cart.contains(products[i].id)) {
          finalProducts.push(products[i])
        }
      }
      listOfProducts=finalProducts
      shownProducts=finalProducts

  }, [])

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
          {user!=='Guest User' &&
            <Button onClick={logoutClick} color="inherit" sx={{color:'#232D4B', marginLeft: "755px" }}>Logout</Button>
          }
          
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
              <Item product={products[i]} cart={cart}/>
            </Grid>
          ))}
        </Grid>
        </Box>
    </Box>
  );
}
