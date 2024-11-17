import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true)
    }
    cb(new Error("Attached file is not an image!"), false)
  },
})

export default upload
