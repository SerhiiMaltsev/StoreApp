import * as React from 'react';
import {Box, Grid, Paper, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, Button, TextField} from '@mui/material';
import "./SideBar.css"
import Item from "./Item.js"

const drawerWidth = "35vh";

export default function ClippedDrawer() {
  const listOfProducts = [{name: "product1"}, {name: "product2"}, {name: "product3"}, {name: "product4"}, {name: "product5"}, {name: "product6"}, {name: "product7"}, {name: "product8"}, {name: "product9"}, {name: "product10"}, {name: "product11"}]

  return (
    <Box sx={{ display: 'flex', color:"#F84C1E" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color:'white'  }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{color:'white'}}>
            Welcome to UVA Market Place          
          </Typography> <br></br>
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
            <TextField id="Search-bar" label="Search" variant="outlined"/>
            <div className="SearchButton">
              <Button variant="contained"  sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Search</Button>
            </div>
          </div>
        </Box>
      </Drawer>

      <Box component="main" >
        <Toolbar />
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
