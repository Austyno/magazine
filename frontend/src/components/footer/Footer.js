import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from '../../images/Cultura Logo 1.png'
import './footer.css'
import { Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<>
			<footer className='footer-area'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-4'>
							<div className='footer-single-widget'>
								<a href='#'>
									<img className="w-24 rounded" src={Logo} alt='' />
								</a>
								<div className='copywrite-text mt-30'>
									<p>
										Copyright ©
										<script>document.write(new Date().getFullYear());</script>
										2021 All rights reserved | Powered by SurgeStone Tech{' '}
										<i className='fa fa-heart-o' aria-hidden='true'></i> by{' '}
									</p>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='footer-single-widget'>
								<ul className='footer-menu d-flex justify-content-between'>
									<li>
										<a href='#'>Food & Drinks</a>
									</li>
									<li>
										<a href='#'>Rides</a>
									</li>
									<li>
										<a href='#'>Culture</a>
									</li>
									<li>
										<a href='#'>Style</a>
									</li>
									<li>
										<a href='#'>Girls</a>
									</li>
									<li>
										<a href='#'>Video</a>
									</li>
									<li>
										<a href='#'>Entertainment</a>
									</li>
								</ul>
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='footer-single-widget'>
								<h5>Subscribe</h5>
								<form action='#' method='post'>
									<input
										type='email'
										name='email'
										id='email'
										placeholder='Enter your mail'
									/>
									<button type='button'>
										<i className='fa fa-arrow-right'></i>
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
