/*MongoDB is a schema-less NoSQL document database. 
It means you can store JSON documents in it, and 
the structure of these documents can vary as it is not enforced like SQL databases. 
*/
/*Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
It manages relationships between data, provides schema validation, and 
is used to translate between objects in code and the representation of those objects in MongoDB.*/

const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/mynotes";

const connectToMongo=()=>{
    mongoose.connect(mongoURI)//.then(()=>console.log("Connected")).catch((e)=>console.log(e.message));
}

module.exports=connectToMongo;

var db = mongoose.connection;

db.on("error", () => console.error("error connecting to database"));

//db.once("open", () => console.log("Connected to database"));