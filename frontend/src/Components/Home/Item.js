import React from 'react'
import {Paper, Button} from '@mui/material';

function Item(props) {
  return (
    <div className="Item">
      <Paper elevation={3}>
        <p>{props.product.name}</p>
        <Button variant="contained">Add to Cart</Button>
      </Paper>
    </div>
  )
}

export default Item
