import path from "path"
import fs from "fs"

export function removeImageSync(itemObj, folderPath) {
  if (!itemObj.imgSrc) return
  const imagePath = path.join(folderPath, itemObj.imgSrc)
  if (!fs.existsSync(imagePath)) return
  fs.unlinkSync(imagePath)
}
