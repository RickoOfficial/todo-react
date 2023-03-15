import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthForm from './components/AuthForm'
import Button from './components/Button'
import CategoryList from './components/CategoryList'
import ContextMenu from './components/ContextMenu'
import Heading from './components/Heading'
import IconButton from './components/IconButton'
import TodoList from './components/TodoList'
import { createCategory, createTodo } from './store/categoriesSlice'
import { setIsShow } from './store/contextMenu'
import { authUser } from './store/userSlice'

const App = () => {
	const user = useSelector((state) => state.user.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(authUser())
	}, [dispatch])

	const [categories, setCategories] = useState([])
	const selectedCategory = useSelector((state) => state.categories.selected)

	const [sideBarOpen, setSideBarOpen] = useState(false)

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
	const [isShowCategoryContextMenu, setIsShowCategoryContextMenu] = useState(false)
	const [categoryContextMenuItems, setCategoryContextMenuItems] = useState('')

	const handleOnClick = (event) => {
		if (event.target.closest('.context-menu') === null) {
			dispatch(setIsShow(false))
		}
	}

	const removeTodo = (todoId) => {
		const categoriesCopy = [...categories]
		const selectedCategoryCopy = categoriesCopy.find((category) => category.id === selectedCategory.id)
		selectedCategoryCopy.todos = [...selectedCategoryCopy.todos.filter((todo) => todo.id !== todoId)]
	}

	const updateTodo = (todoId, newTodo) => {
		const selectedCategoryTodoCopy = [...selectedCategory.todos]
		const updatedTodo = selectedCategoryTodoCopy.find((todo) => todo.id === todoId)
		updatedTodo.text = newTodo
	}

	return (
		<main
			onClick={handleOnClick}
			className={`w-screen h-screen bg-grey-100 text-black p-0 lg:p-4 xl:px-14 xl:py-14 font-serif ${
				sideBarOpen ? 'overflow-hidden' : ''
			}`}
		>
			<div
				onClick={() => {
					setSideBarOpen(false)
				}}
				className={`lg:hidden absolute w-screen h-screen bg-black ${
					sideBarOpen ? 'opacity-50 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
				} cursor-default select-none`}
			></div>

			<div className="relative flex gap-10 w-full h-full bg-grey-200 md:rounded-3xl md:p-10 p-4">
				{user.isAuth ? (
					<>
						<div
							className={`flex flex-col bg-white p-5 pb-0 lg:w-2/6 w-full lg:max-w-none max-w-sm lg:rounded-2xl rounded-tr-2xl rounded-br-2xl absolute lg:static top-0 bottom-0 h-screen lg:h-full transition-all ${
								sideBarOpen ? 'left-0 z-20' : '-left-full'
							}`}
						>
							<Heading className="flex justify-between items-center text-h3 mb-4">
								Категории
								<IconButton
									handleOnClick={() => {
										dispatch(createCategory('New Category'))
									}}
									className="flex justify-center items-center w-7 h-7"
								>
									<img className="block w-full h-full" src="img/plus.svg" alt="" />
								</IconButton>
							</Heading>
							<CategoryList
								// categories={categories}
								// setIsShowCategoryContextMenu={setIsShowCategoryContextMenu}
								setCategoryContextMenuItems={setCategoryContextMenuItems}
								setMousePos={setMousePos}
								setSideBarOpen={setSideBarOpen}
							/>
						</div>

						<div className="flex flex-col bg-white p-5 pb-0 lg:w-4/6 w-full rounded-2xl">
							<Heading className="flex justify-between items-center text-h5 sm:text-h4 md:text-h3 mb-4">
								<div className="flex items-center">
									<Button
										onClick={() => {
											setSideBarOpen(true)
										}}
										className="lg:hidden text-p3 mr-4"
									>
										Категории
									</Button>
									{selectedCategory ? selectedCategory.category_name : 'Категория не выбрана'}
								</div>
								{selectedCategory ? (
									<IconButton
										handleOnClick={() => {
											dispatch(createTodo({
												categoryId: selectedCategory.id,
												todoText: 'New Todo'
											}))
										}}
										className="flex justify-center items-center w-7 h-7"
									>
										<img className="block w-full h-full" src="img/plus.svg" alt="" />
									</IconButton>
								) : (
									<></>
								)}
							</Heading>
							{selectedCategory ? (
								<TodoList
									setCategoryContextMenuItems={setCategoryContextMenuItems}
									setMousePos={setMousePos}
									removeTodo={removeTodo}
									updateTodo={updateTodo}
								/>
							) : (
								<></>
							)}
						</div>
					</>
				) : (
					<AuthForm />
				)}
			</div>

			<ContextMenu
				isShow={isShowCategoryContextMenu}
				mousePos={mousePos}
				categoryContextMenuItems={categoryContextMenuItems}
				items={categoryContextMenuItems}
			/>
		</main>
	)
}

export default App
