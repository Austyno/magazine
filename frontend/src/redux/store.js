import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	getAllCategoryReducer,
	getSingleCatReducer,
} from './reducers/category/categoryReducers'
import { getAllGirlsReducer } from './reducers/girls/girlsReducer'
import {
	getAllPostReducer,
	getTabPostReducer,
	topStoriesReducer,
	todaysPickReducer,
	singlePostReducer,
	allcatPostReducer,
} from './reducers/post/postReducer'

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: ''
const initialState = {
	userLogin: userInfoFromStorage,
}

const reducers = combineReducers({
	categories: getAllCategoryReducer,
	singleCat: getSingleCatReducer,
	models: getAllGirlsReducer,
	posts: getAllPostReducer,
	singlePost: singlePostReducer,
	tabPost: getTabPostReducer,
	topStories: topStoriesReducer,
	todaysPick: todaysPickReducer,
	allCatPosts: allcatPostReducer,
})

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)
export default store
