class MainController {
  static renderHomePage(req, res) {
    res.render("layouts/main", {
      title: "Home",
      body: "../main/home",
      user: req.user,
    })
  }
  static renderAboutPage(req, res) {
    res.render("layouts/main", {
      title: "About Us",
      body: "../main/about",
      user: req.user,
    })
  }
}

export default MainController
