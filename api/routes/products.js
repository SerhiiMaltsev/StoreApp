const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc, query, where, Timestamp, increment} = require("firebase/firestore")


router.get("/allProducts", async (req, res, next) => {
    const allProducts=[]
    const docs = await getDocs(collection(db, "products"))
    docs.forEach((doc) => allProducts.push({ id: doc.id, ...doc.data()} ))
    res.json({result: allProducts})
})


router.post("/addProduct", async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        seller: req.body.seller
    }
    addDoc(collection(db, "products"), newProduct)
    .then((docRef) => {
        console.log("added")
      })
    .catch((e) => console.error(e))
})



module.exports = router