import React, { useState } from 'react'
import ContextMenuItem from './ContextMenuItem'
import AutoResizeTextarea from './AutoResizeTextarea'
import IconButton from './IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow } from '../store/contextMenu'
import { fetchTodos, removeCategory, updateCategory } from '../store/categoriesSlice'

const CategoryItem = ({ category, setCategoryContextMenuItems, setMousePos, setSideBarOpen }) => {
	const selectedCategory = useSelector((state) => state.categories.selected)
	const dispatch = useDispatch()

	const [possibleCategoryName, setPossibleCategoryName] = useState(undefined)

	let textareaRef = React.createRef()

	const handleOnContextMenu = (event) => {
		event.preventDefault()

		setCategoryContextMenuItems([
			<ContextMenuItem
				handleOnClick={() => {
					setPossibleCategoryName(category.category_name)
				}}
				key={0}
			>
				Редактировать
			</ContextMenuItem>,
			<ContextMenuItem
				handleOnClick={() => {
					dispatch(removeCategory(category.id))
				}}
				key={1}
			>
				Удалить
			</ContextMenuItem>,
		])
		setMousePos({
			x: event.pageX,
			y: event.pageY,
		})

		dispatch(setIsShow(true))
	}

	return (
		<>
			{possibleCategoryName !== undefined ? (
				<div
					ref={textareaRef}
					className="relative px-4 py-2 mb-2 rounded-xl border border-grey-300 focus:border-green-100 pr-20"
				>
					<AutoResizeTextarea
						value={possibleCategoryName}
						onChange={(event) => setPossibleCategoryName(event.target.value)}
						placeholder="Введите название"
						className="text-p2"
					/>
					<IconButton
						handleOnClick={() => {
							dispatch(updateCategory({ categoryId: category.id, possibleCategoryName }))
							setPossibleCategoryName(undefined)
						}}
						className="absolute top-6 -translate-y-1/2 w-6 h-6 right-10 flex justify-center items-center outline-none select-none"
					>
						<img src="/img/check.svg" alt="" />
					</IconButton>
					<IconButton
						handleOnClick={() => {
							setPossibleCategoryName(undefined)
						}}
						title="Отмена"
						className="absolute top-6 -translate-y-1/2 w-6 h-6 right-2 flex justify-center items-center outline-none select-none"
					>
						<img src="/img/close.svg" alt="" />
					</IconButton>
				</div>
			) : (
				<div
					onContextMenu={handleOnContextMenu}
					onClick={() => {
						dispatch(fetchTodos(category))
						setSideBarOpen(false)
					}}
					className={
						'text-p2 rounded-xl p-4 transition-colors cursor-pointer mb-4 select-none' +
						' ' +
						(selectedCategory && selectedCategory.id === category.id
							? 'bg-green-100 text-white hover:bg-green-200'
							: 'bg-grey-100 hover:bg-grey-200')
					}
				>
					{category.category_name}
				</div>
			)}
		</>
	)
}

export default CategoryItem
