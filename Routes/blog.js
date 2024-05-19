const express = require('express');

const router = express.Router();

router.get('/add-user',(req,res)=>{
    res.render('addblogs.ejs',{
        user:req.user
    })
})

router.post('/',(req,res)=>{
    console.log(req.body)
    res.redirect('/')
})

module.exports= router