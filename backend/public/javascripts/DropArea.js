class DropArea {
  static hideImg(imgEl) {
    imgEl.style.display = "none"
  }

  static handleFileSelect(event, selectorsObj) {
    const file = event.target.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const { imageSelector, dropTextSelector } = selectorsObj
        const imgEl = document.querySelector(imageSelector)
        const dropTextEl = document.querySelector(dropTextSelector)

        imgEl.src = e.target.result
        dropTextEl.style.display = "none"
        imgEl.style.display = "block"
      }
      reader.readAsDataURL(file)
    }
  }
}
