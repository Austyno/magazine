import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader/Loader'
import { allCat } from '../redux/actions/category/category'
import {Link} from 'react-router-dom'

const CategoryScreen = () => {
	const dispatch = useDispatch()

	const allCatState = useSelector(state => state.categories)
	const { loading, error, categories } = allCatState

	useEffect(() => {
		dispatch(allCat())
	}, [dispatch])
	return (
		<>
			<h1 className="text-xl font-bold leading-tight mx-auto mb-4 mt-5 text-center">All Categories</h1>
			<div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
				{loading ? (
					<Loader />
				) : error ? (
					<span>{error}</span>
				) : (
					categories?.map(cat => (
						<div className='rounded overflow-hidden shadow-lg'>
							{/* <img className='w-full' src='/mountain.jpg' alt='Mountain' /> */}
							<div className='px-6 py-4'>
								<div className='font-bold text-xl mb-2'>
									<Link
										className='font-bold text-xl mb-2 text-gray-700'
										to={`/posts/category/${cat.id}`}>
										{cat.name}
									</Link>
								</div>
								<p className='text-gray-700 text-base'>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Voluptatibus quia, nulla! Maiores et perferendis eaque,
									exercitationem praesentium nihil.
								</p>
							</div>
							{/* <div className='px-6 pt-4 pb-2'>
								<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
									#photography
								</span>
								<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
									#travel
								</span>
								<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
									#winter
								</span>
							</div> */}
						</div>
					))
				)}
			</div>
		</>
	)
}

export default CategoryScreen
