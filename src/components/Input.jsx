import { useEffect, useState } from 'react'

const Input = ({ value, onInput, className, wrapperClassName, type = 'text', placeholder = '', ...props }) => {
	const [randomId, setRandomId] = useState('')

	const [inputType, setInputType] = useState(type)
	const [showPassword, setShowPassword] = useState(type !== 'password')

	const generateRandomString = (length = 12) => {
		const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let result = ''

		const nowInSeconds = Math.floor(Date.now() / 1000)

		while (result.length < length) {
			const randomChar =
				validChars[(Math.floor(Math.random() * validChars.length) + nowInSeconds) % validChars.length]
			result += randomChar
		}

		return result
	}

	useEffect(() => {
		setRandomId(generateRandomString())
	}, [])

	const handleOnInput = (event) => {
		onInput(event)
	}

	return (
		<div className={`relative h-[58px] ${wrapperClassName}`}>
			<input
				className={`block absolute top-0 left-0 w-full h-full border-b-2 border-grey-100 text-p2 font-normal outline-none focus:border-black transition-all ${className}`}
				{...props}
				value={value}
				onInput={handleOnInput}
				type={inputType}
				id={randomId}
			/>
			{placeholder.trim().length ? (
				<label
					className={`block absolute opacity-60 select-none cursor-text transition-all ${
						value && value.length ? 'top-[-4px] text-p4 text-grey-300' : 'top-1/2 -translate-y-1/2 text-p2'
					}`}
					htmlFor={randomId}
				>
					{placeholder}
				</label>
			) : (
				<></>
			)}
			{type === 'password' ? (
				<div
					onClick={() => {
						setInputType(!showPassword ? 'text' : 'password')
						setShowPassword(!showPassword)
					}}
					className="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6"
				>
					<img
						className="block w-full h-full object-scale-down select-none cursor-pointer"
						src={showPassword ? 'img/show-pass.svg' : 'img/hide-pass.svg'}
						alt="Показать пароль"
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
export default Input
