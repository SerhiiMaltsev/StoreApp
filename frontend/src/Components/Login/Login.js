import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useRef, useContext } from "react";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { UserContext} from '../../Contexts/userContext';
import Home from "../Home/Home.js"
import Helmet from "react-helmet"


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
        //console.log("found")
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

  return (
    <div>
      <Helmet><title>Log In</title></Helmet>
      { user ? <Home /> :
      <div style={{fontFamily: 'Georgia, serif'}}>
      <h1 style={{color: '#232D4B', fontFamily: 'Georgia, serif',
      textAlign: "center", backgroundColor: '#F84C1E'}}>Welcome To UVA Market Place</h1> <br></br> <hr></hr> <br></br>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={loginUser} style={{marginRight: "30px"}} >
          <TextField varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="User Name"
            inputRef={userNameRef}
          /> <br></br><br></br>

          <TextField style={{borderColor: "#F84C1E !important" }} varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="Password"
            inputRef={passwordRef}
          /> <br></br><br></br>
          <Button type="submit" variant='outlined'
              sx={{ color: '#232D4B', borderColor: '#232D4B', width: "195px", backgroundColor: '#F84C1E', fontFamily: 'Georgia, serif'}}>Login
            </Button>
        </form>

        <div>
          
            <Button
                onClick={setGuest}
                variant='outlined'
                sx={{ color: '#232D4B', borderColor: '#232D4B', 
                width: "195px", backgroundColor: '#F84C1E',
                height: "84px", fontFamily: 'Georgia, serif'}}> Continue as Guest <br></br>
            </Button> <br></br><br></br>

          <Link to='registration' style={{textDecoration: 'none', justifyContent:'center'}}>
            <Button
                variant='outlined'
                sx={{ color: '#232D4B', borderColor: '#232D4B', 
                width: "195px", backgroundColor: '#F84C1E',
                height: "84px", fontFamily: 'Georgia, serif'}}> Register New Account <br></br>
            </Button>
          </Link> 
        </div>
        </div>
        <center>
          <h3> Write Up About Site...</h3>
        </center>
        </div>
    }
    </div>
  )
}

export default Login;
