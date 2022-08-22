/** @format */

import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"
const { readJSON, writeJSON, writeFile, createReadStream, createWriteStream } =
  fs

// const dataFolderPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   process.env.MONGO_CON_URL
// )
const dataFolderPath = process.env.MONGO_CON_URL

const usersJSONPath = join(dataFolderPath, "users.json")

export const getUsers = () => readJSON(`${process.env.MONGO_CON_URL}users.json`)
