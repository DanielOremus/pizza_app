class DOMLoader {
  static renderFromString(str) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, "text/html")
    document.body.innerText = ""
    document.body.append(...doc.body.children)
  }
}
