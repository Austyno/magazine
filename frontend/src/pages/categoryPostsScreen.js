import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCatPost } from '../redux/actions/post/post'
import Loader from '../components/loader/Loader'
import { getCategory } from '../redux/actions/category/category'
import { Link } from 'react-router-dom'


const CategoryScreen = ({ match }) => {
	const dispatch = useDispatch()

	const catPostsState = useSelector(state => state.allCatPosts)
	const { loading, error, posts } = catPostsState

	const catState = useSelector(state => state.singleCat)
	const { loading: catLoading, error: catError, cat } = catState
	console.log(cat)
	useEffect(() => {
		dispatch(getAllCatPost(match.params.id))
		dispatch(getCategory(match.params.id))
	}, [dispatch, match])

	return (
		<>
			<h1 className='text-xl font-bold mt-5 mb-5 text-center text-gray-700'>
				Category :{' '}
				{catLoading ? (
					<Loader />
				) : catError ? (
					<span>{catError}</span>
				) : (
					cat?.name
				)}
			</h1>
			<div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5'>
				{loading ? (
					<Loader />
				) : error ? (
					<span>{error}</span>
				) : (
					posts?.map(post => (
						<div className='rounded overflow-hidden shadow-lg'>
							<img className='w-full h-48' src={post.image} alt={post.title} />
							<div className='px-6 py-4'>
								<div className='font-bold text-xl mb-2'>
									<Link
										className='font-bold text-xl mb-2'
										to={`/post/${post._id}`}>
										{post.title}
									</Link>
								</div>
								<p className='text-gray-700 text-base'>
									{`${post.content.slice(0, 100)}...`}
								</p>
							</div>
							<div className='px-6 pt-4 pb-2'>
								<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
									#{post.category.name}
								</span>
								<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
									Admin
								</span>
							</div>
						</div>
					))
				)}
			</div>
		</>
	)
}

export default CategoryScreen
