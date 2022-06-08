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
  res.json({result: users})
})

router.get("/userProducts", async (req, res, next) => {
  const userProducts=[]
  const seller = req.query.seller
  console.log("Seller: " + seller)
  const q = query(collection(db, "products"), where("seller", "==", seller));
  const docs = await getDocs(q)
  docs.forEach((doc) => userProducts.push({ id: doc.id, ...doc.data()} ))
  res.json({result: userProducts})
  console.log(res.json({result: userProducts}))
})

module.exports = router;
