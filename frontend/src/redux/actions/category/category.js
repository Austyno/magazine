import axios from 'axios'
import {
	ALL_CATEGORY_REQUEST,
	ALL_CATEGORY_SUCCESS,
	ALL_CATEGORY_FAIL,
	SINGLE_CATEGORY_REQUEST,
	SINGLE_CATEGORY_SUCCESS,
	SINGLE_CATEGORY_FAIL,
} from '../../constants/category/categoryConstants'

export const allCat = () => async dispatch => {
	dispatch({
		type: ALL_CATEGORY_REQUEST,
	})

	try {
		const res = await axios.get(`/api/category`)
		const data = res?.data?.data
		dispatch({
			type: ALL_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: ALL_CATEGORY_FAIL,
			payload: e.response?.data?.message,
		})
	}
}

export const getCategory = id => async dispatch => {
	dispatch({
		type: SINGLE_CATEGORY_REQUEST,
	})
	try {
		const res = await axios.get(`/api/category/${id}`)
		const data = res?.data?.data
		dispatch({
			type: SINGLE_CATEGORY_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: SINGLE_CATEGORY_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
