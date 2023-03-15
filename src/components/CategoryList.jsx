import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/categoriesSlice'
import CategoryItem from './CategoryItem'
import Heading from './Heading'

const CategoryList = ({ setCategoryContextMenuItems, setSideBarOpen, setMousePos }) =>
	// 	categories,
	// 	setIsShowCategoryContextMenu,
	{
		const categories = useSelector((state) => state.categories.list)

		const dispatch = useDispatch()

		useEffect(() => {
			dispatch(fetchCategories())
		}, [dispatch])

		return (
			<div className="overflow-y-auto h-full max-h-full hide-scroll">
				{categories.length ? (
					categories.map((category) => (
						<CategoryItem
							category={category}
							setCategoryContextMenuItems={setCategoryContextMenuItems}
							setMousePos={setMousePos}
							key={category.id}
							setSideBarOpen={setSideBarOpen}
						/>
					))
				) : (
					<Heading className="text-h5">Категории отсутствуют</Heading>
				)}
			</div>
		)
	}

export default CategoryList
