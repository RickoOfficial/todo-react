import { createSlice } from '@reduxjs/toolkit'

const contextMenuSlice = createSlice({
	name: 'contextMenu',
	initialState: {
		isShow: false,
		items: [],
	},
	reducers: {
		setIsShow(state, action) {
			state.isShow = action.payload
		},
	},
})

export const { setIsShow } = contextMenuSlice.actions
export default contextMenuSlice.reducer
