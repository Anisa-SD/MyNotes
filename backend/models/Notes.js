const mongoose=require('mongoose');

const NoteSchema=({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        default:"General"
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("notes",NoteSchema);