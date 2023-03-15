import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth, regUser } from '../store/userSlice'
import Button from './Button'
import Heading from './Heading'
import Input from './Input'
import Tab from './Tab'
import TabItem from './TabItem'

const AuthForm = () => {
	const [userAuthData, setUserAuthData] = useState({
		login: '',
		password: '',
	})

	const [userRegData, setUserRegData] = useState({
		login: '',
		password: '',
	})

	const dispatch = useDispatch()

	const authUser = async () => {
		try {
			const response = await fetch('https://todo-back.na4u.ru/auth', {
				method: 'POST',
				body: JSON.stringify(userAuthData),
			}).then((res) => res.json())

			if (response.status === 'success') {
				dispatch(auth(response.data))
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-7 lg:px-11 lg:py-10 rounded-2xl w-[calc(100%-32px)] max-w-xl">
			{/* <Heading className="mb-5 text-h4 font-medium">Авторизация</Heading> */}
			<Tab>
				<TabItem name="Войти">
					<Input
						placeholder="Логин"
						value={userAuthData.login}
						onInput={(event) => {
							setUserAuthData({ ...userAuthData, login: event.target.value })
						}}
						wrapperClassName="mb-5"
					/>
					<Input
						placeholder="Пароль"
						value={userAuthData.password}
						type="password"
						onInput={(event) => {
							setUserAuthData({ ...userAuthData, password: event.target.value })
						}}
						wrapperClassName="mb-5"
					/>
					<Button
						onClick={() => {
							authUser()
						}}
						className="w-full"
					>
						Войти
					</Button>
				</TabItem>

				<TabItem name="Регистрация">
					<Input
						placeholder="Логин"
						value={userRegData.login}
						onInput={(event) => {
							setUserRegData({ ...userRegData, login: event.target.value })
						}}
						wrapperClassName="mb-5"
					/>
					<Input
						placeholder="Пароль"
						value={userRegData.password}
						type="password"
						onInput={(event) => {
							setUserRegData({ ...userRegData, password: event.target.value })
						}}
						wrapperClassName="mb-5"
					/>
					<Button
						onClick={() => {
							dispatch(regUser(userRegData))
						}}
						className="w-full"
					>
						Зарегистрироваться
					</Button>
				</TabItem>
			</Tab>
		</div>
	)
}

export default AuthForm
