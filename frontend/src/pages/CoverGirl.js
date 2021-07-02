import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CoverGirlCard from '../components/cover-girl/CoverGirlCard'
import { getAllGirls } from '../redux/actions/girls/girls'
import Loader from '../components/loader/Loader'
import { Container } from 'react-bootstrap'

const CoverGirl = () => {
	const dispatch = useDispatch()
	//models
	const girlsState = useSelector(state => state.models)
	const { loading, error, girls } = girlsState

	useEffect(() => {
		dispatch(getAllGirls())
	}, [dispatch])
	return (
		<>
			<Container>
				<section className='mx-auto text-l max-w-7xl sm:px-6 lg:py-10 rounded'>
					<h1 className='text-center mb-5 font-semibold text-xl text-gray-700'>
						Our Models
					</h1>
					<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2'>
						{loading ? (
							<div className='text-center'>
								<Loader />
							</div>
						) : error ? (
							<span>{error}</span>
						) : (
							girls?.map(girl => <CoverGirlCard girl={girl} />)
						)}
					</ul>
				</section>
			</Container>
		</>
	)
}

export default CoverGirl
