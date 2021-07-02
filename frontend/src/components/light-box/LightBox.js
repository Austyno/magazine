import React from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import { Row, Col } from 'react-bootstrap'
import SimpleReactLightbox from 'simple-react-lightbox'
// import 'react-awesome-lightbox/build/style.css'

const LightBox = ({ images }) => {
	// const options = {
	// 	settings: {
	// 		overlayColor: 'rgb(25, 136, 124)',
	// 		autoplaySpeed: 1500,
	// 		transitionSpeed: 900,
	// 		height: '250px',
	// 	},
	// 	buttons: {
	// 		backgroundColor: '#1b5245',
	// 		iconColor: 'rgba(126, 172, 139, 0.8)',
	// 	},
	// 	caption: {
	// 		captionColor: '#a6cfa5',
	// 		captionFontFamily: 'Raleway, sans-serif',
	// 		captionFontWeight: '300',
	// 		captionTextTransform: 'uppercase',
	// 	},
	// }
	return (
		<Row>
			<SimpleReactLightbox>
				<SRLWrapper>
					{images.map((p, i) => (
						<img
							key={i}
							src={p.src}
							className='w-48 h-48 rounded bg-cover bg-center shadow cursor-pointer'
							alt={p.caption}
						/>
					))}
				</SRLWrapper>
			</SimpleReactLightbox>
		</Row>
	)
}

export default LightBox
