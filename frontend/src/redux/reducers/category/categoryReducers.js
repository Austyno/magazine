import {
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
	SINGLE_CATEGORY_REQUEST,
	SINGLE_CATEGORY_SUCCESS,
	SINGLE_CATEGORY_FAIL,
} from '../../constants/category/categoryConstants'

export const getAllCategoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case ALL_CATEGORY_REQUEST:
			return { loading: true }
		case ALL_CATEGORY_SUCCESS:
			return { loading: false, categories: action.payload }
		case ALL_CATEGORY_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
export const getSingleCatReducer = (state = { cat: {} }, action) => {
	switch (action.type) {
		case SINGLE_CATEGORY_REQUEST:
			return { loading: true }
		case SINGLE_CATEGORY_SUCCESS:
			return { loading: false, cat: action.payload }
		case SINGLE_CATEGORY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
