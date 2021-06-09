import React, { useEffect } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navBar.css'
import Logo from '../../images/Cultura Logo 1.png'

const NavBar = () => {
	// window.on('scroll', function () {
	// 	if (window.scrollTop() > 20) {
	// 		$('.header-area').addClass('sticky')
	// 	} else {
	// 		$('.header-area').removeClass('sticky')
	// 	}
	// })

	const handleScroll = () => {
		if (window.pageYOffset > 30) {
			document.querySelector('.header-area').classList.add('sticky')
		} else {
			document.querySelector('.header-area').classList.remove('sticky')
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => window.removeEventListener('scroll', handleScroll)
	})

	return (
		<>
			<header className='header-area'>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<nav className='navbar navbar-expand-lg'>
								<a className='navbar-brand' href='index.html'>
									<img className='rounded-lg w-28' src={Logo} alt='' />
								</a>

								<button
									className='navbar-toggler'
									type='button'
									data-toggle='collapse'
									data-target='#worldNav'
									aria-controls='worldNav'
									aria-expanded='false'
									aria-label='Toggle navigation'>
									<span className='navbar-toggler-icon'></span>
								</button>

								<div className='collapse navbar-collapse' id='worldNav'>
									<ul className='navbar-nav ml-auto'>
										<li className='nav-item active'>
											<Link to='' className='nav-link'>
												Home <span className='sr-only'>(current)</span>
											</Link>
										</li>
										<li className='nav-item dropdown'>
											<a
												className='nav-link dropdown-toggle'
												href='#'
												id='navbarDropdown'
												role='button'
												data-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'>
												Pages
											</a>
											<div
												className='dropdown-menu'
												aria-labelledby='navbarDropdown'>
												<a className='dropdown-item' href='index.html'>
													Home
												</a>
												<a className='dropdown-item' href='catagory.html'>
													Catagory
												</a>
												<a className='dropdown-item' href='single-blog.html'>
													Single Blog
												</a>
												<a className='dropdown-item' href='regular-page.html'>
													Regular Page
												</a>
												<a className='dropdown-item' href='contact.html'>
													Contact
												</a>
											</div>
										</li>
										<li className='nav-item'>
											<a className='nav-link' href='#'>
												Gadgets
											</a>
										</li>
										<li className='nav-item'>
											<a className='nav-link' href='#'>
												Lifestyle
											</a>
										</li>
										<li className='nav-item'>
											<a className='nav-link' href='#'>
												Video
											</a>
										</li>
										<li className='nav-item'>
											<a className='nav-link' href='#'>
												Contact
											</a>
										</li>
									</ul>

									<div id='search-wrapper'>
										<form action='#'>
											<input
												type='text'
												id='search'
												placeholder='Search something...'
											/>
											<div id='close-icon'></div>
											<input className='d-none' type='submit' value='' />
										</form>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</header>
			{/* <Container className=''>
				<Navbar
					// bg='light'
					expand='lg'
					className='fixed w-11/12'
					id='worldNav'>
					<Container>
						<Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
						<Navbar.Toggle aria-controls='basic-navbar-nav' />
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='ml-auto'>
								<Nav.Link href='#home' className='text-white'>
									Home
								</Nav.Link>
								<Nav.Link href='#link' className='text-white'>
									Link
								</Nav.Link>
								<NavDropdown
									className='text-white'
									title='Dropdown'
									id='basic-nav-dropdown'
									style={{ paddingRight: '50px' }}>
									<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
									<NavDropdown.Item href='#action/3.2'>
										Another action
									</NavDropdown.Item>
									<NavDropdown.Item href='#action/3.3'>
										Something
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='#action/3.4'>
										Separated link
									</NavDropdown.Item>
								</NavDropdown>
								<div id='search-wrapper'>
									<form action='#'>
										<input
											type='text'
											id='search'
											placeholder='Search something...'
										/>
										<div id='close-icon'></div>
										<input className='d-none' type='submit' value='' />
									</form>
								</div>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</Container> */}
		</>
	)
}

export default NavBar
