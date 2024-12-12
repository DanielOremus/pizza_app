class ErrorParser {
  static parseErrors(resErrors) {
    const errors = []
    for (const err of resErrors) {
      errors.push(this.parse(err))
    }
    return errors
  }
  static parse(errObj) {
    return { field: errObj.path, message: errObj.msg }
  }
}

export default ErrorParser
