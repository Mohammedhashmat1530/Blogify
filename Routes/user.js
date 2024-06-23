const express = require('express');
const User = require('../Models/user')
const router = express.Router()

router.get('/signin',(req,res)=>{
    const additionalInfo = req.cookies['Info'];
    res.render('signin.ejs',{
        additionalInfo
    })
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.clearCookie('Info')
    res.redirect('/')
})

router.post('/register',async (req,res)=>{
    const {fullName,email,password} = req.body;
    const additionalInfo = "Registration done,Login  !👍"

    await User.create({
        fullName,
        email,
        password
    })
   
    res.cookie("Info",additionalInfo,{maxAge:1000}).redirect('/user/signin')

})


router.post('/signin',async(req,res)=>{
    const {email,password}= req.body;
    const additionalInfo = "login Successful!👍"
    try{
        const token=await User.checkPasswordAndGenerateToken(email,password)
        res.cookie("Info",additionalInfo,{maxAge:1000})
        res.cookie("token",token).redirect('/')
    }catch(err){
        res.render('signin.ejs',{
            error:"password or username is incorrect"
        })
    }
    

 


   
})

module.exports= router