const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: "This field is required",
	},
	description: {
		type: String,
		required: "This field is required",
	},
})

CategorySchema.virtual("url").get(function () {
	return "/category/" + this.name
})

module.exports = mongoose.model("Category", CategorySchema)
