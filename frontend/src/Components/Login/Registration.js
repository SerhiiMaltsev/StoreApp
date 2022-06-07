import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useRef, useContext } from "react";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import axios from "axios"
import { UserContext} from '../../Contexts/userContext';

function Regstration() {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [userName, setUserName] = useState('')
  const [hasRegistered, setHasRegistered] = useState(false)

  const { user, setUser } = useContext(UserContext);

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
        uniqueID: "FIGURE OUT"
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
        <h1 style={{textAlign: "center"}}>Registration</h1> <br></br> <hr></hr> <br></br>
        <center>
        {!hasRegistered &&
            <div style={{alignContent: 'center'}}>
                <form onSubmit={addUser} style={{alignContent: 'center'}}>
                    <TextField varient='outlined'
                        id="outlined-basic"
                        variant="outlined"
                        label="Username"
                        inputRef={userNameRef}
                    /> <br></br><br></br>

                    <TextField varient='outlined'
                        id="outlined-basic"
                        variant="outlined"
                        label="Email"
                        inputRef={emailRef}
                    /> <br></br><br></br>

                    <TextField varient='outlined'
                        id="outlined-basic"
                        variant="outlined"
                        label="Password"
                        inputRef={passwordRef}
                        type="password"
                    /> <br></br><br></br>

                    <TextField varient='outlined'
                        id="outlined-basic"
                        variant="outlined"
                        label="Confirm Password"
                        inputRef={confirmPasswordRef}
                        type="password"
                    /> <br></br><br></br>

                    <Button type="submit" variant='outlined'
                        sx={{ color: '#000000', borderColor: '#000000', width: "195px" }}>Register
                    </Button>
                </form>
            </div>
        }
        {hasRegistered &&
            <center>
                <div>
                    <p>Congratulations {userName}, Welcome to UVA MarketPlace</p>
                    <Link to='Home' style={{textDecoration: 'none', justifyContent:'center' }}>
                        <Button
                            variant='outlined'
                            sx={{ color: '#000000', borderColor: '#000000', width: "195px" }}> Continue To the Home Page <br></br>
                        </Button>
                    </Link> <br></br><br></br>
                </div>
            </center>
        }
        </center>
    </div>
  )
}

export default Regstration;
