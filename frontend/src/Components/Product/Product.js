import { Paper, Box, Stack, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'


function Product(props) {
  const placeholderImage = "https://icons-for-free.com/iconfiles/png/512/goods+item+label+product+tag+tally+icon-1320168020112074005.png"
  return (
    <div>
      <div className="Item">
      <Box
      sx={{
        display: 'flex',
        minWidth: 500,
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <h3>{props.product.productName}</h3>
          <p>price: ${props.product.price}</p>
          <p>Category: {props.product.category}</p>
          <p>Listed by: {props.product.seller}</p>
          <p>Details: {props.product.details}</p>
          </CardContent>
          </Card>
        </Box>
      </div> 
    </div>
  )
}

export default Product
