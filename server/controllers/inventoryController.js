require("../models/database")
const Category = require("../models/Category")
const Movie = require("../models/Movie")

//Empty req redirect to home
exports.redirectToHome = async (req, res) => {
	try {
		res.redirect("/home")
	} catch (e) {
		console.log("error get homepage", +e)
	}
}

//GET Home
exports.home = async (req, res) => {
	try {
		const mostRecentMovie = await Movie.find({}).limit(5)
		const generateRandomCategory = await Category.aggregate([{ $sample: { size: 2 } }])
		const firstCategoryGenerate = await Movie.find({
			category: generateRandomCategory[0].name,
		}).limit(4)
		const secondCategoryGenerate = await Movie.find({
			category: generateRandomCategory[1].name,
		}).limit(4)

		const home = true
		res.render("home", {
			title: "Home",
			mostRecentMovie,
			home,
			generateRandomCategory,
			firstCategoryGenerate,
			secondCategoryGenerate,
		})
	} catch (e) {
		console.log("error get homepage", +e)
	}
}

//GET List of category
exports.categoryList = async (req, res) => {
	try {
		const category = await Category.find({})
		res.render("categoryList", { title: "Category of Movie List", category })
	} catch (e) {
		console.log("error get Category of Movie List page", +e)
	}
}

//GET Movie per category
exports.movieListByCategory = async (req, res) => {
	try {
		const id = req.params.id
		const movie = await Movie.find({ category: id })
		res.render("movieByCategory", { title: "Movie List", movie })
	} catch (e) {
		console.log("error get Movie List page", +e)
	}
}

//GET Form Category
exports.categoryCreateGet = async (req, res, next) => {
	try {
		res.render("categoryCreate", { title: "Create Category" })
	} catch (e) {
		console.log("error get Create Movie page", +e)
	}
}

//POST Form Category
exports.categoryCreatePost = async (req, res, next) => {
	try {
		let category = new Category({
			name: req.body.category_name,
			description: req.body.description,
		})
		category.save()
		res.redirect("/category")
	} catch (e) {
		console.log("error get Create Category page", +e)
	}
}

//GET Movie details
exports.movieDetails = async (req, res) => {
	try {
		const id = req.params.id
		const movie = await Movie.find({ _id: id })
		res.render("movieDetails", { title: "Movie Description", movie })
	} catch (e) {
		console.log("error get Movie Description page", +e)
	}
}

//GET Movie Form
exports.movieCreateGet = async (req, res, next) => {
	try {
		const infoErrorObj = req.flash("infoError")
		const infoSubmitObj = req.flash("infoSubmit")
		const category = await Category.find({})
		res.render("movieCreate", { title: "Create Movie", category, infoErrorObj, infoSubmitObj })
	} catch (e) {
		console.log("error get Create Movie page", +e)
	}
}

// POST Movie Form
exports.movieCreatePost = async (req, res, next) => {
	try {
		let imageUploadFile
		let uploadPath
		let newImageName

		if (!req.files || Object.keys(req.files).length === 0) {
			console.log("No files where upload")
		} else {
			imageUploadFile = req.files.image
			newImageName = Date.now() + imageUploadFile.name

			uploadPath = require("path").resolve("./") + "/public/img/" + newImageName

			imageUploadFile.mv(uploadPath, function (err) {
				if (err) return res.satus(500).send(err)
			})
		}
		const newMovie = new Movie({
			name: req.body.name,
			description: req.body.description,
			image: newImageName,
			category: req.body.category,
		})

		await newMovie.save()
		req.flash("infoSubmit", "Movie has been added.")
		res.redirect("/add/movie")
	} catch (error) {
		req.flash("infoError", error)
	}
}

//Movie GET Update
exports.movieUpdateGET = async (req, res, next) => {
	const id = req.params.id

	const infoErrorObj = req.flash("infoError")
	const infoSubmitObj = req.flash("infoSubmit")
	const category = await Category.find({})
	Movie.findById(id, (err, movie) => {
		res.render("movieUpdate", {
			title: "Movie Update",
			movie,
			category,
			infoSubmitObj,
			infoErrorObj,
		})
	})
}

//Movie POST Update
exports.movieUpdatePOST = async (req, res, next) => {
	const id = req.params.id

	const movie = {
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
	}

	Movie.findByIdAndUpdate(id, movie, (err, data) => {
		if (err) {
			req.flash("infoError", error)
		} else {
			res.redirect(`/movie/${id}`)
		}
	})
}

//Movie DELETE
exports.movieDelete = async (req, res, next) => {
	const id = req.params.id

	Movie.findByIdAndDelete(id, (err) => {
		if (err) {
			req.flash("infoError", error)
		} else {
			res.redirect(`/home`)
		}
	})
}
