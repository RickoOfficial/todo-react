/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#fff',
			black: '#242321',
			green: {
				100: '#60BF19',
				200: '#6AD11D',
			},
			grey: {
				100: '#EFEFEB',
				200: '#E4E3E0',
				300: '#BABAB9',
			},
		},
		fontFamily: {
			serif: ['Rubik', 'sans-serif'],
		},
		fontSize: {
			h1: '72px',
			h2: '52px',
			h3: '40px',
			h4: '28px',
			h5: '18px',
			p1: '22px',
			p2: '18px',
			p3: '14px',
			p4: '13px',
		},
		extend: {},
	},
	plugins: [],
}
