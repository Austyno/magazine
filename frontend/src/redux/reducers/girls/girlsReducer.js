import {
	ALL_GIRLS_ERROR,
	ALL_GIRLS_REQUEST,
	ALL_GIRLS_SUCCESS,
} from '../../constants/girls/girlsConstants'

export const getAllGirlsReducer = (state = { girls: [] }, action) => {
	switch (action.type) {
		case ALL_GIRLS_REQUEST:
			return { loading: true }
		case ALL_GIRLS_SUCCESS:
			return { loading: false, girls: action.payload }
		case ALL_GIRLS_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
