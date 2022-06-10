var express = require('express');
var router = express.Router();
const db = require("./firebase")

const {getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc, query, where, Timestamp, increment, setDoc, deleteField } = require("firebase/firestore")

router.get("/getcarts", async(req, res, next) => {
  const carts=[]
  const allCarts = await getDocs(collection(db, "shoppingCartGuests"))
  allCarts.forEach((doc) => carts.push({ uuid: doc.uuid, ...doc.data()} ))
  res.json({result: carts})
})

router.put("/addcart", async (req, res, next) => {
  const newCart = {
      uuid: req.body.uuid,
  }
  setDoc(doc(db, "shoppingCartGuests", String(req.body.uuid)), newCart)
  .then((docRef) => {
      console.log("cart added")
    })
  .catch((e) => console.error(e))
})

router.put("/additem", async (req, res, next) => {
  console.log(req.body.uuid)
  console.log(req.body.name)
  console.log(req.body.price)
  console.log(req.body.productID)
  const newItem = doc(db, "shoppingCartGuests", req.body.uuid);

  var nameOfItem = req.body.name
  var price = req.body.price

  var updItem = {};
  updItem[nameOfItem] = parseFloat(price);

  await updateDoc(newItem, updItem);
})

router.put("/deleteitem", async (req, res, next) => {
  const newItem = doc(db, "shoppingCartGuests", req.body.uuid);

  var nameOfItem = req.body.name
  var price = req.body.price
  console.log("name "+nameOfItem)
  console.log("price " +price)
  var updItem = {}; 
  updItem[nameOfItem] = deleteField();
  console.log(updItem)
  await updateDoc(newItem, updItem);
})


router.put("/getitems", async(req, res, next) => {
  const carts=[]
  var yourCart = {cart: ""}

  const allCarts = await getDocs(collection(db, "shoppingCartGuests"))
  allCarts.forEach((doc) => carts.push({ uuid: doc.uuid, ...doc.data()} ))

  for (let i = 0; i < carts.length; i++) {
  
    if (carts[i].uuid === req.body.uuid){
      yourCart["cart"] = carts[i]
    }
  }


  res.json({result: yourCart})
})

module.exports = router;
