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
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	DELETE_POST_FAIL,
	EDIT_POST_REQUEST,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAIL,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAIL,
	GET_ALL_POST_ADMIN_REQUEST,
	GET_ALL_POST_ADMIN_SUCCESS,
	GET_ALL_POST_ADMIN_FAIL,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAIL,
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
export const getAllCatPost = catId => async dispatch => {
	dispatch({
		type: CATEGORY_POSTS_REQUEST,
	})

	try {
		const res = await axios.get(`/api/posts/cat-posts/${catId}`)
		const data = res?.data?.data

		dispatch({
			type: CATEGORY_POSTS_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: CATEGORY_POSTS_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const deletePost = id => async (dispatch, getState) => {
	dispatch({ type: DELETE_POST_REQUEST })

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.delete(`/api/posts/${id}`, config)

		const data = res?.data?.data

		dispatch({
			type: DELETE_POST_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: DELETE_POST_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
export const editPost = id => async (dispatch, getState) => {
	dispatch({
		type: EDIT_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		const res = await axios.get(`/api/posts/edit/${id}`, config)
		const data = res?.data?.data

		dispatch({
			type: EDIT_POST_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: EDIT_POST_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
export const updatePost = (id, post) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.put(`/api/posts/edit/${id}`, post, config)
		const data = res?.data?.data

		dispatch({
			type: UPDATE_POST_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: UPDATE_POST_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const getPostForAdmin = () => async (dispatch, getState) => {
	dispatch({
		type: GET_ALL_POST_ADMIN_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		const res = await axios.get('/api/posts/admin', config)

		const data = res?.data?.data

		dispatch({
			type: GET_ALL_POST_ADMIN_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: GET_ALL_POST_ADMIN_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const createPost = postData => async (dispatch, getState) => {
	dispatch({
		type: CREATE_POST_REQUEST,
	})

	const userLogin = getState().userLogin
	const {
		userInfo: { token },
	} = userLogin

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	try {
		const res = await axios.post('/api/posts', postData, config)

		const data = res?.data?.data

		dispatch({
			type: CREATE_POST_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: CREATE_POST_FAIL,
			payload:e.response?.data?.message
				
		})
	}
}
