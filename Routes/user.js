const express = require('express');
const User = require('../Models/user')
const router = express.Router()

router.get('/signin',(req,res)=>{
    res.render('signin.ejs')
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
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


router.post('/signin',async(req,res)=>{
    const {email,password}= req.body;
    try{
        const token=await User.checkPasswordAndGenerateToken(email,password)
        res.cookie("token",token).redirect('/')
    }catch(err){
        res.render('signin.ejs',{
            error:"password or username is incorrect"
        })
    }
    

 


   
})

module.exports= router