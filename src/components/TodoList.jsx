import { useSelector } from 'react-redux'
import Heading from './Heading'
import TodoItem from './TodoItem'

const TodoList = ({ setCategoryContextMenuItems, setMousePos }) => {
	const category = useSelector((state) => state.categories.selected)

	return (
		<div className="overflow-y-auto h-full max-h-full hide-scroll">
			{category.todos && category.todos.length ? (
				category.todos.map((todo) => {
					return (
						<TodoItem
							todo={todo}
							setCategoryContextMenuItems={setCategoryContextMenuItems}
							setMousePos={setMousePos}
							key={todo.id}
						/>
					)
				})
			) : (
				<Heading className="text-h5">Задачи отсутствуют</Heading>
			)}
		</div>
	)
}

export default TodoList
