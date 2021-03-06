import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Typography, Box, Divider, Grid, Stack } from '@mui/material'
import { Container } from '@mui/system'
import Product from '../Product/Product'
import { UserContext} from '../../Contexts/userContext';
import ButtonAppBar from '../Navbar/Navbar.js'
import Item from '../Home/Item'
import { Helmet } from 'react-helmet'

function Profile(props) {
  
  const { user, setUser } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([])
  const BASE_URL = "http://localhost:9000/"
//users/userProducts?seller=?{user}
   useEffect(() =>{
    // console.log(user)
     axios.get(`${BASE_URL}users/userProducts?seller=${user}`)
    .then((res) => res.data)
    .then((text) => setUserProducts(text.result))
    .catch((err) => console.log(err))
   },[])
  //console.log(userProducts)
  return (
    <div>
      <Helmet><title>Profile Page</title></Helmet>

      <br></br> <br></br><br></br>
     
      <Typography variant='h3' style={{ color: '#232D4B', textAlign: "right", padding: '10', fontWeight: 'bold', letterSpacing: '3px'}}>{user}</Typography>
      <Box display='flex' flexDirection='row'>
        <Typography style={{fonteight: "bold"}}>Your products</Typography>
        <Divider ></Divider>

            <Container maxWidth='false' sx={{m: 2}} style={{ padding: '0px', overflow: 'auto'}}>
            <Stack direction='row'>
              {userProducts.map((product) => {
                return(<Product key={product.id} product={product}/>)
              })}
            </Stack>
            </Container>
        
      </Box>

      <ButtonAppBar/>
      
    </div>
  )
}

export default Profile
