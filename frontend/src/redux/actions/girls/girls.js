import axios from 'axios'
import {
	ALL_GIRLS_ERROR,
	ALL_GIRLS_REQUEST,
	ALL_GIRLS_SUCCESS,
} from '../../constants/girls/girlsConstants'

export const getAllGirls = () => async dispatch => {
	dispatch({
		type: ALL_GIRLS_REQUEST,
	})
	try {
		const res = await axios.get(`/api/models`)
		const girls = res?.data?.data
		console.log(girls)

		dispatch({
			type: ALL_GIRLS_SUCCESS,
			payload: girls,
		})
	} catch (e) {
		dispatch({
			type: ALL_GIRLS_ERROR,
			payload: e.response?.data?.message,
		})
	}
}
