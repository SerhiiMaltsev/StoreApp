import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useRef, useContext } from "react";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { UserContext} from '../../Contexts/userContext';
import Home from "../Home/Home.js"
import {Box} from '@mui/material'
import Description from './Description.js'
import { animateScroll as scroll } from "react-scroll";
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import Navbar from '../Navbar/Navbar.js'

function Login() {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:9000/users/getUsers")
      .then((res) => res.json())
      .then((text) => setAllUsers(text.result))
      .catch((err) => console.log(err))

  }, [])

  const loginUser = (e) => {
    e.preventDefault();
    let userFound=false;
    for(let i=0; i<allUsers.length; i++) {
      if(allUsers[i].name===userNameRef.current.value && allUsers[i].password===passwordRef.current.value) {
        userFound=true;
        console.log("found")
        break;
      }
    }

    if(!userFound) {
      alert("Incorrect Username or Password, Please try again")
      userNameRef.current.value = ""
      passwordRef.current.value = ""
    }
    else {
      alert("Logged In!")
      setUser(userNameRef.current.value)
      setloggedIn(true)
    }
  }

  const setGuest = () => {
    setUser("Guest User")
    setloggedIn(true)
  }

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  return (
    <>
      <div style={{ backgroundImage: "url(/cropped_edit_uva.png)", display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
        { user ? <Home /> :
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
        <Typography variant="h2" style={{textAlign: "center", fontWeight: 'bold'}}>UVA MARKETPLACE</Typography> 
        <Typography variant="h5" style={{textAlign: "center", fontWeight: 'bold'}}>Built for Students, By Students</Typography> <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
          <Box m={10} p={2} sx={{
            width: 300,
            height: 300,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            }}>
            <h3>Existing Users</h3> <br></br>
            <form onSubmit={loginUser} >
              <TextField variant='filled'
                id="filled-basic"
                label="Username"
                inputRef={userNameRef}
              /> <br></br><br></br>
              <TextField variant='filled'
                id="filled-basic"
                label="Password"
                inputRef={passwordRef}
              /> <br></br><br></br>
              <Button type="submit" variant='outlined' 
                  sx={{ backgroundColor: '#EBB075', color: '#111111', borderColor: '#000000', width: "155px"}}>Login
                </Button>
            </form>
            </Box>
          <Box m={10} p={2} sx={{
            width: 300,
            height: 300,
            justifyContent: 'top',
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            }}>
              <h3>New Users</h3> <br></br>
              <Button
                  onClick={setGuest}
                  variant='outlined'
                  sx={{ backgroundColor: '#EBB075', color: '#111111', borderColor: '#000000', width: "195px" }}> Continue as Guest <br></br>
              </Button> <br></br><br></br>

            <Link to='Registration' style={{textDecoration: 'none', justifyContent:'center'}}>
              <Button
                  variant='outlined'
                  sx={{ backgroundColor: '#EBB075', color: '#111111', borderColor: '#000000', width: "195px" }}> Register <br></br>
              </Button>
            </Link> 
          </Box>
        </div>
        <Button variant = "contained" onClick = {scrollToBottom} startIcon={<ArrowCircleDownTwoToneIcon />} 
            sx={{ backgroundColor: '#EBB075', color: '#111111', borderColor: '#000000', width: "155px"}}>
        Learn More</Button> <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <div>
        </div>
        <Description/>
      </Grid>
      }
      </div>
    </>
  )
}

export default Login;
