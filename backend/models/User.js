//this model consists of user schema for database. 
//note: The file name of any model starts with capital letter, eg: User.js 
const mongoose=require('mongoose');
//require() function includes modules within the project

//create a schema with name UserSchema
const UserSchema=({ 
    // field and its characteristics in Json format
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});
const User=mongoose.model("user",UserSchema);//creates a model User. 
// an instance of a model is called Document. model creates and reads documents from MongoDB
// User.createIndexes(); to create index of unique values field in db
module.exports=User
//module.exports tells node js which bits of code to “export” from a given file 
//so other files are allowed to access the exported code. 