import React from 'react'
import { Nav, Container } from 'react-bootstrap'

const TrendingNav = ({ cat, click }) => {
	return (
		<>
			<Container>
				<Nav className='mt-5 mb-3 border-b border-gray-500' variant='pills'>
					<span className='font-semibold ml-3 -mb-5 text-lg font-serif'>
						Trending Now
					</span>
					{cat?.map(cat => (
						<Nav.Item key={cat._id}>
							<Nav.Link onClick={() => click(cat._id)}>{cat.name}</Nav.Link>
						</Nav.Item>
					))}
				</Nav>
			</Container>
		</>
	)
}

export default TrendingNav
