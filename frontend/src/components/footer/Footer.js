import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from '../../images/Cultura Logo 1.png'
import './footer.css'
import { allCat } from '../../redux/actions/category/category'

const Footer = () => {
	const dispatch = useDispatch()
	//categories
	const cat = useSelector(state => state.categories)

	const { categories } = cat

	useEffect(() => {
		dispatch(allCat())
	}, [dispatch])

	return (
		<>
			<footer className='footer-area'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-4'>
							<div className='footer-single-widget'>
								<LinkContainer to='/'>
									<img className='w-24 rounded' src={Logo} alt='' />
								</LinkContainer>
								<div className='copywrite-text mt-30'>
									<p>
										Copyright ©
										<script>document.write(new Date().getFullYear());</script>
										2021 All rights reserved | Powered by SurgeStone Tech{' '}
										<i className='fa fa-heart-o' aria-hidden='true'></i> by{' '}
										SurgeStone Tech
									</p>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='footer-single-widget'>
								<ul className='footer-menu d-flex justify-content-between'>
									<li>
										<Link to='/'>Home</Link>
									</li>
									{categories?.map(cat => (
										<li key={cat._id}>
											<Link to={`/posts/category/${cat._id}`}>{cat.name}</Link>
										</li>
									))}
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
