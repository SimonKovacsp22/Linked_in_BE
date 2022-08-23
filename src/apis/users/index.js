/** @format */

import express from "express"

import {
  deleteUser,
  getAllUsers,
  getSingleUsers,
  postUser,
  updateUser,
} from "../../lib/userUtilities.js"

const usersRouter = express.Router()

usersRouter.post("/", postUser)

usersRouter.get("/", getAllUsers)

usersRouter.get("/:userId", getSingleUsers)

usersRouter.put("/:userId", updateUser)

usersRouter.delete("/:userId", deleteUser)

export default usersRouter
