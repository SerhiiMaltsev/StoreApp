var express = require('express');
var router = express.Router();
const db = require("./firebase")

const {getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc, query, where, Timestamp, increment} = require("firebase/firestore")

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
  addDoc(collection(db, "shoppingCartGuests"), newCart)
  .then((docRef) => {
      console.log("cart added")
    })
  .catch((e) => console.error(e))
})

router.put("/getitems", async(req, res, next) => {
  const carts=[]
  var yourCart = {cart: ""}

  console.log("This API CALL")

  const allCarts = await getDocs(collection(db, "shoppingCartGuests"))
  allCarts.forEach((doc) => carts.push({ uuid: doc.uuid, ...doc.data()} ))

  for (let i = 0; i < carts.length; i++) {
    console.log("123" + carts[i].uuid)
    console.log("234" + req.body.uuid)
    if (carts[i].uuid === req.body.uuid){
      yourCart["cart"] = carts[i]
    }
  }


  res.json({result: yourCart})
})

module.exports = router;
