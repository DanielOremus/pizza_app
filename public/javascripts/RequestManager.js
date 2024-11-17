class RequestManager {
  static async deleteRequest(path, body, callback) {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    if (data.success) {
      callback()
    } else {
      console.log(data)
    }
    return data
  }
  // !Deprecated - do not use
  // static async onFormSubmit(e) {
  //   e.preventDefault()
  //   const formEl = e.target
  //   const id = formEl.getAttribute("data-mealId")
  //   const formData = new FormData(formEl)

  //   const validationResponse = await fetch(
  //     `${formEl.getAttribute("action")}/${id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: formData.get("title"),
  //         price: formData.get("price"),
  //         description: formData.get("description"),
  //         category: formData.get("category"),
  //       }),
  //     }
  //   )

  //   if (!validationResponse.ok) {
  //     const data = await validationResponse.text()
  //     console.log(data)

  //     DOMLoader.renderFromString(data)
  //   } else {
  //     await RequestManager.postRequest(`/menu/form/${id}`, formData)
  //   }
  //  }
  static async postRequest(url, body) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
      })

      if (response.status === 200) {
        window.location = response.url
      } else {
        const data = await response.text()
        DOMLoader.renderFromString(data)
        return { success: false, msg: "Post Failed" }
      }
    } catch (err) {
      console.log({ success: false, msg: err.message })
    }
  }
  static async onAddReview(e) {
    e.preventDefault()
    const formEl = e.target

    const formData = new FormData(formEl)

    const mealId = formEl.getAttribute("data-mealId")

    const url = formEl.getAttribute("action")
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: formData.get("user"),
          rate: formData.get("rate"),
          text: formData.get("text"),
          mealId,
        }),
      })

      const data = await response.json()
      if (data.success) {
        window.location.reload(true)
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log({ success: false, msg: error.message })
    }
  }
}
