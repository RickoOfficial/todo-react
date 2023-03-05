import { useState } from 'react'
import Button from './components/Button'
import CategoryList from './components/CategoryList'
import ContextMenu from './components/ContextMenu'
import ContextMenuItem from './components/ContextMenuItem'
import Heading from './components/Heading'
import IconButton from './components/IconButton'
import TodoList from './components/TodoList'
import { data } from './data/categories'

const App = () => {
	const [categories, setCategories] = useState(data)
	const [selectedCategory, setSelectedCategory] = useState(null)

	const [sideBarOpen, setSideBarOpen] = useState(false)

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
	const [isShowCategoryContextMenu, setIsShowCategoryContextMenu] = useState(false)
	const [categoryContextMenuItems, setCategoryContextMenuItems] = useState('')

	const handleOnClick = (event) => {
		if (event.target.closest('.context-menu') === null) {
			setIsShowCategoryContextMenu(false)
		}
	}

	const createCategory = () => {
		let categoriesCopy = [...categories]
		categoriesCopy.push({
			id: Number(Math.random().toString().slice(5)),
			name: 'New Category',
			todos: [],
		})
		setCategories(categoriesCopy)
	}

	const removeCategory = (categoryId) => {
		const categoriesCopy = [...categories]
		setCategories(categoriesCopy.filter((category) => category.id !== categoryId))
	}

	const updateCategory = (categoryId, categoryName) => {
		const categoriesCopy = [...categories]
		categoriesCopy.map((category) => {
			if (category.id === categoryId) {
				category.name = categoryName
			}
			return category
		})
		setCategories(categoriesCopy)
	}

	const createTodo = () => {
		let categoriesCopy = [...categories]
		let selectedCategoryCopy = { ...selectedCategory }

		categoriesCopy = categoriesCopy.map((category) => {
			if (category.id === selectedCategory.id) {
				selectedCategoryCopy = category
				category.todos.push({
					id: Number(Math.random().toString().slice(5)),
					text: 'New Todo',
					status: false,
				})
			}
			return category
		})

		setCategories(categoriesCopy)
		setSelectedCategory(selectedCategoryCopy)
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
			className="w-screen h-screen bg-grey-100 text-black p-0 lg:p-4 xl:px-14 xl:py-14 font-serif"
		>
			<div
				onClick={() => {
					setSideBarOpen(false)
				}}
				className={`lg:hidden absolute w-full h-full bg-black ${
					sideBarOpen ? 'opacity-50 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
				} cursor-default select-none`}
			></div>

			<div className="flex gap-10 w-full h-full bg-grey-200 md:rounded-3xl md:p-10 p-4">
				<div
					className={`flex flex-col bg-white p-5 pb-0 lg:w-2/6 w-full lg:max-w-none max-w-sm lg:rounded-2xl rounded-tr-2xl rounded-br-2xl absolute lg:static top-0 h-full transition-all ${
						sideBarOpen ? 'left-0 z-20' : '-left-full'
					}`}
				>
					<Heading className="flex justify-between items-center text-h3 mb-4">
						Категории
						<IconButton handleOnClick={createCategory} className="flex justify-center items-center w-7 h-7">
							<img className="block w-full h-full" src="img/plus.svg" alt="" />
						</IconButton>
					</Heading>
					{categories.length ? (
						<CategoryList
							categories={categories}
							setIsShowCategoryContextMenu={setIsShowCategoryContextMenu}
							setCategoryContextMenuItems={setCategoryContextMenuItems}
							setMousePos={setMousePos}
							setSelectedCategory={setSelectedCategory}
							selectedCategory={selectedCategory}
							removeCategory={removeCategory}
							updateCategory={updateCategory}
							setSideBarOpen={setSideBarOpen}
						/>
					) : (
						<Heading className="text-h5">Категории отсутствуют</Heading>
					)}
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
							{selectedCategory ? selectedCategory.name : 'Категория не выбрана'}
						</div>
						{selectedCategory ? (
							<IconButton handleOnClick={createTodo} className="flex justify-center items-center w-7 h-7">
								<img className="block w-full h-full" src="img/plus.svg" alt="" />
							</IconButton>
						) : (
							<></>
						)}
					</Heading>
					{selectedCategory ? (
						<TodoList
							category={selectedCategory}
							setIsShowCategoryContextMenu={setIsShowCategoryContextMenu}
							setCategoryContextMenuItems={setCategoryContextMenuItems}
							setMousePos={setMousePos}
							removeTodo={removeTodo}
							updateTodo={updateTodo}
						/>
					) : (
						<></>
					)}
				</div>
			</div>

			<ContextMenu
				isShow={isShowCategoryContextMenu}
				setIsShow={setIsShowCategoryContextMenu}
				mousePos={mousePos}
				categoryContextMenuItems={categoryContextMenuItems}
				items={categoryContextMenuItems}
			/>
		</main>
	)
}

export default App
