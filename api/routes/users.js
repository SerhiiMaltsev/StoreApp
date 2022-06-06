var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/addUser", async (req, res, next) => {
  const newUser = {
      name: req.body.name,
      password: req.body.password,
      uuid: req.body.uniqueID

  }
  addDoc(collection(db, "users"), newUser)
  .then((docRef) => {
      console.log("user added")
    })
  .catch((e) => console.error(e))
})

module.exports = router;
