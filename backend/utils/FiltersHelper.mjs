import QueryParser from "./QueryParser.mjs"

class FiltersHelper {
  static applyAllParamsFromQuery(reqQuery, fieldsConfiguration, query) {
    const { filters, actions } = QueryParser.parseQuery(
      reqQuery,
      fieldsConfiguration
    )

    if (filters.length > 0) query = FiltersHelper.applyFilters(filters, query)
    if (actions.length > 0) query = FiltersHelper.applyActions(actions, query)

    return query
  }

  static applyFiltersFromQuery(reqQuery, fieldsConfiguration, query) {
    const { filters } = QueryParser.parseQuery(reqQuery, fieldsConfiguration)
    if (filters.length > 0) query = FiltersHelper.applyFilters(filters, query)
    return query
  }

  static applyActionsFromQuery(reqQuery, fieldsConfiguration, query) {
    const { actions } = QueryParser.parseQuery(reqQuery, fieldsConfiguration)
    if (actions.length > 0) query = FiltersHelper.applyActions(actions, query)
    return query
  }

  static applyFilters(filters, query) {
    filters.forEach((filter) => {
      switch (filter.filterType) {
        case "search":
          query
            .where(filter.fieldName)
            .regex(new RegExp(filter.filterContent, "i"))
          break
        case "minValue":
          query.where(filter.fieldName).gte(filter.filterContent)
          break
        case "maxValue":
          query.where(filter.fieldName).lte(filter.filterContent)
          break
        case "in":
          query.where(filter.fieldName).in(filter.filterContent)
          break
        case "nin":
          query.where(filter.fieldName).nin(filter.filterContent)
          break
        default:
          console.warn("Unsupported filterType: " + filter.filterType)
          break
      }
    })

    return query
  }
  static applyActions(actions, query) {
    actions.forEach((action) => {
      switch (action.actionType) {
        case "sort":
          query.sort({ [action.fieldName]: action.order })
          break
        case "skip":
          query.skip(action.value)
          break
        case "limit":
          query.limit(action.value)
          break
        default:
          console.warn("Unsupported actionType: " + action.actionType)
          break
      }
    })

    return query
  }
}

export default FiltersHelper
