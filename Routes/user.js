const express = require('express');
const User = require('../Models/user')
const router = express.Router();

router.get('/signin',(req,res)=>{
    res.render('signin.ejs')
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

router.post('/register',async (req,res)=>{
    const {fullName,email,password} = req.body;

    await User.create({
        fullName,
        email,
        password
    })
   
    res.redirect('/')

})

module.exports= router