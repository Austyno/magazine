import React from 'react'
import { Link } from 'react-router-dom'

const Latest = ({ post }) => {
	return (
		<>
			
			<div className='max-w-md bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl mt-2 w-full'>
				<div className='md:flex'>
					<div className='md:flex-shrink-0'>
						<img
							className='h-48 w-full object-cover md:h-48 md:w-48'
							src={post.image}
							alt={post.title}
						/>
					</div>
					<div className='p-8'>
						<Link
							to={`/post/${post._id}`}
							className='block mt-1 text-lg leading-tight font-medium text-black hover:underline'>
							{post.title}
						</Link>
						<p className='mt-2 text-gray-500'>{post.content.slice(0, 150)}</p>
						<p className='mt-2 text-gray-500'>
							By Admin &bull; on {post.createdAt.split('T')[0]}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Latest
