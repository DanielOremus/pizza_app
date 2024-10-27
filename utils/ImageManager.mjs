import path from "path"
import fs from "fs"

export function removeImageSync(itemObj, folderPath) {
  try {
    const imagePath = path.join(folderPath, itemObj.imgSrc)
    fs.unlinkSync(imagePath)
    return { success: true }
  } catch (error) {
    return { success: false, msg: error.message }
  }
}
export function uploadImage(path, file) {
  fs.writeFile(path, file, (err) => {
    if (err) return { success: false, msg: err.message }
    return { success: true }
  })
}
