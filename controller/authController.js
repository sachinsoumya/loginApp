const express = require('express');
const bodyParser = require("body-parser");
const User = require('../model/userModel');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config")
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//Get all users
router.get("/users" , (req,res)=>{
    User.find({} , (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});


//register user
router.post('/register' , (req,res)=>{
//encrypt password
    let hashPassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
        phone:req.body.phone,
        role:req.body.role ? req.body.role:"User",
    } , (err,data)=>{
        if(err) return res.send('Error while registering user' + err.message);
        res.send('registration successful!');
    });
});

//login user
router.post('/login' , (req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.send({auth:false , token:"error while login"});
        if(!user) return res.send({auth:false , token:"invalid credentials"});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password , user.password);
            if(!passIsValid) return res.send({auth:false , token:"invalid credentials"});
            let token = jwt.sign({id:user._id} , config.screat , {expiresIn:86400});//24hrs in seconds
            res.send({auth:true,token:token});
        }
    });
});

//user info
router.get('/userInfo', (req,res)=>{
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false , token:'No token provided'});
    //jwt verify
    jwt.verify(token , config.screat ,(err,user)=>{
        if(err) res.send({auth:false ,token:"Token not found"});
        // console.log(user);
        else User.findById(user.id,(err,data)=>{
            if(err) throw err;
            res.send(data);
         });
    });
});

module.exports = router;


