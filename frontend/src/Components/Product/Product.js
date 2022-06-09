import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'


function Product(props) {
  const placeholderImage = "https://icons-for-free.com/iconfiles/png/512/goods+item+label+product+tag+tally+icon-1320168020112074005.png"
  return (
    <div>
      <Card variant="elevation" sx={{m: 2}} onClick={props.onClick} style={{}}> 
        <CardContent>
          <CardMedia component="img"
                height='240'
                width='200'
                image={placeholderImage}
                alt='Picture Not Found'>
          <Typography variant ='h6'>
                Name: {props.product.productName}
                Cost: {props.product.price}
                Seller: {props.product.seller}
            </Typography>     
          </CardMedia>
        </CardContent>
      </Card>
    </div>
  )
}

export default Product