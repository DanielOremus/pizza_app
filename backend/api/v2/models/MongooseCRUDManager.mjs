import FiltersHelper from "../../../utils/FiltersHelper.mjs"

class MongooseCRUDManager {
  constructor(model) {
    this.model = model
  }
  addPopulation(query, populateFields) {
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
  }
  async findManyWithQuery(
    reqQuery,
    fieldsConfiguration,
    projection = null,
    populateFields = []
  ) {
    try {
      let query = this.model.find({}, projection)

      query = FiltersHelper.applyFiltersFromQuery(
        reqQuery,
        fieldsConfiguration,
        query
      )

      const count = await this.model.countDocuments(query)

      query = FiltersHelper.applyActionsFromQuery(
        reqQuery,
        fieldsConfiguration,
        query
      )

      this.addPopulation(query, populateFields)

      const documents = await query.exec()

      return { documents, count }
    } catch (error) {
      throw new Error("Error getting data with filters: " + error.message)
    }
  }
  async getList(
    filters = {},
    projection = {},
    options = {},
    populateFields = []
  ) {
    try {
      const query = this.model.find(filters, projection)

      this.addPopulation(query, populateFields)

      const count = await this.model.countDocuments(query)

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

      this.addPopulation(query, populateFields)

      return await query.exec()
    } catch (error) {
      throw new Error("Error getting item by id: " + error.message)
    }
  }
  async getOne(filters, projection = {}, populateFields = []) {
    try {
      const query = this.model.findOne(filters, projection)

      this.addPopulation(query, populateFields)

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
      throw new Error("Error deleting items by filters: " + error.message)
    }
  }
  async deleteOne(filers) {
    try {
      return await this.model.deleteOne(filers)
    } catch (error) {
      throw new Error("Error deleting item by filters: " + error.message)
    }
  }
}

export default MongooseCRUDManager
