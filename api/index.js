const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");
// to encyrpt password
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const secret = 'asddfuhf3467n54hi834u2huh23';
const jwt = require ('jsonwebtoken');

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());

//connect to mongoose
mongoose.connect(
  "mongodb+srv://blog:gVYW8R9dz4rE2lpO@cluster0.ndmybri.mongodb.net/?retryWrites=true&w=majority"
 // "mongodb+srv://blog:gVYW8R9dz4rE2lpO@cluster0.ndmybri.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ 
        username, 
        password:bcrypt.hashSync(password,salt), 
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk= bcrypt.compareSync(password, userDoc.password);
    if(passOk){
    //logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err, token) =>{
        if(err) throw err;
        res.cookie('token', token).json('ok');
    });
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.listen(4000);
//gVYW8R9dz4rE2lpO
//mongodb+srv://blog:<password>@cluster0.ndmybri.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://blog:gVYW8R9dz4rE2lpO@cluster0.ndmybri.mongodb.net/?retryWrites=true&w=majority
