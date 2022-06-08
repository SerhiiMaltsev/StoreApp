import { UserContext} from '../../Contexts/userContext';
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate} from 'react-router-dom'
import ButtonAppBar from '../Navbar/Navbar.js'

function NewProduct() {
    let navigate= useNavigate();
    const categories = ["Apparel", "Clothing", "Electrionics" , "Kitchen Supplies", "Accessories", 
    "University Apparel", "School Supplies", "TextBooks", "Sports Apparel", "Health and Wellness", "Miscellaneous"]
    const { user, setUser } = useContext(UserContext);
    const productNameRef = useRef(null);
    const catRef = useRef(null);
    const detailRef = useRef(null);
    const priceRef = useRef(null);

    const addProduct = (e) => {
        e.preventDefault();
        axios.put("http://localhost:9000/products/addProduct", {
            user: user,
            name: productNameRef.current.value,
            category: catRef.current.value,
            price: priceRef.current.value, 
            details: detailRef.current.value
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
        alert("Product Listed!")
        navigate("/")

        productNameRef.current.value = ""
        catRef.current.value = ""
        detailRef.current.value = ""
        priceRef.current.value = ""
      }
return(
    <div>
    <ButtonAppBar sx={{marginBottom: "20px"}}/> <br></br><br></br>
    <h1 style={{color: '#232D4B', fontFamily: 'Georgia, serif',
      textAlign: "center", backgroundColor: '#F84C1E', marginTop: "20px", padding: "10px" }}>Add Product</h1> <br></br> <hr></hr> <br></br>
        <center>
    <form onSubmit={addProduct} style={{alignContent: 'center'}}>
        <TextField varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="Name of Product"
            inputRef={productNameRef}
            sx={{width: '200px',}}
        /> <br></br><br></br>

        <Autocomplete
            disablePortal
            options={categories}
            renderInput={(params) => <TextField
            sx={{
                width: '200px',
            }}
            {...params}
            label="Category"
            inputRef={catRef}
            />}
        /> <br></br>

        <TextField varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="Price"
            helperText="Enter Dollar and Cent Amount (ex. 15.25)"
            inputRef={priceRef}
            sx={{
                width: "200px",
                textAlign: "center"
            }}
        /> <br></br><br></br>

        <TextField varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="Details"
            helperText="size, color, description etc."
            inputRef={detailRef}
            sx={{
                width: "800px",
                textAlign: "center"
            }}
        /> <br></br><br></br>
        

        <Button type="submit" variant='outlined'
            sx={{ color: '#232D4B', borderColor: '#232D4B', width: "800px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Add Product
        </Button>
    </form>
    </center>
    </div>
    )
}

export default NewProduct;

