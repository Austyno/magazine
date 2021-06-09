import axios from 'axios'
import {
	ALL_POST_FAIL,
	ALL_POST_START,
	ALL_POST_SUCCESS,
	TAB_POST_REQUEST,
	TAB_POST_SUCCESS,
	TAB_POST_FAIL,
	TOP_STORIES_REQUEST,
	TOP_STORIES_SUCCESS,
	TOP_STORIES_FAIL,
	TODAYS_TAKE_REQUEST,
	TODAYS_TAKE_SUCCESS,
	TODAYS_TAKE_FAIL,
	SINGLE_POST_REQUEST,
	SINGLE_POST_SUCCESS,
	SINGLE_POST_FAIL,
	CATEGORY_POSTS_REQUEST,
	CATEGORY_POSTS_SUCCESS,
	CATEGORY_POSTS_FAIL,
} from '../../constants/post/postConstants'

export const getAllPost = () => async dispatch => {
	dispatch({
		type: ALL_POST_START,
	})

	try {
		const res = await axios.get(`/api/posts`)
		const posts = res?.data?.data

		dispatch({
			type: ALL_POST_SUCCESS,
			payload: posts,
		})
	} catch (e) {
		dispatch({
			type: ALL_POST_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
export const getTabPost = catId => async dispatch => {
	dispatch({
		type: TAB_POST_REQUEST,
	})
	try {
		const res = await axios.get(`/api/posts/category/${catId}`)
		const data = res?.data?.data

		dispatch({
			type: TAB_POST_SUCCESS,
			payload: data,
		})
		console.log(data)
	} catch (e) {
		dispatch({
			type: TAB_POST_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const getTopStories = () => async dispatch => {
	dispatch({
		type: TOP_STORIES_REQUEST,
	})

	try {
		const res = await axios.get('/api/posts/top-stories')
		const data = res?.data?.data
		dispatch({
			type: TOP_STORIES_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: TOP_STORIES_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const getTodaysPick = () => async dispatch => {
	dispatch({
		type: TODAYS_TAKE_REQUEST,
	})

	try {
		const res = await axios.get('/api/posts/todays-take')
		const data = res?.data?.data

		dispatch({
			type: TODAYS_TAKE_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: TODAYS_TAKE_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const getSinglePost = id => async dispatch => {
	dispatch({
		type: SINGLE_POST_REQUEST,
	})
	try {
		const res = await axios.get(`/api/posts/${id}`)
		const data = res?.data?.data

		dispatch({
			type: SINGLE_POST_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: SINGLE_POST_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
export const getAllCatPost = (catId) => async (dispatch) => {
	dispatch({
		type: CATEGORY_POSTS_REQUEST,
	})

	try {
		const res = await axios.get(`/api/posts/cat-posts/${ catId }`)
		const data = res?.data?.data

		dispatch({
			type: CATEGORY_POSTS_SUCCESS,
			payload: data
		})
	} catch (e) {
		dispatch({
			type: CATEGORY_POSTS_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
