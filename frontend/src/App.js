import { UserContext } from "./Contexts/userContext";
import { useState, useContext, useEffect } from 'react';
import Login from "./Components/Login/Login.js"
import Home from "./Components/Home/Home.js"
import uuid from "react-uuid"
import axios from "axios"



function App() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (document.cookie) {
      console.log(document.cookie)
    } else {
      const userUUID = `userUUID=${uuid()}`
      console.log(userUUID)
      const expiration = `expires=${new Date('01/01/2100').toUTCString()}`
      document.cookie = `${userUUID};${expiration};SameSite=Lax`;
      console.log(document.cookie)
    }

    const fetchData = async () => {
      await axios.get("http://localhost:9000/cartsguests/getcarts")
      .then((res) =>
      {
        var listOfCarts = res.data.result;
        var exists = false;

        console.log(listOfCarts)
        console.log(document.cookie)

        for (let i = 0; i < listOfCarts.length; i++) {
          if(listOfCarts[i].uuid === document.cookie){
            exists = true
          }
        }

        if (exists){
          console.log("cart exists")
        } else {
          console.log("cart does not exist")
          axios.put("http://localhost:9000/cartsguests/addcart", {
              uuid: document.cookie,
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
    }

    fetchData()
  }, [])



  return (
    <div className="App">
      {username==='' ? <Login
      /> : <Home
      />
      }
    </div>
  );
}

export default App;