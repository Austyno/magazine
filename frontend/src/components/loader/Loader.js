import React from 'react'
import { Container } from 'react-bootstrap'
import ScaleLoader from 'react-spinners/ScaleLoader'
import './loader.css'
 

const Loader = ({ color = 'black', height = 35, }) => {

    return (
			<>
				<Container className='mx-auto'>
					<ScaleLoader
						color={color}
						css={{
							height: 50,
							display: 'block',
							margin: '0 auto',
							borderColor: 'black',
						}}
						size={150}
					/>
				</Container>
			</>
		)
}

export default Loader