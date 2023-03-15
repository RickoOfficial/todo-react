import React, { useState } from 'react'
import ContextMenuItem from './ContextMenuItem'
import IconButton from './IconButton'
import AutoResizeTextarea from './AutoResizeTextarea'
import { useDispatch } from 'react-redux'
import { setIsShow } from '../store/contextMenu'
import { removeTodo, updateTodo } from '../store/categoriesSlice'

const TodoItem = ({ todo, setCategoryContextMenuItems, setMousePos }) => {
	const dispatch = useDispatch()

	const [possibleTodoText, setPossibleTodoText] = useState(undefined)

	let textareaRef = React.createRef()

	const handleOnContextMenu = (event) => {
		event.preventDefault()

		setCategoryContextMenuItems([
			<ContextMenuItem
				handleOnClick={() => {
					setPossibleTodoText(todo.task_name)
				}}
				key={0}
			>
				Редактировать
			</ContextMenuItem>,
			<ContextMenuItem
				handleOnClick={() => {
					dispatch(removeTodo(todo.id))
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
			{possibleTodoText !== undefined ? (
				<div
					ref={textareaRef}
					className="relative px-4 py-2 mb-2 rounded-xl border border-grey-300 focus:border-green-100 pr-20"
				>
					<AutoResizeTextarea
						value={possibleTodoText}
						onChange={(event) => setPossibleTodoText(event.target.value)}
						placeholder="Введите текст"
						className="text-p2"
					/>
					<IconButton
						handleOnClick={() => {
							dispatch(updateTodo({ todoId: todo.id, possibleTodoText }))
							setPossibleTodoText(undefined)
						}}
						className="absolute top-6 -translate-y-1/2 w-6 h-6 right-10 flex justify-center items-center outline-none select-none"
					>
						<img src="/img/check.svg" alt="" />
					</IconButton>
					<IconButton
						handleOnClick={() => {
							setPossibleTodoText(undefined)
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
					className="text-p2 rounded-xl p-4 transition-colors cursor-pointer mb-4 select-none bg-grey-100 hover:bg-grey-200"
				>
					{todo.task_name}
				</div>
			)}
		</>
	)
}

export default TodoItem
