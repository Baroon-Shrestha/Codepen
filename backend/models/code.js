import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100,
        default: "untitled"
    },
    html: {
        type: String
    },
    css: {
        type: String
    },
    js: {
        type: String
    },
})

export const code = mongoose.model("code", codeSchema)