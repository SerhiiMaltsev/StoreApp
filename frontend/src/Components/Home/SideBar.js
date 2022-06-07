import * as React from 'react';
import {Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import "./SideBar.css"
import Item from "./Item.js"
import {useState, useEffect} from 'react';

const drawerWidth = "35vh";

export default function ClippedDrawer() {
  var listOfProducts = [{name: "product1"}, {name: "product2"}, {name: "product3"}, {name: "product4"}, {name: "product5"}, {name: "product6"}, {name: "product7"}, {name: "product8"}, {name: "product9"}, {name: "product10"}, {name: "product11"}]
  var shownProducts = [{name: "product1"}, {name: "product2"}, {name: "product3"}, {name: "product4"}, {name: "product5"}, {name: "product6"}, {name: "product7"}, {name: "product8"}, {name: "product9"}, {name: "product10"}, {name: "product11"}]
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState();

  function search(){
    shownProducts = []
    for (let i = 0; i < listOfProducts.length; i++) {
      if (listOfProducts[i].name.includes(searchInput)){
        shownProducts.push(listOfProducts[i])
      }
    setProducts(shownProducts)
    }
  }

  useEffect(() => {
    setProducts(shownProducts)
  }, [])

  function reset(){
    setProducts(listOfProducts)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Welcome to "Name of the website"
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Shop</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Cart</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <div className="SearchElems">
            <TextField id="Search-bar" label="Search" variant="outlined" onChange={(e) => {setSearchInput(e.target.value)}}/>
            <div className="SearchButton">
              <Button variant="contained" onClick={search}>Search</Button>
              <Button variant="contained" onClick={reset}>Reset</Button>
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
