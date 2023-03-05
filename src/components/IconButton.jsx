const IconButton = ({ handleOnClick, className, children, ...props }) => {
	return (
		<button
			{...props}
			onClick={handleOnClick}
			className={'hover:scale-110 active:scale-90 transition-all ' + className || ''}
		>
			{children}
		</button>
	)
}

export default IconButton
