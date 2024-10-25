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
}
