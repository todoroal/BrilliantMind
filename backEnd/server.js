const express = require('express') // import express
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const port = 3000


//---------------Connection to DB
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://BrilliantMind:brilliantmind@cluster0.6i1mj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true } );
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:')); // Error for connection problems
db.once('open', function callback () {
    console.log('Conntected To Mongo Database');
})

//---------------Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//---------------Schema-User
var Schema = mongoose.Schema 
var UserSchema = new Schema({ // MongoDB Schema for the pH Database
    name: String,
    password: String,
    email: String
}, {collection: 'User'})
var UserModel = mongoose.model('User', UserSchema)


//---------------Routes
app.post('/register',async (req,res) => {
    try {
        var userName = req.body.name;
        var password=req.body.password;
        var email = req.body.email;
        var myData = new UserModel(req.body)
        await myData.save()
        res.send("Data saved to Database")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
app.get('/userGet',  async (req,res) => {
    try {
        //await UserModel.findById('60d6111a10db723a9c1e946b')
        //await UserModel.find.all();
        await UserModel.find({name:req.body.name}, function(err, data){
        res.send(data)
        });
    } catch (err) {
        console.error(err.message)
    }
});

app.delete('/userDelete', async (req, res) => {
    await UserModel.findOneAndDelete({name:req.body.name}, (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('User deleted successfully...')
        }
    })
});

app.put('/userChangePassWord', async (req, res) => {
    await UserModel.findOneAndUpdate({name:req.body.name},{password: req.body.password}, (error, data)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log('Password changed...')
        }
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))