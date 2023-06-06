const mongoose = require('mongoose');

const connectDB = async(url)=>{
    try{
        const res = await mongoose.connect(url)
        console.log("Connect to db ", res.connection.host, res.connection.port)
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}


module.exports = connectDB;
