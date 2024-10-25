class MainController {
  static renderHomePage(req, res) {
    res.render("layouts/main", { title: "Home", body: "../main/home" })
  }
  static renderAboutPage(req, res) {
    res.render("layouts/main", { title: "About Us", body: "../main/about" })
  }
}

export default MainController
