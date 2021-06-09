import React, { useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Body from '../components/body/Body'
import CardRow from '../components/card-row/CardRow'
import Loader from '../components/loader/Loader'
import { getAllPost } from '../redux/actions/post/post'
import Latest from '../components/latest-card/Latest'
import VideoCard from '../components/video/videoCard'
import { LinkContainer } from 'react-router-bootstrap'

const HomeScreen = () => {
	const dispatch = useDispatch()

	const postState = useSelector(state => state.posts)

	const { loading, error, posts } = postState

	const trendingPost = posts?.sort((a, b) => b.views - a.views).slice(0, 4)

	const latestArticles = posts
		?.sort((a, b) => b.createdAt - a.createdAt)
		.slice(0, 6)
	console.log(latestArticles)

	useEffect(() => {
		dispatch(getAllPost())
	}, [dispatch])

	return (
		<>
			<Body />
			<div className='p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 w-full md:h-48 lg:h-64'>
				{loading ? (
					<Loader />
				) : error ? (
					<span>{error}</span>
				) : (
					trendingPost?.map(item => (
						<CardRow
							key={item._id}
							title={item.title}
							cat={item.category.name}
							img={item.image}
							text={item.content.slice(0, 90)}
							catId={item.category._id}
							postId={item._id}
						/>
					))
				)}
			</div>
			<Container>
				<Row>
					<Col md={8}>
						<h1 className='mt-5 font-bold text-lg ml-3'>Latest Articles</h1>
						<hr className='mb-3' />
						<div class='container w-full mx-auto flex flex-col'>
							{loading ? (
								<Loader />
							) : error ? (
								<span>{error}</span>
							) : (
								latestArticles?.map((post, index) => (
									<Latest key={index} post={post} />
								))
							)}
						</div>
					</Col>
					<Col md={4}>
						<h1 className='mt-5 font-bold text-lg'>Latest Videos</h1>
						<hr className='mb-4' />
						<div className='container'>
							<VideoCard
								vid={`https://www.youtube.com/watch?v=IhnqEwFSJRg`}
								title={'cool video'}
								cat={'videos'}
								text={'video showing cool travel locations'}
							/>
							<VideoCard
								vid={`https://www.youtube.com/watch?v=IhnqEwFSJRg`}
								title={'cool video'}
								cat={'videos'}
								text={'video showing cool travel locations'}
							/>
						</div>
					</Col>
				</Row>
			</Container>

			<div className='text-center my-24'>
				<a
					href=''
					className='ml-10  mt-6 hover:bg-gray-200 rounded-full px-12 py-3 shadow-lg focus:outline-none'>
					Read More
				</a>
			</div>
		</>
	)
}

export default HomeScreen
