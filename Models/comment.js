const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{timestamps:true}
)


const Comment= mongoose.model("comment",CommentSchema)

module.exports = Comment