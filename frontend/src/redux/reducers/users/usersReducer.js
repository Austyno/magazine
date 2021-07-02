import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAIL,
	RESET,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	CHANGE_ROLE_REQUEST,
	CHANGE_ROLE_SUCCESS,
	CHANGE_ROLE_FAIL,
} from '../../constants/user/user'

export const userLoginReducer = (state = { userInfo: {} }, action) => {
	switch (action.type) {
		case USER_AUTH_START:
			return {
				loading: true,
				userInfo: {},
			}
		case USER_AUTH_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case USER_AUTH_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case RESET:
			return { }

		default:
			return state
	}
}
