import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const CoverGirlCard = ({ girl }) => {
	return (
		<>
			<LinkContainer to={`/cover-girls/${girl._id}`}>
				<li className='relative'>
					<div className='block overflow-hidden w-full group aspect-w-10 aspect-h-7 bg-red-200'>
						<img
							src={girl.photo}
							className='w-full h-48 pointer-events-none group-hover:opacity-75 rounded bg-cover bg-center'
							alt=''
						/>
						<p type='button' className='absolute inset-0'>
							<span className='text-white p-2 text-lg'>{girl.name}</span>
						</p>
					</div>
				</li>
			</LinkContainer>
		</>
	)
}

export default CoverGirlCard
