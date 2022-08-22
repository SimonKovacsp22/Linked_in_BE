/** @format */

import mongoose from "mongoose"

const { Schema, model } = mongoose

const postsSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
)

export default model("Post", postsSchema)
