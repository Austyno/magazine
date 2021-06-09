import React from 'react'
import {Link} from 'react-router-dom'

const largeCard = ({ title, text, img, cat,id }) => {
	return (
		<>
			<div className='max-w-sm rounded overflow-hidden shadow-sm'>
				<img className='w-80 md:h-48 lg:h-56' src={img} alt='' />
				<div className='px-6 py-2'>
					<div className='font-bold text-xl italic mb-2 hover:underline cursor-pointer'>
						<Link className='font-bold text-xl italic' to={`/post/${id}`}>
							{title}
						</Link>
					</div>
					<p className='text-gray-500 text-base'>{text}</p>
				</div>
				<div className='px-6 pt-2 pb-2'>
					{cat ? (
						<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
							<Link to={`/posts/category/${cat._id}`}>#{cat.name}</Link>
						</span>
					) : (
						''
					)}
					<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
						By Admin
					</span>
				</div>
			</div>
		</>
	)
}

export default largeCard
