import Heading from './Heading'
import TodoItem from './TodoItem'

const TodoList = ({ category, setIsShowCategoryContextMenu, setCategoryContextMenuItems, setMousePos, removeTodo, updateTodo }) => {
	return (
		<div className="overflow-y-auto h-full max-h-full hide-scroll">
			{category.todos.length ? (
				category.todos.map((todo) => {
					return (
						<TodoItem
							todo={todo}
							setIsShowCategoryContextMenu={setIsShowCategoryContextMenu}
							setCategoryContextMenuItems={setCategoryContextMenuItems}
							setMousePos={setMousePos}
							removeTodo={removeTodo}
							updateTodo={updateTodo}
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
