import {Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";

export default function ButtonAppBar() {

  let navigate= useNavigate();
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
    <Box>
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
          <Button onClick={logoutClick} color="inherit" sx={{color:'#232D4B'}}>Logout</Button>
        }
      </Toolbar>
    </AppBar>
    </Box>
  );
}
