import React from 'react'
import { Link } from 'react-router-dom'

const CardRow = ({ img, cat, text, catId, postId }) => {
	return (
		<>
			<div class='relative shadow-lg rounded-lg group h-48 w-full flex justify-center overflow-hidden'>
				<div
					class='rounded-lg h-full w-full absolute z-10 bg-cover bg-center bg-no-repeat hover:opacity-50 transition-all duration-500 ease-in-out'
					style={{ backgroundImage: `url(${img})` }}></div>
					<div className='text-white-500 mb-3 mt-3 z-20 italic text-center justify-start cursor-pointer text-white'>
						<Link className='hover:text-white-500' to={`/cat/${catId}`}>
							{cat}
						</Link>
					</div>
					<div className='italic text-l absolute z-20 font-bold text-white text-center mt-5 md:p-5 justify-center'>
						<Link to={`/post/${postId}`}>{text}</Link>
					</div>
			</div>
		</>
	)
}

export default CardRow
