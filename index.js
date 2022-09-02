const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

const app = express()
const port = 3000

require("dotenv").config()

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressLayouts)

app.use(cookieParser("MovieBlogSession"))
app.use(
	session({
		secret: "MovieBlogSecretSession",
		saveUninitialized: true,
		resave: true,
	}),
)
app.use(flash())
app.use(fileUpload())

app.set("layout", "./layouts/main")
app.set("view engine", "ejs")

const routes = require("./server/routes/inventoryRoute.js")
app.use("/", routes)

app.listen(port, () => console.log(`Listen Port : ${port}`))
