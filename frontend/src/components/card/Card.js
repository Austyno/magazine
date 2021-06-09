import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'

const CardComponent = ({ post }) => {
	return (
		<>
			<div className='bg-white w-128 h-28 m-1 rounded shadow-lg flex text-grey-darkest overflow-hidden md:overflow-clip animate__animated fadeinUpBig'>
				<div className='md:flex-shrink-0'>
					<img src={post?.image} className='w-24 h-full rounded-l-sm' alt='' />
				</div>
				<div className='p-3'>
					<div className='block cursor-pointer text-lg italic leading-tight font-medium text-black hover:underline'>
						<Link className='text-lg italic' to={`/post/${post?._id}`}>
							{post?.title}
						</Link>
					</div>
					<div className='px-1 justify-start text-gray-400'>
						<p className='text-gray-500'>{`${post?.content.slice(
							0,
							50
						)}...`}</p>
					</div>
				</div>
			</div>
		</>
	)
}
export default CardComponent
