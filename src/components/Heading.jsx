const Heading = ({ children, className }) => {
	return <div className={'font-medium leading-none ' + (className ? className : '')}>{children}</div>
}

export default Heading
