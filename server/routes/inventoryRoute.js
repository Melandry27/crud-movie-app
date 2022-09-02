const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

/*App Routes*/
router.get("/", inventoryController.redirectToHome)
router.get("/home", inventoryController.home)

/*Category Route*/
router.get("/category", inventoryController.categoryList)
router.get("/category/:id", inventoryController.movieListByCategory)
router.get("/create/category", inventoryController.categoryCreateGet)
router.post("/create/category", inventoryController.categoryCreatePost)

/*Movie Route*/
router.get("/movie/:id", inventoryController.movieDetails)
router.get("/add/movie", inventoryController.movieCreateGet)
router.post("/add/movie", inventoryController.movieCreatePost)
router.get("/movie/update/:id", inventoryController.movieUpdateGET)
router.post("/movie/update/:id", inventoryController.movieUpdatePOST)
router.get("/movie/delete/:id", inventoryController.movieDelete)

module.exports = router
