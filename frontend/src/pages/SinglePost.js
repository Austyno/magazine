import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import {
	getTopStories,
	getTodaysPick,
	getSinglePost,
	getTabPost,
} from '../redux/actions/post/post'
import Loader from '../components/loader/Loader'
import Cards from '../components/card/Card'
import LargeCard from '../components/large-card/largeCard'
import SinglePost from '../components/single-post/SinglePost'
import { Link } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const SingleBlogPost = ({ match }) => {
	const dispatch = useDispatch()

	const [postCatId, setPostCatId] = useState('')

	//top stories
	const topStoriesState = useSelector(state => state.topStories)

	const {
		loading: topStoriesLoading,
		error: topStoriesError,
		topStories,
	} = topStoriesState

	//todays take
	const todaysPickState = useSelector(state => state.todaysPick)
	const {
		loading: todaysPickLoading,
		error: todaysPickError,
		todaysPick,
	} = todaysPickState

	//tab post
	const tabPostState = useSelector(state => state.tabPost)

	const {
		loading: tabPostLoading,
		error: tabPostError,
		tabPosts,
	} = tabPostState

	//post
	const postState = useSelector(state => state.singlePost)

	const { loading, error, post } = postState

	useEffect(() => {
		dispatch(getTopStories())
		dispatch(getTodaysPick())
		dispatch(getSinglePost(match.params.id))
	}, [dispatch, match])

	useEffect(() => {
		dispatch(getTabPost(post?.category?.id))
	}, [dispatch, post])
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<span>{error}</span>
			) : (
				<div className='main-content-wrapper section-padding-100'>
					<div className='container'>
						<div className='row justify-content-center'>
							<div className='col-12 col-lg-8'>
								<div className='single-blog-content mb-100'>
									<div className='post-meta'>
										<p>
											<h1 className='float-left mr-4 text-lg'>{post?.title}</h1>
											<a href='#' className='post-author'>
												Admin
											</a>{' '}
											<span className=''>on</span>{' '}
											<a href='#' className='post-date'>
												{post?.createdAt?.split('T')[0]}
											</a>
										</p>
									</div>

									<div className='post-content'>
										<h6>{post?.content}</h6>

										{/* <ul className='post-tags'>
											<li>
												<a href='#'>Manual</a>
											</li>
											<li>
												<a href='#'>Liberty</a>
											</li>
											<li>
												<a href='#'>Recommendations</a>
											</li>
											<li>
												<a href='#'>Interpritation</a>
											</li>
										</ul> */}

										<div className='post-meta second-part'>
											<p>
												<a href='#' className='post-author'>
													Admin
												</a>{' '}
												on{' '}
												<a href='#' className='post-date'>
													{post?.createdAt?.split('T')[0]}
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className='col-12 col-md-8 col-lg-4'>
								<div className='post-sidebar-area mb-100'>
									<div className='sidebar-widget-area'>
										<h5 className='title'>About World</h5>
										<div className='widget-content'>
											<p>
												The mango is perfect in that it is always yellow and if
												it’s not, I don’t want to hear about it. The mango’s
												only flaw, and it’s a minor one, is the effort it
												sometimes takes to undress the mango, carve it up in a
												way that makes sense, and find its way to the mouth.
											</p>
										</div>
									</div>

									<div className='sidebar-widget-area'>
										<h5 className='title'>Top Stories</h5>
										<div className='widget-content'>
											{topStoriesLoading ? (
												<Loader />
											) : topStoriesError ? (
												<span>{topStoriesError}</span>
											) : (
												topStories?.map(top => (
													<div className='single-blog-post post-style-2 d-flex align-items-center widget-post'>
														<div className='post-thumbnail'>
															<img className='h-28' src={top.image} alt='' />
														</div>

														<div className='post-content'>
															<a href='#' className='headline'>
																<h5 className='mb-0'>
																	{top.content.slice(0, 30)}
																</h5>
															</a>
														</div>
													</div>
												))
											)}
										</div>
									</div>

									<div className='sidebar-widget-area'>
										<h5 className='title'>Stay Connected</h5>
										<div className='widget-content'>
											<div className='social-area d-flex justify-content-between'>
												<a href='#'>
													<i className='fa fa-facebook'></i>
												</a>
												<a href='#'>
													<i className='fa fa-twitter'></i>
												</a>
												<a href='#'>
													<i className='fa fa-pinterest'></i>
												</a>
												<a href='#'>
													<i className='fa fa-vimeo'></i>
												</a>
												<a href='#'>
													<i className='fa fa-instagram'></i>
												</a>
												<a href='#'>
													<i className='fa fa-google'></i>
												</a>
											</div>
										</div>
									</div>

									<div className='sidebar-widget-area'>
										<h5 className='title'>Today’s Pick</h5>
										<div className='widget-content'>
											{todaysPickLoading ? (
												<Loader />
											) : todaysPickError ? (
												<span>{todaysPickError}</span>
											) : (
												<div className='single-blog-post todays-pick'>
													<div className='post-thumbnail'>
														<img
															className='h-48'
															src={todaysPick[0]?.image}
															alt=''
														/>
													</div>

													<div className='post-content px-0 pb-0'>
														<a href='#' className='headline'>
															<h5>
																<Link>
																	{todaysPick[0]?.content.slice(0, 100)}
																</Link>
															</h5>
														</a>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='row'>
							{tabPostLoading ? (
								<Loader />
							) : tabPostError ? (
								<span>{tabPostError}</span>
							) : (
								tabPosts?.map(post => (
									<div className='col-12 col-md-6 col-lg-4'>
										<div className='single-blog-post'>
											<div className='post-thumbnail'>
												<img className='h-44' src={post?.image} alt='' />

												<div className='post-cta'>
													<a href='#'>{post?.category.name}</a>
												</div>
											</div>

											<div className='post-content'>
												<a href='#' className='headline'>
													<h5>{post?.title}</h5>
												</a>
												<p>{post?.content.slice(0, 100)}</p>

												<div className='post-meta'>
													<p>
														<a href='#' className='post-author'>
															Admin
														</a>{' '}
														on{' '}
														<a href='#' className='post-date'>
															{post?.createdAt?.split('T')[0]}
														</a>
													</p>
												</div>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			)}
			{/* <Container>
				<Row>
					<Col md={8}>
						<>
							<div classNameName='border-t mt-32 border-gray-400'>
								{loading ? (
									<Loader />
								) : error ? (
									<span>{error}</span>
								) : (
									<>
										<SinglePost post={post} />
									</>
								)}
							</div>
						</>
						<Row>
							<div classNameName='p-10 lg:pt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8'>
								{tabPostLoading ? (
									<Loader />
								) : tabPostError ? (
									<span>{tabPostError}</span>
								) : (
									tabPosts?.map(post => (
										<LargeCard
											title={post.title}
											text={`${post.content.slice(0, 50)}...`}
											img={post.image}
											cat={post.category}
											key={post._id}
										/>
									))
								)}
							</div>
						</Row>
					</Col>
					<Col md={4} classNameName='border-l'>
						<div
							classNameName='border-b border-gray-400'
							style={{ marginTop: '79px' }}>
							<h2 classNameName='border-b border-gray-400 text-xl italic font-bold p-3'>
								About
							</h2>
							<p classNameName='text-gray-500 text-base p-3'>
								The mango is perfect in that it is always yellow and if it’s
								not, I don’t want to hear about it. The mango’s only flaw, and
								it’s a minor one, is the effort it sometimes takes to undress
								the mango, carve it up in a way that makes sense, and find its
								way to the mouth.
							</p>
						</div>
						<div classNameName='text-xl italic font-bold p-3'>Top Stories</div>
						<div classNameName='border-t border-b border-gray-400 pb-4 pt-4'>
							{topStoriesLoading ? (
								<Loader />
							) : topStoriesError ? (
								<span>{topStoriesError}</span>
							) : (
								topStories?.map(top => (
									<Cards
										title={top.title}
										img={top.image}
										subtitle={top.content.slice(0, 20)}
										key={top._id}
									/>
								))
							)}
						</div>
						<div classNameName='text-xl italic font-bold p-3'>Stay Connected</div>
						<div classNameName='d-flex justify-evenly border-t border-b border-gray-400 p-4'>
							<a href='#'>
								<i classNameName='fa fa-facebook'></i>
							</a>
							<a href='#'>
								<i classNameName='fa fa-twitter'></i>
							</a>
							<a href='#'>
								<i classNameName='fa fa-instagram'></i>
							</a>
							<a href='#'>
								<i classNameName='fa fa-google'></i>
							</a>
						</div>
						<div classNameName='text-xl italic font-bold p-3'>Today's Pick</div>
						<div classNameName='border-t border-gray-400 pb-4 pt-4'>
							{todaysPickLoading ? (
								<Loader />
							) : todaysPickError ? (
								<span>{todaysPickError}</span>
							) : (
								<LargeCard
									title={todaysPick[0]?.title}
									text={`${todaysPick[0]?.content.slice(0, 100)}...`}
									img={todaysPick[0]?.image}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container> */}
			<Footer />
		</>
	)
}

export default SingleBlogPost
