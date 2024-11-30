class FormDataHelper {
  static parseToFormData(data) {
    const formData = new FormData()
    for (const key in data) {
      if (data[key]) formData.append(key, data[key])
    }
    return formData
  }
}

export default FormDataHelper
