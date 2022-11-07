const mongoose = require("mongoose");

const dbUSer = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
//connection
const conn = async () =>{
    try{
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUSer}:${dbPassword}@cluster0.qxnvanw.mongodb.net/?retryWrites=true&w=majority`);
            
        console.log("connect to bd sucessful!");

        return dbConn;
    }catch(error){
        console.log(error);
    }
}

conn();

module.exports = conn;


