const express = require('express');
const path= require('path');

const app = express();
const PORT = 8000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))


app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.listen(PORT,()=>{
    console.log('the server is running on port 8000')
})