import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import OwlCarousel from 'react-owl-carousel'
import BodyNav from '../nav/BodyNav'
import { getAllGirls } from '../../redux/actions/girls/girls'
import {
	getAllPost,
	getTabPost,
	getTopStories,
	getTodaysPick,
} from '../../redux/actions/post/post'
import { allCat } from '../../redux/actions/category/category'
import Loader from '../loader/Loader'
import Cards from '../card/Card'
import LargeCard from '../large-card/largeCard'
import TrendingNav from '../trending-nav/TrendingNav'

const Body = () => {
	const dispatch = useDispatch()

	//models
	const girlsState = useSelector(state => state.models)
	const { loading, error, girls } = girlsState

	//post
	const postState = useSelector(state => state.posts)

	const { loading: postLoading, error: postError, posts } = postState

	console.log(posts)

	//categories
	const cat = useSelector(state => state.categories)

	const { categories } = cat

	const trendingCat = categories
		?.sort((a, b) => b.viewsCount - a.viewsCount)
		.slice(0, 4)

	console.log(trendingCat)

	//tab post
	const tabPostState = useSelector(state => state.tabPost)

	const {
		loading: tabPostLoading,
		error: tabPostError,
		tabPosts,
	} = tabPostState

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

	useEffect(() => {
		dispatch(getAllGirls())
		dispatch(getAllPost())
		dispatch(allCat())
	}, [dispatch])

	useEffect(() => {
		dispatch(getTopStories())
		dispatch(getTodaysPick())
	}, [dispatch])



	//TODO:solve error wit dispatch of trendingCat in useEffect
	const getPost = catId => {
		dispatch(getTabPost(catId))
	}

	return (
		<>
			<Container>
				<Row>
					<Col md={8} className='border-r'>
						<BodyNav cat={categories} />

						<div className='row'>
							<Col md={6}>
								<div className=''>
									{loading ? (
										<Loader />
									) : error ? (
										<span>{error}</span>
									) : (
										<OwlCarousel
											items={1}
											loop={true}
											autoplay={true}
											autoplayTimeout={3500}
											smartSpeed={2000}>
											{girls?.map(girl => (
												<div className='rounded shadow-sm'>
													<img
														className='w-full h-80 md:h-80 lg:h-80 bg-cover bg-center'
														src={girl.photo}
														alt=''
														style={{ height: '352px' }}
													/>
												</div>
											))}
										</OwlCarousel>
									)}
								</div>
							</Col>
							<Col md={6}>
								<div className=''>
									{postLoading ? (
										<Loader />
									) : postError ? (
										<span>{postError}</span>
									) : (
										posts?.slice(0, 3).map(post => <Cards post={post} />)
									)}
								</div>
							</Col>
						</div>
						<Row>
							<Container>
								<Row>
									<TrendingNav cat={trendingCat} click={getPost} />
								</Row>
								<Row>
									<div className='p-10 lg:pt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
										{postLoading ? (
											<Loader />
										) : tabPosts ? (
											tabPosts?.map(post => (
												<LargeCard
													title={post.title}
													text={`${post.content.slice(0, 50)}...`}
													img={post.image}
													cat={post.category}
													id={post._id}
												/>
											))
										) : (
											posts?.map(post => (
												<LargeCard
													title={post.title}
													text={`${post.content.slice(0, 50)}...`}
													img={post.image}
													cat={post.category}
													id={post._id}
												/>
											))
										)}

									</div>
								</Row>
								<Row>
									<Container>
										<div className='w-full'>
											<div className='row'>
												<OwlCarousel loop margin={10} autoplay center>
													{posts?.map(item => (
														<div className='item post-style-2 d-flex align-items-center w-128'>
															<div className='w-full pr-2'>
																<img
																	className='w-24 h-24 rounded-l-sm'
																	src={item.image}
																	alt=''
																/>
															</div>

															<div className='post-content'>
																<Link to={item._id} className='headline'>
																	<h5>{item.title}</h5>
																</Link>

																<div className='post-meta'>
																	<p>
																		<Link to='' className='post-author'>
																			Admin
																		</Link>{' '}
																		on{' '}
																		<Link to='' className='post-date'>
																			{item.createdAt.split('T')[0]}
																		</Link>
																	</p>
																</div>
															</div>
														</div>
													))}
												</OwlCarousel>
											</div>
										</div>
									</Container>
								</Row>
							</Container>
						</Row>
					</Col>
					<Col md={4} className=''>
						<div
							className='border-b border-gray-400'
							style={{ marginTop: '79px' }}>
							<h2 className='border-b border-gray-400 text-xl italic font-bold p-3'>
								About
							</h2>
							<p className='text-gray-500 text-base p-3'>
								The mango is perfect in that it is always yellow and if it’s
								not, I don’t want to hear about it. The mango’s only flaw, and
								it’s a minor one, is the effort it sometimes takes to undress
								the mango, carve it up in a way that makes sense, and find its
								way to the mouth.
							</p>
						</div>
						<div className='text-xl italic font-bold p-3'>Top Stories</div>
						<div className='border-t border-b border-gray-400 pb-4 pt-4'>
							{topStoriesLoading ? (
								<Loader />
							) : topStoriesError ? (
								<span>{topStoriesError}</span>
							) : (
								topStories?.map(top => <Cards post={top} />)
							)}
						</div>
						<div className='text-xl italic font-bold p-3'>Stay Connected</div>
						<div className='d-flex justify-evenly border-t border-b border-gray-400 p-4'>
							<Link to=''>
								<i className='fa fa-facebook'></i>
							</Link>
							<Link to=''>
								<i className='fa fa-twitter'></i>
							</Link>
							<Link to=''>
								<i className='fa fa-instagram'></i>
							</Link>
							<Link to=''>
								<i className='fa fa-google'></i>
							</Link>
						</div>
						<div className='text-xl italic font-bold p-3'>Today's Pick</div>
						<div className='border-t border-gray-400 pb-4 pt-4'>
							{todaysPickLoading ? (
								<Loader />
							) : todaysPickError ? (
								<span>{todaysPickError}</span>
							) : (
								<LargeCard
									title={todaysPick[0]?.title}
									text={`${todaysPick[0]?.content.slice(0, 80)}...`}
									img={todaysPick[0]?.image}
									id={todaysPick[0]?._id}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Body
