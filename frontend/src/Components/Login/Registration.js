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
    axios.put("/users/addUser", {
        name: userNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        uniqueID: "Holder"
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
    <div style={{
        backgroundColor: '#EBB075',
      }}>
        <Navbar/>
        <br></br> <br></br> <br></br> <br></br>
        <center>
        {!hasRegistered &&
            <div>
                <Box sx = {{
                    width: 400, 
                    height: 470, 
                    borderRadius: 3, 
                    padding: 6,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    backgroundColor: 'white',
                    marginBottom: ""}}>
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
                        <Link to='/login' style={{textDecoration: 'none', justifyContent:'center' }}>
                        <Button sx = {{color: "#EBB075"}}>Sign In</Button>
                        </Link>
                    </Grid>
                </div> <br></br><br></br>
                </Box>
                <Box sx = {{
                    width: 400, 
                    height: 470, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    backgroundColor: '#EBB075',}}>
                </Box>
            </div>
        }
        {hasRegistered &&
            <center>
                <div>
                    <Box sx = {{
                    width: 600, 
                    height: 270, 
                    display: 'flex', 
                    padding: 6,
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    backgroundColor: 'white',}}>
                    <h3>Thanks for signing up, {userName}! </h3>
                    <h1> Welcome to UVA MarketPlace!</h1>
                    <br></br> <br></br>
                    <Link to='/' style={{textDecoration: 'none', justifyContent:'center' }}>
                        <Button
                            variant='outlined'
                            sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#EBB075', fontFamily: 'Georgia, serif'}}> Continue To the Home Page <br></br>
                        </Button>
                    </Link> 
                    </Box>
                    <br></br><br></br>
                    <Box sx = {{
                    width: 400, 
                    height: 670, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    backgroundColor: '#EBB075',}}>
                    </Box>
                </div>
            </center>
        }
        </center>
    </div>
  )
}

export default Registration;