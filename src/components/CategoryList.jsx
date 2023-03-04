import CategoryItem from './CategoryItem'

const CategoryList = ({
	categories,
	setIsShowCategoryContextMenu,
	setCategoryContextMenuItems,
	setMousePos,
	setSelectedCategory,
	selectedCategory,
}) => {
	return (
		<div className="overflow-y-auto h-full max-h-full hide-scroll">
			{categories.map((category, index) => (
				<CategoryItem
					category={category}
					setIsShowCategoryContextMenu={setIsShowCategoryContextMenu}
					setCategoryContextMenuItems={setCategoryContextMenuItems}
					setMousePos={setMousePos}
					setSelectedCategory={setSelectedCategory}
					selectedCategory={selectedCategory}
					key={category.id}
				/>
			))}
		</div>
	)
}

export default CategoryList
