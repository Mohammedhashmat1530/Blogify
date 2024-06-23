const express = require('express')
const userRoute = require('./Routes/user')
const blogRoute = require('./Routes/blog');

const path= require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenicationCookies,requireAuth } = require('./Middlewares/authenication');


const app = express();
const PORT = 8000;

mongoose.connect('mongodb+srv://admin:admin1@cluster0.6xkdff5.mongodb.net/').then((e)=> console.log("mongodb Connected"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenicationCookies('token'))
app.use(express.static(path.resolve('./public')))


app.set('view engine','ejs');
app.set('views',path.resolve('./views'))


app.get('/',(req,res)=>{
    const additionalInfo = req.cookies['Info'];
    res.render('home.ejs',{
        user:req.user,
        additionalInfo
    })
})

app.use('/user',userRoute)
app.use('/blog',requireAuth,blogRoute)

app.get('/about',(req,res)=>{
    res.render('about.ejs')
})
app.listen(PORT,()=>{
    console.log('the server is running on port 8000')
})