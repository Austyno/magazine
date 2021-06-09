import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BodyNav = ({ cat }) => {
	return (
		<>
			<Nav
				variant='pills'
				defaultActiveKey='Rides'
				className="mt-24 mb-5 border-b border-gray-500"
			>
				{cat?.map(cat => (
					<Nav.Item key={cat._id}>
						<Nav.Link href={`/posts/category/${cat._id}`}>{cat.name}</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
		</>
	)
}

export default BodyNav
