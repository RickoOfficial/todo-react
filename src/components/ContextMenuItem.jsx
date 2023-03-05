const ContextMenuItem = ({ handleOnClick, children, className }) => {
	return (
		<div
			onClick={handleOnClick}
			className={`text-p2 leading-[135%] hover:text-green-100 transition-all cursor-pointer select-none ${className ? className : ''}`}
		>
			{children}
		</div>
	)
}

export default ContextMenuItem
