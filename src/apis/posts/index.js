/** @format */

import express from "express"
import { postPost } from "../../lib/postUtilities.js"

const postsRouter = express.Router()

postsRouter.post("/", postPost)

export default postsRouter
