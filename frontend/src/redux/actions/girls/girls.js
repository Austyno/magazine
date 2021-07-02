import axios from 'axios'
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
	VOTE_GIRL_SUCCESS,
} from '../../constants/girls/girlsConstants'

export const getAllGirls = () => async dispatch => {
	dispatch({
		type: ALL_GIRLS_REQUEST,
	})
	try {
		const res = await axios.get(`/api/models`)
		const girls = res?.data?.data

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
export const getSingleGirl = id => async dispatch => {
	dispatch({
		type: SINGLE_GIRL_REQUEST,
	})

	try {
		const res = await axios.get(`/api/models/${id}`)
		const data = res?.data?.data

		dispatch({
			type: SINGLE_GIRL_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: SINGLE_GIRL_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
export const addVote = voteData => async dispatch => {
	dispatch({
		type: VOTE_GIRL_REQUEST,
	})
	try {
		const res = await axios.post(`/api/models/vote`, voteData)
		const data = res?.data?.data

		dispatch({
			type: VOTE_GIRL_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: VOTE_GIRL_FAIL,
			payload: e.response?.data?.message,
		})

		console.log(e.response?.data?.message)
	}
}
export const getCompetition = () => async dispatch => {
	dispatch({
		type: GET_COVERGIRL_COMPETITION_REQUEST,
	})

	try {
		const res = await axios.get('/api/models/competition')
		const data = res?.data?.data

		dispatch({
			type: GET_COVERGIRL_COMPETITION_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: GET_COVERGIRL_COMPETITION_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
