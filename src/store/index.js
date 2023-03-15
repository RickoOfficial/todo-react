import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './categoriesSlice'
import contextMenu from './contextMenu'
import userSlice from './userSlice'

export const store = configureStore({
	reducer: {
		categories: categoriesSlice,
		user: userSlice,
		contextMenu: contextMenu,
	},
})
