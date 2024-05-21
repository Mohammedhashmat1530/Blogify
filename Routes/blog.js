const express = require('express');
const multer = require("multer");
const path = require("path");
const router = express.Router();


const Blog = require('../Models/blogs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/add-user',(req,res)=>{
    res.render('addblogs.ejs',{
        user:req.user
    })
})

router.post('/',upload.single("fileupload"),async (req,res)=>{
    const {title,body} = req.body;
    const file = req.file && req.file.filename ? req.file.filename : "default"

    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${file}`
    })
  
    
    res.redirect('/blog/all-blogs')
})


router.get('/all-blogs',async(req,res)=>{
    const blogs = await Blog.find()
   
    res.render('blogs.ejs',{
        blogs,
        user:req.user
    });

})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    const data = await Blog.find({_id:id}).populate('createdBy')
    console.log("data is ",data)
    
    res.render('blog.ejs',{
        user:req.user,
        data:data
    })
})

module.exports= router