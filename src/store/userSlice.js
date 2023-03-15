import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getCookie, { setCookie } from '../data/cookie'

export const authUser = createAsyncThunk('user/authUser', async () => {
	const token = getCookie('token')
	if (token) {
		try {
			const response = await fetch('https://todo-back.na4u.ru/auth', {
				method: 'GET',
				headers: {
					'X-Auth': token,
				},
			}).then((res) => res.json())

			return response
		} catch (error) {
			console.log(error)
		}
	}
})

export const regUser = createAsyncThunk('user/regUser', async (userData) => {
	try {
		const response = await fetch('https://todo-back.na4u.ru/users', {
			method: 'POST',
			body: JSON.stringify({
				login: userData.login,
				password: userData.password,
			}),
		}).then((res) => res.json())

		return response
	} catch (error) {
		console.log(error)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {
			id: null,
			login: null,
			token: getCookie('token') || null,
			isAuth: false,
		},
	},
	reducers: {
		auth(state, action) {
			state.user = { ...action.payload, isAuth: true }
			setCookie('token', action.payload.token, { 'max-age': 86400 })
		},
	},
	extraReducers: {
		[authUser.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.user = { ...action.payload.data, token: getCookie('token'), isAuth: true }
			} else {
				state.user.isAuth = false
			}
		},
		[authUser.rejected]: (state, action) => {
			console.error(state)
			console.error(action)
		},
		[regUser.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.user = { ...action.payload.data, isAuth: true }
				setCookie('token', action.payload.data.token, { 'max-age': 86400 })
			} else {
				state.user.isAuth = false
			}
		},
	},
})

export const { auth } = userSlice.actions
export default userSlice.reducer
