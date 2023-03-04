const ContextMenuItem = ({ handleClick, children, className }) => {
	return (
		<div
			onClick={handleClick}
			className={`text-p2 leading-[135%] hover:text-green-100 transition-all ${className ? className : ''}`}
		>
			{children}
		</div>
	)
}

export default ContextMenuItem
