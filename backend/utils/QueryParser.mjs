class QueryParser {
  static range(fieldName, filterValue) {
    let minValue, maxValue

    if (filterValue.includes("-")) {
      ;[minValue, maxValue] = filterValue.split("-").map((el) => parseFloat(el))
    } else {
      if (!Array.isArray(filterValue)) {
        filterValue = [filterValue]

        for (const value of filterValue) {
          if (value.startsWith("gte:")) {
            minValue = parseFloat(value.slice(4))
            continue
          }
          if (value.startsWith("lte:")) {
            maxValue = parseFloat(value.slice(4))
            console.log(maxValue)
          }
        }
      } else {
        filterValue.length === 2
      }
      ;[minValue, maxValue] = filterValue
    }
    console.log(filterValue)

    const filters = []

    if (!isNaN(minValue))
      filters.push({
        fieldName,
        filterType: "minValue",
        filterContent: minValue,
      })

    if (!isNaN(maxValue))
      filters.push({
        fieldName,
        filterType: "maxValue",
        filterContent: maxValue,
      })

    return filters
  }

  static list(fieldName, filterValue) {
    return [
      {
        fieldName,
        filterType: "in",
        filterContent: filterValue.split(","),
      },
    ]
  }

  static search(fieldName, filterValue) {
    return [
      {
        fieldName,
        filterType: "search",
        filterContent: filterValue,
      },
    ]
  }

  static filtersParser(fieldsConfiguration, query) {
    const filters = []

    fieldsConfiguration.forEach(({ fieldName, filterCategory }) => {
      if (query[fieldName])
        filters.push(...this[filterCategory](fieldName, query[fieldName]))
    })

    console.log(filters)

    return filters
  }
  static actionsParser(query) {
    const actions = []

    if (query.sort) {
      const [fieldName, order] = query.sort.split(":")
      actions.push({
        actionType: "sort",
        fieldName,
        order: order === "desc" ? -1 : 1,
      })
    }
    if (query.page >= 0 && query.perPage) {
      actions.push({ actionType: "skip", value: query.page * query.perPage })
      actions.push({ actionType: "limit", value: parseInt(query.perPage) })
    }

    console.log(actions)

    return actions
  }
  static parseQuery(query, fieldsConfiguration) {
    const filters = QueryParser.filtersParser(fieldsConfiguration, query)
    const actions = QueryParser.actionsParser(query)

    return { filters, actions }
  }
}

export default QueryParser
