const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
       const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log("DataaBAse Connected");
         console.log("Database:", conn.connection.name);
        console.log("Host:", conn.connection.host);

    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
}
module.exports=connectDB