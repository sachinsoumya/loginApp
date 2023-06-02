const express = require("express");
const db = require('./db')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT =  process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());

const AuthController = require("./controller/authController");
app.use('/api/auth' , AuthController); 

app.listen(PORT , ()=>{
    console.log(`server listing on the port ${PORT}`);
});