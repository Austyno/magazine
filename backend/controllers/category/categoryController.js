const Error = require('../../utils/errorResponse')
const Category = require('../../models/CategoryModel')
const Post = require('../../models/PostModel')

exports.addCat = async (req, res, next) => {
	const { name } = req.body

	try {
		const cat = await Category.create(req.body)
		res.status(201).json({
			success: true,
			data: cat,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.getAllCat = async (req, res, next) => {
	try {
		const cats = await Category.find({}).populate('posts', 'title image')
		res.status(200).json({
			success: true,
			data: cats,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.singleCat = async(req,res,next) => {
	const { id } = req.params
	try {
		const cat = await Category.findById(id)
		res.status(200).json({
			success: true,
			data:cat
		})
	} catch (e) {
		return next(new Error(e.message,500))
	}
}
exports.updateCat = async (req, res, next) => {
	const { id } = req.params

	const cat = await Category.findById(id)

	if (!cat) {
		return next(new Error('category does not exist', 404))
	}

	try {
		const updateCat = await Category.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		res.status(200).json({
			success: true,
			data: updateCat,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.deleteCat = async (req, res, next) => {
	const { id } = req.params

	const cat = await Category.findById(id)
	if (!cat) {
		return next(new Error('category does not exist', 404))
	}

	try {
		await Category.findByIdAndDelete(id)
		res.status(200).json({
			success: true,
			data: '',
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

