const router = require('express').Router()

const {
	createPost,
	getAllPost,
	singlePost,
	updatePost,
	tabPost,
	deletePost,
	topStories,
	todaysTake,
	allCatPosts,
	allPostForAdmin,
	editPost,
} = require('../../controllers/post/postController')

const { protect } = require('../../middleware/protect')

router.route('/').post(protect,createPost).get(getAllPost)
router.route('/admin').get(protect, allPostForAdmin)
router.route('/category/:catId').get(tabPost)
router.route('/cat-posts/:catId').get(allCatPosts)
router.route('/todays-take').get(todaysTake)
router.route('/top-stories').get(topStories)
router
	.route('/:id')
	.get(singlePost)
	.put(protect, updatePost)
	.delete(protect, deletePost)
router.route('/edit/:id').get(protect, editPost).put(protect,updatePost)

module.exports = router
