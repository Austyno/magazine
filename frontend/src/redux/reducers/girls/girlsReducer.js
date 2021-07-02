import {
	ALL_GIRLS_ERROR,
	ALL_GIRLS_REQUEST,
	ALL_GIRLS_SUCCESS,
	GET_COVERGIRL_COMPETITION_FAIL,
	GET_COVERGIRL_COMPETITION_REQUEST,
	GET_COVERGIRL_COMPETITION_SUCCESS,
	SINGLE_GIRL_FAIL,
	SINGLE_GIRL_REQUEST,
	SINGLE_GIRL_SUCCESS,
	VOTE_GIRL_FAIL,
	VOTE_GIRL_REQUEST,
	VOTE_GIRL_RESET,
	VOTE_GIRL_SUCCESS,
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

export const singleGirlReducer = (state = { girl: {} }, action) => {
	switch (action.type) {
		case SINGLE_GIRL_REQUEST:
			return { loading: true }
		case SINGLE_GIRL_SUCCESS:
			return { loading: false, girl: action.payload }
		case SINGLE_GIRL_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const addVoteReducer = (state = { msg: '' }, action) => {
	switch (action.type) {
		case VOTE_GIRL_REQUEST:
			return { loading: true }
		case VOTE_GIRL_SUCCESS:
			return { loading: false, msg: action.payload }
		case VOTE_GIRL_FAIL:
			return { loading: false, error: action.payload }
		case VOTE_GIRL_RESET:
			return {}
		default:
			return state
	}
}

export const getCompetitionReducer = (state = { compt: {} }, action) => {
	switch (action.type) {
		case GET_COVERGIRL_COMPETITION_REQUEST:
			return { loading: true }
		case GET_COVERGIRL_COMPETITION_SUCCESS:
			return { loading: false, compt: action.payload }
		case GET_COVERGIRL_COMPETITION_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
