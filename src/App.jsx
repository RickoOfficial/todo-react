import { useState } from 'react'
import CategoryList from './components/CategoryList'
import ContextMenu from './components/ContextMenu'
import ContextMenuItem from './components/ContextMenuItem'
import Heading from './components/Heading'
import { data } from './data/categories'

const App = () => {
	const [categories, setCategories] = useState(data)
	const [selectedCategory, setSelectedCategory] = useState(null)

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
	const [isShowCategoryContextMenu, setIsShowCategoryContextMenu] = useState(false)
	const [categoryContextMenuItems, setCategoryContextMenuItems] = useState('')

	const handleOnClick = (event) => {
		if (event.target.closest('.context-menu') === null) {
			setIsShowCategoryContextMenu(false)
		}
	}

	return (
		<main onClick={handleOnClick} className="w-screen h-screen bg-grey-100 text-black px-14 py-14 font-serif">
			<div className="flex gap-10 w-full h-full bg-grey-200 rounded-3xl p-10">
				<div className="flex flex-col bg-white p-5 pb-0 w-2/6 rounded-2xl">
					<Heading className="text-h3 mb-4">Категории</Heading>
					<CategoryList
						categories={categories}
						setIsShowCategoryContextMenu={setIsShowCategoryContextMenu}
						setCategoryContextMenuItems={setCategoryContextMenuItems}
						setMousePos={setMousePos}
						setSelectedCategory={setSelectedCategory}
						selectedCategory={selectedCategory}
					/>
				</div>

				<div className="bg-white p-5 w-4/6 rounded-2xl">
					<Heading className="text-h3">
						{selectedCategory ? selectedCategory.name : 'Категория не выбрана'}
					</Heading>
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
