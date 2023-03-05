const ContextMenu = ({ isShow, setIsShow, mousePos, items }) => {
	return (
		<div
			className={`absolute z-30 flex-col gap-3 bg-white border border-grey-100 px-6 py-5 rounded-xl top-5 ${
				isShow ? 'flex' : 'hidden'
			}`}
			style={{ top: mousePos.y + 'px', left: mousePos.x + 'px' }}
			onClick={() => {
				setIsShow(false)
			}}
		>
			{items}
		</div>
	)
}

export default ContextMenu
