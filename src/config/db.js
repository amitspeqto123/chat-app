const mongoose = require("mongoose");

const dbConnect = async () =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chat-demo');
        console.log("Database connection successful")
    }catch(error){
        console.log("Database connection failed")
    }
}

module.exports = dbConnect;