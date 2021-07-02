import axios from 'axios'
import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAIL,
	RESET,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
} from '../../constants/user/user'

export const login = (email, password) => async dispatch => {
	try {
		dispatch({ type: USER_AUTH_START })

		const authData = {
			email,
			password,
		}

		await axios.post(`/api/users/login`, authData).then(resp => {
			const loginDetails = { userInfo: resp?.data }

			localStorage.setItem('userInfo', JSON.stringify(loginDetails))
			dispatch({
				type: USER_AUTH_SUCCESS,
				payload: resp?.data,
			})
		})
	} catch (e) {
		dispatch({
			type: USER_AUTH_FAIL,
			payload: e.response?.data?.message,
		})
	}
}
