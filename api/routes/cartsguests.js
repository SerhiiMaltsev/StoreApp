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

module.exports = router;
