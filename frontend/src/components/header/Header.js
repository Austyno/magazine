import React, { useState, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel'

import { Container } from 'react-bootstrap'
import './header.css'
import NavBar from '../nav-bar/NavBar'
import { images } from '../../images'

const Header = () => {
	const [currentimg, setCurrentImg] = useState(0)
	useEffect(() => {
		const id = setInterval(
			() =>
				setCurrentImg(currentimg === images.length - 1 ? 0 : currentimg + 1),
			20000
		)
		return () => clearInterval(id)
	}, [currentimg])

	return (
		<>
			<div
				className='hero'
				style={{ backgroundImage: `url(${images[currentimg]})` }}>
				<Container className=''>
					<NavBar />
				</Container>
				<div className='screen'></div>
				<div className='mx-auto w-2/3' style={{ marginTop: '-110px' }}>
					<OwlCarousel className='owl-theme' loop margin={10} autoplay center>
						<div className='item bg-red-100'>1</div>
						<div className='item bg-blue-200'>2</div>
						<div className='item bg-yellow-300'>3</div>
						<div className='item bg-gray-400'>4</div>
					</OwlCarousel>
				</div>
			</div>
		</>
	)
}

export default Header
