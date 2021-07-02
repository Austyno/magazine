import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	getAllCategoryReducer,
	getSingleCatReducer,
	adminCategoryReducer,
} from './reducers/category/categoryReducers'
import {
	getAllGirlsReducer,
	singleGirlReducer,
	addVoteReducer,
	getCompetitionReducer,
} from './reducers/girls/girlsReducer'
import {
	getAllPostReducer,
	getTabPostReducer,
	topStoriesReducer,
	todaysPickReducer,
	singlePostReducer,
	allcatPostReducer,
	allPostForAdminReducer,
	deletePostReducer,
	editPostReducer,
	updatePostReducer,
	createPostReducer,
} from './reducers/post/postReducer'
import { userLoginReducer } from './reducers/users/usersReducer'

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: ''

const initialState = {
	userLogin: userInfoFromStorage,
}

const reducers = combineReducers({
	categories: getAllCategoryReducer,
	singleCat: getSingleCatReducer,
	adminCategory: adminCategoryReducer,
	models: getAllGirlsReducer,
	singleModel: singleGirlReducer,
	vote: addVoteReducer,
	competition: getCompetitionReducer,
	createPost: createPostReducer,
	posts: getAllPostReducer,
	singlePost: singlePostReducer,
	tabPost: getTabPostReducer,
	topStories: topStoriesReducer,
	todaysPick: todaysPickReducer,
	allCatPosts: allcatPostReducer,
	postForAdmin: allPostForAdminReducer,
	editPost: editPostReducer,
	updatePost: updatePostReducer,
	deletePost: deletePostReducer,
	userLogin: userLoginReducer,
})

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)
export default store
