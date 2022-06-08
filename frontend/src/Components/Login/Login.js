import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useRef, useContext } from "react";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { UserContext} from '../../Contexts/userContext';
import Home from "../Home/Home.js"

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

  return (
    <div>
      { user ? <Home /> :
      <div>
      <h1 style={{textAlign: "center"}}>Welcome To UVA Market Place</h1> <br></br> <hr></hr> <br></br>
      <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
        <form onSubmit={loginUser} >
          <TextField varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="User Name"
            inputRef={userNameRef}
          /> <br></br><br></br>

          <TextField varient='outlined'
            id="outlined-basic"
            variant="outlined"
            label="Password"
            inputRef={passwordRef}
          /> <br></br><br></br>
          <Button type="submit" variant='outlined'
              sx={{ color: '#000000', borderColor: '#000000', width: "195px" }}>Login
            </Button>
        </form>

        <div>
          
            <Button
                onClick={setGuest}
                variant='outlined'
                sx={{ color: '#000000', borderColor: '#000000', width: "195px" }}> Continue as Guest <br></br>
            </Button> <br></br><br></br>

          <Link to='Registration' style={{textDecoration: 'none', justifyContent:'center'}}>
            <Button
                variant='outlined'
                sx={{ color: '#000000', borderColor: '#000000', width: "195px" }}> Register <br></br>
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
