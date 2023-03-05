const Button = ({ children, className, ...props }) => {
	return (
		<button
			{...props}
			className={`font-medium md:px-9 sm:px-6 px-4 md:py-4 sm:py-4 py-2 bg-green-100 hover:bg-green-200 sm:rounded-xl rounded-lg hover:scale-110 active:scale-90 transition-all text-white ${
				className ? className : ''
			}`}
		>
			{children}
		</button>
	)
}

export default Button
