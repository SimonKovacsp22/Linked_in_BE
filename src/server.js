import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import postsRouter from "./apis/posts/index.js";

const port = process.env.PORT;
const server = express();

const whitelist = ['http://localhost:3000']

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
        );
      }
    },
  })
);



server.use(express.json());

server.use("/api/posts", postsRouter)

mongoose.connect(process.env.MONGO_CON_URL)

mongoose.connection.on("connected",()=>{
  console.log("success")

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is running on port:", port);
})
})
