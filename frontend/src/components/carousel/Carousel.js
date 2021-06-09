import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

const Carousel = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		const id = setInterval(
			() =>
				setCurrentSlide(
					currentSlide === images?.length - 1 ? 0 : currentSlide + 1
				),
			4000
		)
		return () => clearInterval(id)
	}, [currentSlide, images])

	return (
		<section className='slider'>
			{images?.map((slide, index) => {
				return (
					<div
						className={currentSlide === index ? 'slide active' : 'slide'}
						key={index}>
						{currentSlide === index && (
							<Card className='card-shadow'>
								<Card.Img
									src={slide.photo}
									alt=''
									className='image'
									style={{
										width: '100%',
										position: 'absolute',
										height: '350px',
									}}
								/>

								<Card.Title
									as='h1'
									style={{
										position: 'relative',
										color: 'white',
										padding: '30px',
									}}>
									{slide.name}
								</Card.Title>
							</Card>
						)}
					</div>
				)
			})}
		</section>
	)
}
export default React.memo(Carousel)
