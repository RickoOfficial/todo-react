import { useDispatch, useSelector } from 'react-redux'
import { setIsShow } from '../store/contextMenu'

const ContextMenu = ({ mousePos, items }) => {
	const isShow = useSelector((state) => state.contextMenu.isShow)

	const dispatch = useDispatch()

	return (
		<div
			className={`absolute z-30 flex-col gap-3 bg-white border border-grey-100 px-6 py-5 rounded-xl top-5 ${
				isShow ? 'flex' : 'hidden'
			}`}
			style={{ top: mousePos.y + 'px', left: mousePos.x + 'px' }}
			onClick={() => {
				dispatch(setIsShow(false))
			}}
		>
			{items}
		</div>
	)
}

export default ContextMenu
