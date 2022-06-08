import React from 'react'

import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Typography, Box } from '@mui/material'
import { Container } from '@mui/system'
import Product from '../Product/Product'
import { UserContext} from '../../Contexts/userContext';
import ButtonAppBar from '../Navbar/Navbar.js'

function Profile(props) {
  
  const { user, setUser } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([])
  const BASE_URL = "http://localhost:3000/"

   useEffect(() =>{
     axios.get(`${BASE_URL}users/userProducts`)
     .then((res) => {setUserProducts(res.data)
      console.log(res)
    });
   },[])
  
  return (
    <div>

      <Typography variant='h3' style={{textAlign: "right", padding: '10', fontWeight: 'bold', letterSpacing: '3px'}}>{user}</Typography>
      <Box display='flex' flexDirection='row'>
        <Typography>Your products for sale</Typography>
        
      </Box>

      <ButtonAppBar/>
      
    </div>
  )
}

export default Profile
