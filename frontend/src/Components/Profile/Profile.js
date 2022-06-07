import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'
import { Container } from '@mui/system'
import Product from '../Product/Product'

function Profile(props) {
  const name = " placeholder"
  const [userProducts, setUserProducts] = useState({})
  // useEffect(() =>{
  //   axios.get(`users/`)
  //   .then(res => setUserProducts(res.data));
  //   console.log(res)
  // })
  
  return (
    <div>
      <Typography variant='h3' style={{textAlign: "right", padding: '10', fontWeight: 'bold', letterSpacing: '3px'}}>{name}</Typography>
      <Box display='flex' flexDirection='row'>
        <Typography>Your products for sale</Typography>
        
      </Box>
    </div>
  )
}

export default Profile