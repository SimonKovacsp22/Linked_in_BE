

import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import postsRouter from "./apis/posts/index.js"
import usersRouter from "./apis/users/index.js"
import filesRouter from "./apis/files/index.js"
import {
  badRequestHandler,
  genericErrorHandler,
  notFoundHandler,
} from "./errorHandlers.js"

const port = process.env.PORT
const server = express()

const whitelist = ["http://localhost:3000"]







server.use(
  cors({
    origin: (origin, corsNext) => {
      console.log("ORIGIN:", origin);

      if (!origin || whitelist.indexOf(origin) !== -1) {
        corsNext(null, true);
      } else {
        corsNext(
          createHttpError(
            400,
            "Cors Error! Your origin " + origin + "is not in the list"
          )

        )
      }
    },
  })
)
//server.use(cors())
server.use(express.json())

server.use("/posts", postsRouter)
server.use("/users", usersRouter)
server.use("/files", filesRouter)

// ********************************* ERROR HANDLERS **************************************
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

mongoose.connect(process.env.MONGO_CON_URL)

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB!")

  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server is running on port:", port)
  })

})
