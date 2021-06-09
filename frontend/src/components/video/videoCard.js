import React from 'react'
import './video.css'

const VideoCard = ({ title, vid, cat,text }) => {
	return (
		<>
			<div className='max-w-sm rounded overflow-hidden shadow-lg mt-3'>
				<video className='w-full md:h-48 lg:h-56' src={vid} alt='' controls />
				<div className='px-6 py-2'>
					<div className='font-bold text-xl italic mb-2'>{title}</div>
					<p className='text-gray-500 text-base'>{text}</p>
				</div>
				<div className='px-6 pt-4 pb-2'>
					{cat ? (
						<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
							#{cat}
						</span>
					) : (
						''
					)}
				</div>
			</div>
		</>
	)
}

export default VideoCard
