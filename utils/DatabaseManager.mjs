import key from "../keys/key.mjs"
import { readFile, writeFile } from "fs/promises"

class DatabaseManager {
  constructor(filePath) {
    this.filePath = filePath
  }
  async saveData(dataArray) {
    try {
      await writeFile(this.filePath, JSON.stringify(dataArray))
    } catch (err) {
      throw err
    }
  }
  async loadData() {
    try {
      const data = await readFile(this.filePath, "utf8")
      return JSON.parse(data)
    } catch (err) {
      if (err.code === "ENOENT") {
        await this.saveData([])
        return []
      }
      throw err
    }
  }
  async getItemById(id) {
    try {
      const data = await this.loadData()
      const item = data.find((el) => el.id === id)

      if (!item) {
        throw new Error(`Item by ${id} id not found!`)
      }

      return item
    } catch (err) {
      throw err
    }
  }
  async addItem(itemObj) {
    try {
      const data = await this.loadData()
      data.push(itemObj)
      await this.saveData(data)
    } catch (err) {
      throw err
    }
  }
  async updateItem(id, newProps) {
    try {
      const data = await this.loadData()
      const itemIndex = data.findIndex((el) => el.id === id)

      if (itemIndex === -1) throw new Error(`Item by ${id} id not found!`)

      data[itemIndex] = { ...data[itemIndex], ...newProps }

      await this.saveData(data)
    } catch (err) {
      throw err
    }
  }
  async deleteItem(id) {
    try {
      let data = await this.loadData()
      data = data.filter((el) => el.id !== id)
      this.saveData(data)
    } catch (err) {
      throw err
    }
  }
}

export default new DatabaseManager(key.dbUrl)
