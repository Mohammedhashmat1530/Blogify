const express = require('express');
const User = require('../Models/user');
const multer = require("multer");
const { details } = require('../Controllers/userdetails');
const router = express.Router();
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/profileuploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/signin',(req,res)=>{
    const additionalInfo = req.cookies['Info'];
    res.render('signin.ejs',{
        additionalInfo
    })
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

router.get('/profile/update',async (req,res)=>{
    const userDetails = await details(req.user._id)
    console.log(userDetails)
    res.render('updateProfile.ejs',{
        user:req.user,
        userDetails
    })
})

router.post('/profile/update/complete',upload.single("proflephoto"),async (req,res)=>{
    const {name,bio,email,role} = req.body;
    const file = req.file && req.file.filename ? req.file.filename : "default"
    const id= req.user._id

    const userUpdate = await User.updateOne({ _id: id }, 
        { 
            fullName: name,
            email:email,
            role:role,
            bio:bio,
            updatedAt:Date.now(),
            profileImageURL:`/profileuploads/${file}` 
        })

  
    
    res.redirect('/profile')
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
        console.log(token)
        res.cookie("Info",additionalInfo,{maxAge:1000})
        res.cookie("token",token).redirect('/')
    }catch(err){
        res.render('signin.ejs',{
            error:"password or username is incorrect"
        })
    }
    

 


   
})

module.exports= router