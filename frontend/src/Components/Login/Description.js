import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useRef, useContext } from "react";
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'


const Description = () => {
    return(
        <>
        <br></br> <br></br>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
            <Box sx = {{
            width: 1100, 
            height: 170, 
            borderRadius: 3, 
            padding: 6,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            backgroundColor: '#C3C7D2',}}>
                <h1>What is the UVA Marketplace?</h1>
                <Typography align = "center">Do you have clothes hanging in the back of your closet that haven’t been worn in years? 
                    Or maybe you’re graduating and don’t know what to do with those math textbooks on your desk. With UVA Marketplace, 
                    connect instantly with thousands of students to buy and sell your items. Our site offers secure payments and safety 
                    measures to ensure that each transaction is fair and safe.</Typography>
            </Box>
        </Grid>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
          <Box m={10} p={2} sx={{
            width: 600,
            height: 200,
            borderRadius: 3,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#C3C7D2',
            }}>
            <h1>For Buyers:</h1> 
            <Typography align = "center">UVA Marketplace offers a variety of categories to browse through, from UVA merch to electronics. 
            Sort through hundreds of student-listed items to find what you need!
            </Typography>
            </Box>
          <Box m={10} p={2} sx={{
            width: 600,
            height: 200,
            justifyContent: 'top',
            borderRadius: 5,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#C3C7D2',
            }}>
              <h1>For Sellers:</h1>
              <Typography align = "center">Do you have clothes hanging in the back of your closet that haven’t been worn in years? 
                    Or maybe you’re graduating and don’t know what to do with those math textbooks on your desk. With UVA Marketplace, 
                    connect instantly with thousands of students to buy and sell your items. Our site offers secure payments and safety 
                    measures to ensure that each transaction is fair and safe.</Typography>
          </Box>
        </div>
        <div>
        </div>
      </Grid>
      <Grid
        container
        spacing={5}
        padding = {5}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx = {{backgroundColor: "#EBB075", height: "200px"}}>
          <h1>User Testimonial:</h1>
          <Typography align = "center">"UVA Marketplace helped me reduce waste and make money off of things I was going to throw away after moving out!"   ~ Jason S, UVA '22</Typography>
      </Grid>
        </>
    )
};

export default Description;