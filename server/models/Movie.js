const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "This field is required",
	},
	description: {
		type: String,
		required: "This field is required",
	},
	image: {
		type: String,
		required: "This field is required",
	},
	category: {
		type: String,
		required: "This field is required",
	},
})

MovieSchema.virtual("url").get(function () {
	return "/movie/" + this._id
})

module.exports = mongoose.model("Movie", MovieSchema)
