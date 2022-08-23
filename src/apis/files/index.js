/** @format */

import express from "express"
import multer from "multer"

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

import { pipeline } from "stream"
import { getPDFReadableStream } from "../../lib/pdf-tools.js"
import UserModel from "../users/models.js"

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, // this searches in your process.env for something called CLOUDINARY_URL which contains your cloudinary api key and secret
    params: {
      folder: "linkedIn-images",
    },
  }),
  limits: { fileSize: 1024 * 1024 },
}).single("image")

const filesRouter = express.Router()

//http://localhost:3001/files/cloudinary
filesRouter.post("/cloudinary", cloudinaryUploader, async (req, res, next) => {
  try {
    console.log("REQ FILE: ", req.file)
    res.status(201).send({ url: req.file.path })
  } catch (error) {
    next(error)
  }
})

//http://localhost:3001/files/PDF
filesRouter.get("/PDF", async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.setHeader("Content-Disposition", "attachment; filename=users.pdf")

    const source = getPDFReadableStream(users[0])
    const destination = res
    pipeline(source, destination, (err) => {
      if (err) console.log(err)
    })
    //res.send(users)
  } catch (error) {
    next(error)
  }
})

export default filesRouter
