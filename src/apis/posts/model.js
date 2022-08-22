import mongoose from "mongoose";

const { Schema,model } = mongoose

const postSchema = new Schema({
    text:{type:String,required:true}
},
{timestamps: true},

)

export default model("Post",postSchema)