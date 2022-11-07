require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;

const app = express();

//Config jason and form data response 
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//Solve Cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}));

//upload directory
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

//DB connction
require('./config/db.js');

//routes
const router = require("./routes/router.js");
app.use(router);

app.listen(port,() =>{
    console.log(`App rodandona port ${port}`)
})