var express = require('express');
var router = express.Router();
const db = require("./firebase")

const {getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc, query, where, Timestamp, increment} = require("firebase/firestore")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put("/addUser", async (req, res, next) => {
  const newUser = {
      name: req.body.name,
      password: req.body.password,
      uuid: req.body.uniqueID,
      email: req.body.email

  }
  addDoc(collection(db, "users"), newUser)
  .then((docRef) => {
      console.log("user added")
    })
  .catch((e) => console.error(e))
})


router.get("/getUsers", async(req, res, next) => {
  const users=[]
  const allUsers = await getDocs(collection(db, "users"))
  allUsers.forEach((doc) => users.push({ id: doc.id, ...doc.data()} ))

  console.log(users)
  res.json({result: users})
})


router.put("/addToCart", async (req, res, next) => {
  const user=req.body.user;
  const productID=req.body.productID;

  const allUsers=[]
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => allUsers.push({ id: doc.id, ...doc.data()} ))

  var userID=""
  for(let i=0; i<allUsers.length; i++) {
    if(allUsers[i].name===user) {
      userID=allUsers[i].id
    }
  }

  const postRef = doc(db, "users", userID);
  const docSnap = await getDoc(postRef);
  const arr = docSnap.data().cart;
  arr.push(productID);

  await updateDoc(postRef, {
      cart: arr
  });
  res.send("Updated")
})

module.exports = router;
