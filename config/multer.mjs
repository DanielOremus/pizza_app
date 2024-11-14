import multer from "multer"
import { v4 as uuidv4 } from "uuid"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    const filename = `${uuidv4()}-${file.originalname}`
    cb(null, filename)
  },
})
const upload = multer({ storage })

export default upload
