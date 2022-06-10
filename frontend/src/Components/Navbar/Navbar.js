import {Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";

export default function ButtonAppBar() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState();
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
  const listProductClick = () =>{
    navigate("/newProduct")
  }

  const shoppingCartGuestClick = () =>{
    navigate("/shoppingcartguest")
  }

  return (
    <Box>
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
        {user!=='Guest User' &&
        <Button onClick={logoutClick} color="inherit" sx={{color:'#232D4B', marginLeft: "755px" }}>Logout</Button>
        }
      </Toolbar>
    </AppBar>
    </Box>
  );
}
