const router = require('express').Router();
const bodyPArser = require('body-parser');
//imoprt User model we created
const User = require('../models/user');

router.post('/',   (req, res) => {  //async because we need some time to submit to db
   // res.send('asdasd');
     const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password 
        //date: req.body.date          REST API!!!
    }); //=> we need the body parser to convert into json
    //we gonna try to submit a user
    user.save()
        .then(item => {
            res.send("Data saved to Database")
        })
        .catch(err => {
            res.status(400).send("Unable to save to Database")
        })
    //const savedUser = await user.save();
    //res.send(savedUser);
});

router.get('/', (req, res) => {
  res.send('sdaf');
})

module.exports = router;