const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
        default:"https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{timestamps:true}
)


const Blog= mongoose.model("blog",blogSchema)

module.exports = Blog