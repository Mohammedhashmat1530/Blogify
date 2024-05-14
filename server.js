const express = require('express');
const userRoute = require('./Routes/user')
const path= require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb+srv://admin:admin1@cluster0.6xkdff5.mongodb.net/').then((e)=> console.log("mongodb Connected"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))


app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.use('/user',userRoute)
app.listen(PORT,()=>{
    console.log('the server is running on port 8000')
})