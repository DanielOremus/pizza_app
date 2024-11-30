import path from "path"
import fs from "fs"
import sharp from "sharp"

export async function optimizeImage(buffer, width) {
  const image = await sharp(buffer)
    .resize(width)
    .png({ quality: 90, force: false })
    .toBuffer()
  return image
}
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
