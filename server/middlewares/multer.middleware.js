import multer from "multer"
import { extname } from "path"
import { v4 as uuidv4 } from "uuid"

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_FOULDER)
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${extname(file.originalname)}`)
  },
})
// определение фильтра
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({
  storage: storageConfig,
  fileFilter,
}).single("file")
