import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("MongoDB connection successful:: : ",connectionInstance.connection.host)

    }
    catch(err){
        console.log("MONGODB error",err)
        process.exit(1)
    }
}

export default connectDB