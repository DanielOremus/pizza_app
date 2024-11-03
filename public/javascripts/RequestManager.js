class RequestManager {
  static async deleteRequest(path, body) {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    window.location.reload()

    return data
  }
  static async onFormSubmit(e) {
    e.preventDefault()
    const formEl = e.target
    const id = formEl.getAttribute("data-mealId")
    const formData = new FormData(formEl)

    const validationResponse = await fetch(
      `${formEl.getAttribute("action")}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          price: formData.get("price"),
        }),
      }
    )

    if (!validationResponse.ok) {
      const data = await validationResponse.text()
      console.log(data)

      DOMLoader.renderFromString(data)
    } else {
      await RequestManager.postRequest(`/menu/form/${id}`, formData)
    }
  }
  static async postRequest(url, body) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
      })

      if (response.status === 200) {
        window.location = response.url
      }
      const data = await response.text()
      DOMLoader.renderFromString(data)
      return { success: false, msg: "Post Failed" }
    } catch (err) {
      console.log({ success: false, msg: err.message })
    }
  }
}
