import { useState } from 'react'

const Tab = ({ children, onChange = () => {} }) => {
	const [selectedItem, setSelectedItem] = useState(0)

	return (
		<div className="">
			<div className={`mb-5 rounded-xl bg-grey-200 p-1 grid grid-cols-${children.length} text-center`}>
				{children.map((item, index) => {
					return (
						<div
							onClick={() => {
								setSelectedItem(index)
								onChange(index, children)
							}}
							className={`text-h5 font-medium py-4 rounded-lg select-none cursor-pointer ${
								selectedItem === index ? 'bg-white' : ''
							}`}
							key={index}
						>
							{item.props.name}
						</div>
					)
				})}
			</div>
			{children[selectedItem]}
		</div>
	)
}

export default Tab
