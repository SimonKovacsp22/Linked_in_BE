/** @format */

import express from "express"
import multer from "multer"

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
// import { pipeline } from "stream"
// import { getPDFReadableStream } from "../../lib/pdf-tools.js"
// import UserModel from "../apis/users/models.js"
//import { getAllUsers } from "../../lib/userUtilities.js"
// import { getUsers } from "../../lib/fs.tools.js"

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

    // 1. upload on Cloudinary happens automatically
    // 2. req.file contains the path which is the url where to find that picture
    // 3. update the resource by adding the path to it
    //res.send("UPLOADED")
    res.status(201).send({ url: req.file.path })
  } catch (error) {
    next(error)
  }
})
// filesRouter.get("/PDF", async (req, res, next) => {
//   try {
//     // SOURCE ( PDF Readable Stream) --> DESTINATION (http response)
//     const data = await getAllUsers()

//     res.setHeader("Content-Disposition", "attachment; filename=products.pdf")
//     // const source = getPDFReadableStream(products)
//     //const source = getPDFReadableStream(data[0].products[0])
//     //const source = getPDFReadableStream(data)
//     const destination = res
//     pipeline(source, destination, (err) => {
//       if (err) console.log(err)
//     })
//   } catch (error) {
//     next(error)
//   }
// })

export default filesRouter
