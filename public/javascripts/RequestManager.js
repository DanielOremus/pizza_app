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
      document.body.innerHTML = data
    } else {
      const updateResponse = await fetch(`/menu/form/${id}`, {
        method: "POST",
        body: formData,
      })

      window.location = updateResponse.url
    }
  }
}
