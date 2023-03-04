import ContextMenuItem from './ContextMenuItem'

const CategoryItem = ({
	category,
	setIsShowCategoryContextMenu,
	setCategoryContextMenuItems,
	setMousePos,
	setSelectedCategory,
	selectedCategory,
}) => {
	const handleContextMenu = (event) => {
		event.preventDefault()

		setCategoryContextMenuItems([
			<ContextMenuItem handleClick={updateCategory} key={0}>
				Редактировать
			</ContextMenuItem>,
			<ContextMenuItem handleClick={deleteCategory} key={1}>
				Удалить
			</ContextMenuItem>,
		])
		setMousePos({
			x: event.pageX,
			y: event.pageY,
		})
		setIsShowCategoryContextMenu(true)
	}

	const updateCategory = () => {
		console.log(`f(x) - updateCategory: ${category.name}`)
	}
	const deleteCategory = () => {
		console.log(`f(x) - deleteCategory: ${category.name}`)
	}

	return (
		<div
			onContextMenu={handleContextMenu}
			onClick={() => {
				setSelectedCategory(category)
			}}
			className={
				'text-p2 bg-grey-100 rounded-xl p-4 hover:bg-grey-200 transition-all cursor-pointer mb-4 select-none' +
				' ' +
				(selectedCategory && selectedCategory.id === category.id
					? 'bg-green-100 text-white hover:bg-green-200'
					: '')
			}
		>
			{category.name}
		</div>
	)
}

export default CategoryItem
