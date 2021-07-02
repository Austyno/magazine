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
	GET_ALL_POST_ADMIN_REQUEST,
	GET_ALL_POST_ADMIN_SUCCESS,
	GET_ALL_POST_ADMIN_FAIL,
	GET_ALL_POST_ADMIN_RESET,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	DELETE_POST_FAIL,
	EDIT_POST_REQUEST,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAIL,
	EDIT_POST_RESET,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_FAIL,
	UPDATE_POST_RESET,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAIL,
	CREATE_POST_RESET,
} from '../../constants/post/postConstants'

export const getAllPostReducer = (state = { posts: [] }, action) => {
	switch (action.type) {
		case ALL_POST_START:
			return { loading: true }
		case ALL_POST_SUCCESS:
			return { loading: false, posts: action.payload }
		case ALL_POST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const getTabPostReducer = (state = { tabPosts: [] }, action) => {
	switch (action.type) {
		case TAB_POST_REQUEST:
			return { loading: true }
		case TAB_POST_SUCCESS:
			return { loading: false, tabPosts: action.payload }
		case TAB_POST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const topStoriesReducer = (state = { topStories: [] }, action) => {
	switch (action.type) {
		case TOP_STORIES_REQUEST:
			return { loading: true }
		case TOP_STORIES_SUCCESS:
			return { loading: false, topStories: action.payload }
		case TOP_STORIES_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const todaysPickReducer = (state = { todaysPick: {} }, action) => {
	switch (action.type) {
		case TODAYS_TAKE_REQUEST:
			return { loading: true }
		case TODAYS_TAKE_SUCCESS:
			return { loading: false, todaysPick: action.payload }
		case TODAYS_TAKE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const singlePostReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case SINGLE_POST_REQUEST:
			return { loading: true }
		case SINGLE_POST_SUCCESS:
			return { loading: false, post: action.payload }
		case SINGLE_POST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const allcatPostReducer = (state = { posts: [] }, action) => {
	switch (action.type) {
		case CATEGORY_POSTS_REQUEST:
			return { loading: true }
		case CATEGORY_POSTS_SUCCESS:
			return { loading: false, posts: action.payload }
		case CATEGORY_POSTS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const allPostForAdminReducer = (state = { posts: {} }, action) => {
	switch (action.type) {
		case GET_ALL_POST_ADMIN_REQUEST:
			return { loading: true }
		case GET_ALL_POST_ADMIN_SUCCESS:
			return { loading: false, posts: action.payload }
		case GET_ALL_POST_ADMIN_FAIL:
			return { loading: false, error: action.payload }
		case GET_ALL_POST_ADMIN_RESET:
			return {}
		default:
			return state
	}
}

export const editPostReducer = (state = { post: {} }, action) => {
	switch (action.type) {
		case EDIT_POST_REQUEST:
			return { loading: true }
		case EDIT_POST_SUCCESS:
			return { loading: false, post: action.payload }
		case EDIT_POST_FAIL:
			return { loading: false, error: action.payload }
		case EDIT_POST_RESET:
			return {}
		default:
			return state
	}
}

export const deletePostReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_POST_REQUEST:
			return { loading: true }
		case DELETE_POST_SUCCESS:
			return { loading: false, success: true }
		case DELETE_POST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
export const updatePostReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_POST_REQUEST:
			return { loading: true }
		case UPDATE_POST_SUCCESS:
			return { loading: false, success: true }
		case UPDATE_POST_FAIL:
			return { loading: false }
		case UPDATE_POST_RESET:
			return {}
		default:
			return state
	}
}

export const createPostReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_POST_REQUEST:
			return { loading: true }
		case CREATE_POST_SUCCESS:
			return { loading: false, success: true }
		case CREATE_POST_FAIL:
			return { loading: false }
		case CREATE_POST_RESET:
			return {}
		default:
			return state
	}
}
