import {Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import "./SideBar.css"
import Item from "./Item.js"
import {useNavigate} from 'react-router-dom'
import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";

const drawerWidth = "35vh";

export default function ClippedDrawer() {
  let navigate= useNavigate();
  const listOfProducts = [{name: "product1"}, {name: "product2"}, {name: "product3"}, {name: "product4"}, {name: "product5"}, {name: "product6"}, {name: "product7"}, {name: "product8"}, {name: "product9"}, {name: "product10"}, {name: "product11"}]
  const { user, setUser } = useContext(UserContext);

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

  return (
    <Box sx={{ display: 'flex', color:"#F84C1E", fontFamily: 'Georgia, serif'  }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:'#F84C1E'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{color:'#232D4B', marginRight: "125px"}}>
            Welcome to UVA Market Place          
          </Typography> <br></br>
          {user==='Guest User' &&
            <Button onClick={loginClick} color="inherit" sx={{color:'#232D4B'}}>Login</Button>
          }
          <Button onClick={homeClick} color="inherit" sx={{color:'#232D4B'}}>Home</Button>
          <Button onClick={shoppingCartClick} color="inherit" sx={{color:'#232D4B'}}>Shop</Button>
          <Button onClick={shoppingCartClick} color="inherit" sx={{color:'#232D4B'}}>Cart</Button>
          <Button onClick={registerClick} color="inherit" sx={{color:'#232D4B'}}>Register</Button>
          <Button onClick={profileClick} color="inherit" sx={{color:'#232D4B'}}>Profile</Button>
          {user!=='Guest User' &&
            <Button onClick={logoutClick} color="inherit" sx={{color:'#232D4B', marginLeft: "840px" }}>Logout</Button>
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
            <TextField id="Search-bar" label="Search" variant="outlined" sx={{marginTop: "30px"}}/>
            <div className="SearchButton">
              <Button variant="contained"  sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Search</Button>
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
        <Toolbar sx={{marginTop: "30px"}} />
        <Grid className="Products" container spacing={10} sx={{marginLeft: "1px"}}>
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
