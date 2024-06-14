import mongoose from "mongoose";

export const connectDB = () => {
    const uri = process.env.MONGO_DB_URI

    mongoose.connect(uri).then(() => {
        console.log("db connection successfull")
    }).catch((err) => {
        console.log(err)
    })

}