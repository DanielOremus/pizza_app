class MongooseCRUDManager {
  constructor(model) {
    this.model = model
  }
  async getList(
    filters = {},
    projection = {},
    options = {},
    populateFields = []
  ) {
    try {
      const query = this.model.find(filters, projection)

      for (const field of populateFields) {
        if (typeof field === "string") {
          query.populate(field)
          continue
        }
        if (
          typeof field === "object" &&
          field.fieldForPopulation &&
          field.requiredFieldsFromTargetObj
        ) {
          query.populate(
            field.fieldForPopulation,
            field.requiredFieldsFromTargetObj
          )
        }
      }

      const count = await this.model.countDocuments(query)
      console.log(count)

      query.setOptions(options)

      const documents = await query.exec()
      return { documents, count }
    } catch (error) {
      throw new Error("Error getting data: " + error.message)
    }
  }
  async getById(id, projection = {}, populateFields = []) {
    try {
      const query = this.model.findById(id, projection)
      for (const field of populateFields) {
        if (typeof field === "string") {
          query.populate(field)
          continue
        }
        if (
          typeof field === "object" &&
          field.fieldForPopulation &&
          field.requiredFieldsFromTargetObj
        ) {
          query.populate(
            field.fieldForPopulation,
            field.requiredFieldsFromTargetObj
          )
        }
      }
      return await query.exec()
    } catch (error) {
      throw new Error("Error getting item by id: " + error.message)
    }
  }
  async getOne(filters, projection = {}, populateFields = []) {
    try {
      const query = this.model.findOne(filters, projection)
      for (const field of populateFields) {
        if (typeof field === "string") {
          query.populate(field)
          continue
        }
        if (
          typeof field === "object" &&
          field.fieldForPopulation &&
          field.requiredFieldsFromTargetObj
        ) {
          query.populate(
            field.fieldForPopulation,
            field.requiredFieldsFromTargetObj
          )
        }
      }
      return await query.exec()
    } catch (error) {
      throw new Error("Error getting item by filters: " + error.message)
    }
  }
  async create(itemObj) {
    try {
      const item = new this.model(itemObj)
      return await item.save()
    } catch (error) {
      throw new Error("Error creating item: " + error.message)
    }
  }
  async updateById(id, itemProps) {
    try {
      return await this.model.findByIdAndUpdate(id, itemProps, {
        new: true,
        runValidators: true,
      })
    } catch (error) {
      throw new Error("Error updating item by id: " + error.message)
    }
  }
  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id)
    } catch (error) {
      throw new Error("Error deleting item by id: " + error.message)
    }
  }
  async deleteMany(filers) {
    try {
      return await this.model.deleteMany(filers)
    } catch (error) {
      throw new Error("Error deleting item by filters: " + error.message)
    }
  }
}

export default MongooseCRUDManager
