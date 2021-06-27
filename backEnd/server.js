const express = require('express') // import express
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const port = 3000
const UserModel = require('./models/user');



//---------------Connection to DB
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://BrilliantMind:brilliantmind@cluster0.6i1mj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true } );
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:')); // Error for connection problems
db.once('open', function callback () {
    console.log('Connected To Mongo Database');
})

//---------------Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//---------------Routes
app.post('/register',async (req,res) => {
        const user = await UserModel.create(req.body);
        user ? res.status(201).send(user) : res.status(400).send('Bad Request');
});
app.get('/userGet/:name',  async (req,res) => {
        const user = await UserModel.findOne({name: req.params.name}).exec();
        user ? res.status(200).send(user) : res.status(404).send('User not found');
});

app.delete('/userDelete/:name', async (req, res) => {
    const user = await UserModel.findOneAndDelete({name: req.params.name}).exec();
    user ? res.status(200).send(user) : res.status(404).send('User not found');
});

app.put('/userChangePassWord', async (req, res) => {
    const user = await UserModel.findOneAndUpdate({name:req.body.name},{password: req.body.password}).exec();
    user ? res.status(200).send(user) : res.status(404).send('User not found');

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))