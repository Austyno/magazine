const Post = require('../../models/PostModel')
const Category = require('../../models/CategoryModel')
const Error = require('../../utils/errorResponse')
const cloudStorage = require('../../utils/uploadToCloudinary')

exports.addPost = async (req, res, next) => {
	const { title, content, category, author } = req.body
	if (!title || !content || !category) {
		return new Error('title,content,category are required', 404)
	}
	// const author = req.user._id

	const allowed = ['image/jpg', 'image/png', 'image/gif']

	if (req.files) {
		if (!allowed.includes(req.files.image.mimetype)) {
			return next(new Error('please upload an image', 404))
		}
		try {
			cloudStorage(req.files.image.tempFilePath)
				.then(async result => {
					await Post.create({
						image: result.secure_url,
						title,
						content,
						category,
						author,
					})
					res.status(200).json({
						success: true,
						data: {},
					})
					console.log(result)
				})
				.catch(e => console.log(e))
		} catch (e) {
			return new Error(e.message, 500)
		}
	}

	try {
		const newPost = await Post.create({
			image: '',
			title,
			content,
			category,
			author,
		})
		res.status(200).json({
			success: true,
			data: newPost,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.getAllPost = async (req, res, next) => {
	try {
		const post = await Post.find({ isPublished: true }).populate({
			path: 'category',
			model: 'Category',
		})
		// .populate({ path: 'author', model: 'User' })
		return res.status(200).json({
			success: true,
			data: post,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.singlePost = async (req, res, next) => {
	const { id } = req.params
	if (!id) {
		return next(new Error('post id required', 404))
	}

	try {
		const post = await Post.findById(id).populate('category', 'name')

		const postCat = await Category.findById(post.category)
		postCat.viewsCount = Number(postCat.viewsCount) + 1

		await postCat.save()

		post.views = Number(post.views) + 1

		await post.save()

		res.status(200).json({
			success: true,
			data: post,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.updatePost = async (req, res, next) => {
	const { id } = req.params

	const post = await Post.findById(id)

	if (!post) {
		return next(new Error('post does not exist', 404))
	}

	try {
		const updateToUpdate = await Post.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		res.status(200).json({
			success: true,
			data: updateToUpdate,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.deletePost = async (req, res, next) => {
	const { id } = req.params
	const post = await Post.findById(id)
	if (!post) {
		return next(new Error('post does not exist', 404))
	}

	try {
		const del = await Post.findOneAndDelete(id)
		res.status(200).json({
			success: true,
			data: '',
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.tabPost = async (req, res, next) => {
	const { catId } = req.params

	if (!catId) {
		return next(new Error('the category id is required', 400))
	}
	try {
		const posts = await Post.find({
			$and: [{ category: catId }, { isPublished: true }],
		}).populate('category','name')

		const sortedPost = posts.sort((a, b) => b.views - a.views)

		res.status(200).json({
			success: true,
			data: sortedPost.slice(0, 4),
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}

exports.topStories = async (req, res, next) => {
	try {
		const posts = await Post.find({ isPublished: true })

		res.status(200).json({
			success: true,
			data: posts.sort((a, b) => b.views - a.views).slice(0, 5),
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.todaysTake = async (req, res, next) => {
	try {
		const post = await Post.aggregate([
			{ $match: { isPublished: true } },
			{ $sample: { size: 1 } },
		])
		res.status(200).json({
			success: true,
			data: post,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
exports.allCatPosts = async (req, res, next) => {
	const { catId } = req.params

	try {
		const posts = await Post.find({
			$and: [{ category: catId }, { isPublished: true }],
		}).populate('category', 'name')
		res.status(200).json({
			success: true,
			data: posts,
		})
	} catch (e) {
		return next(new Error(e.message, 500))
	}
}
