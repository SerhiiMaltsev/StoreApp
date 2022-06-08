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

router.put("/addProduct", async (req, res, next) => {
    const newProduct = {
        seller: req.body.user,
        productName: req.body.name,
        category: req.body.category,
        price: req.body.price,
        details: req.body.details,
    }
    addDoc(collection(db, "products"), newProduct)
    .then((docRef) => {
        console.log("added")
      })
    .catch((e) => console.error(e))
})

module.exports = router