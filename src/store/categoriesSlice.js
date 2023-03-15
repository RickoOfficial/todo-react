import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getCookie from '../data/cookie'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
	try {
		const response = await fetch('https://todo-back.na4u.ru/category', {
			method: 'GET',
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return response
	} catch (error) {
		console.log(error)
	}
})

export const fetchTodos = createAsyncThunk('categories/fetchTodos', async (category) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/category/${category.id}`, {
			method: 'GET',
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return { ...response, category }
	} catch (error) {
		console.log(error)
	}
})

export const updateCategory = createAsyncThunk('categories/updateCategory', async (data) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/category/${data.categoryId}`, {
			method: 'PUT',
			body: JSON.stringify({
				category_name: data.possibleCategoryName,
			}),
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return response
	} catch (error) {
		console.log(error)
	}
})

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryName) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/category/`, {
			method: 'POST',
			body: JSON.stringify({
				category_name: categoryName,
			}),
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return response
	} catch (error) {
		console.log(error)
	}
})

export const removeCategory = createAsyncThunk('categories/removeCategory', async (categoryId) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/category/${categoryId}`, {
			method: 'DELETE',
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return {
			...response,
			data: {
				categoryId,
			},
		}
	} catch (error) {
		console.log(error)
	}
})

export const createTodo = createAsyncThunk('categories/createTodo', async (data) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/task`, {
			method: 'POST',
			body: JSON.stringify({
				category_id: data.categoryId,
				task_name: data.todoText,
			}),
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return response
	} catch (error) {
		console.log(error)
	}
})

export const removeTodo = createAsyncThunk('categories/removeTodo', async (todoId) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/task/${todoId}`, {
			method: 'DELETE',
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return { ...response, todoId }
	} catch (error) {
		console.log(error)
	}
})

export const updateTodo = createAsyncThunk('categories/updateTodo', async (data) => {
	try {
		const response = await fetch(`https://todo-back.na4u.ru/task/${data.todoId}`, {
			method: 'PUT',
			body: JSON.stringify({
				task_name: data.possibleTodoText,
			}),
			headers: {
				'X-Auth': getCookie('token'),
			},
		}).then((res) => res.json())

		return { ...response, data }
	} catch (error) {
		console.log(error)
	}
})

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		selected: null,
		list: [],
	},
	reducers: {},
	extraReducers: {
		[fetchCategories.pending]: (state, action) => {},
		[fetchCategories.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.list = action.payload.data
			}
		},
		[fetchCategories.rejected]: (state, action) => {},

		[fetchTodos.pending]: (state, action) => {},
		[fetchTodos.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.selected = {
					...action.payload.category,
					todos: [...action.payload.data],
				}
			} else {
				state.selected = {
					...action.payload.category,
					todos: [],
				}
			}
		},
		[fetchTodos.rejected]: (state, action) => {},

		[updateCategory.pending]: (state, action) => {},
		[updateCategory.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				const newCategory = action.payload.data
				const categoriesListCopy = [...state.list]

				categoriesListCopy.map((category) => {
					if (category.id === newCategory.id) {
						category.category_name = newCategory.category_name
					}
					return category
				})

				state.list = categoriesListCopy

				if (state.selected && newCategory.id === state.selected.id) {
					state.selected.category_name = newCategory.category_name
				}
			}
		},
		[updateCategory.rejected]: (state, action) => {},

		[removeCategory.pending]: (state, action) => {},
		[removeCategory.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				const categoriesListCopy = state.list.filter(
					(category) => category.id !== action.payload.data.categoryId
				)
				state.list = categoriesListCopy

				if (state.selected && action.payload.data.categoryId === state.selected.id) {
					state.selected = null
				}
			}
		},
		[removeCategory.rejected]: (state, action) => {},

		[createCategory.pending]: (state, action) => {},
		[createCategory.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.list.push(action.payload.data)
			}
		},
		[createCategory.rejected]: (state, action) => {},

		[createTodo.pending]: (state, action) => {},
		[createTodo.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.selected.todos.push(action.payload.data)
			}
		},
		[createTodo.rejected]: (state, action) => {},

		[removeTodo.pending]: (state, action) => {},
		[removeTodo.fulfilled]: (state, action) => {
			if (action.payload && action.payload.status === 'success') {
				state.selected.todos = state.selected.todos.filter((todo) => todo.id !== action.payload.todoId)
			}
		},
		[removeTodo.rejected]: (state, action) => {},

		[updateTodo.pending]: (state, action) => {},
		[updateTodo.fulfilled]: (state, action) => {
			console.log(action.payload)
			if (action.payload && action.payload.status === 'success') {
				state.selected.todos = state.selected.todos.map((todo) => {
					if (todo.id === action.payload.data.todoId) {
						todo.task_name = action.payload.data.possibleTodoText
					}

					return todo
				})
			}
		},
		[updateTodo.rejected]: (state, action) => {},
	},
})

export const { selectCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
