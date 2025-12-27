import mongoose from "mongoose";

const connectDb = async () => {
    try {
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("Database connected")
    } catch (error) {
        console.log(error)
        console.log("Database connection failed")
    }
}

export default connectDb;