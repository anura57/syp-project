const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 5000;
const {router} = require('./route/route')


mongoose.connect("mongodb://localhost:27017/userDB")
.then(()=>console.log("MongoDb  connected successfully"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('html'))
app.set("view engine","ejs")

app.use('/',router)
app.listen(port,(req, res)=>console.log(`Server started in port: ${port}`))
