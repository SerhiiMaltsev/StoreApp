import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useRef, useContext } from "react";
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'
import { Link } from "react-router-dom";
import axios from "axios"
import { UserContext} from '../../Contexts/userContext';
import Navbar from '../Navbar/Navbar.js'
import { UuidContext } from '../../Contexts/uuidContext';
import { Helmet } from 'react-helmet';

function Registration() {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [userName, setUserName] = useState('')
  const [hasRegistered, setHasRegistered] = useState(false)

  const { user, setUser } = useContext(UserContext);
  const { uuid, setUuid } = useContext(UuidContext);

  if (document.cookie) {
    console.log(document.cookie)
  } else {
    const userUUID = `userUUID=${uuid()}`
    console.log(userUUID)
    const expiration = `expires=${new Date('01/01/2100').toUTCString()}`
    document.cookie = `${userUUID};${expiration};SameSite=Lax`;
    console.log(document.cookie)
  }
  const addUser = (e) => {
    e.preventDefault();
    if(passwordRef.current.value!==confirmPasswordRef.current.value) {
        alert("Password Do Not Match")
        passwordRef.current.value = ""
        confirmPasswordRef.current.value = ""
        return;
    }
    axios.put("http://localhost:9000/users/addUser", {
        name: userNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        uniqueID: uuid
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    setUserName(userNameRef.current.value)
    setHasRegistered(true)
    setUser(userNameRef.current.value)

    userNameRef.current.value = ""
    emailRef.current.value = ""
    passwordRef.current.value = ""
    confirmPasswordRef.current.value = ""
  }

  return (
    <div>
    <Helmet><title>Register</title></Helmet>
    {user==="Guest User" | user===null ?
    <ButtonAppBar sx={{marginBottom: "20px"}}/> : 
    <h1 style={{color: '#232D4B', fontFamily: 'Georgia, serif',
      textAlign: "center", backgroundColor: '#F84C1E'}}>UVA MarketPlace</h1>
    } <br></br><br></br>
    <h1 style={{color: '#232D4B', fontFamily: 'Georgia, serif',
      textAlign: "center", backgroundColor: '#F84C1E', padding: "10px"}}>Registration</h1> <br></br> <hr></hr> <br></br>
    <div style={{
        backgroundColor: '#EBB075',
      }}>
        <Navbar/>
        <br></br>
        <center>
        {!hasRegistered &&
                <Box sx = {{
                    width: 400, 
                    height: 470, 
                    borderRadius: 3, 
                    padding: 6,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    backgroundColor: 'white',}}>
                <h1 style={{textAlign: "center"}}>New User Registration</h1> 
                <div style={{alignContent: 'center'}}>
                    <form onSubmit={addUser} style={{alignContent: 'center'}}>
                        <TextField 
                            id="filled-basic"
                            variant="filled"
                            label="Username"
                            inputRef={userNameRef}
                        /> <br></br><br></br>

                        <TextField 
                            id="filled-basic"
                            variant="filled"
                            label="Email"
                            inputRef={emailRef}
                        /> <br></br><br></br>

                        <TextField 
                            id="filled-basic"
                            variant="filled"
                            label="Password"
                            inputRef={passwordRef}
                            type="password"
                        /> <br></br><br></br>

                        <TextField 
                            id="filled-basic"
                            variant="filled"
                            label="Confirm Password"
                            inputRef={confirmPasswordRef}
                            type="password"
                        /> <br></br><br></br>

                        <Button type="submit" variant='filled'
                            sx={{ backgroundColor: '#EBB075', color: '#000000', borderColor: '#000000', width: "195px" }}>Register
                        </Button>
                    </form>
                    <br></br>
                    <Grid 
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center">
                        <Typography>Already have an account?</Typography>
                        <Link to='Home' style={{textDecoration: 'none', justifyContent:'center' }}>
                        <Button sx = {{color: "#EBB075"}}>Sign In</Button>
                        </Link>
                    </Grid>
                </div>
                </Box>
        }
        {hasRegistered &&
            <center>
                <div>
                    <p>Congratulations {userName}, Welcome to UVA MarketPlace!</p>
                    <Link to='Home' style={{textDecoration: 'none', justifyContent:'center' }}>
                        <Button
                            variant='outlined'
                            sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}> Continue To the Home Page <br></br>
                        </Button>
                    </Link> <br></br><br></br>
                </div>
            </center>
        }
        </center>
    </div>
  )
}

export default Registration;
