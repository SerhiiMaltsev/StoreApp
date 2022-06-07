import React from 'react'
import {Paper, Button} from '@mui/material';

function Item(props) {
  return (
    <div className="Item">
      <Paper elevation={3}>
        <p>{props.product.name}</p>
        <Button variant="contained" sx={{marginBottom: "10px", color: '#232D4B', borderColor: '#232D4B', width: "150px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Add to Cart</Button>
      </Paper>
    </div>
  )
}

export default Item
