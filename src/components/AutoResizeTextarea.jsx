import React, { useState, useRef, useEffect } from 'react'

const AutoResizeTextarea = ({ value, onChange, className, ...props }) => {
	const textareaRef = useRef(null)
	const [height, setHeight] = useState('auto')

	const handleChange = (event) => {
		if (onChange) {
			onChange(event)
		}

		resize()
	}

	const resize = () => {
		const textarea = textareaRef.current
		const padding = textarea.offsetHeight - textarea.clientHeight
		setHeight('auto')
		setHeight(`${textarea.scrollHeight + padding}px`)
	}

	useEffect(() => {
		resize()
	})

	return (
		<textarea
			{...props}
			ref={textareaRef}
			style={{ height }}
			value={value}
			onChange={handleChange}
			className={'resize-none outline-none block w-full overflow-hidden' + ' ' + (className ? className : '')}
		/>
	)
}

export default AutoResizeTextarea
