import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { getSingleGirl, getCompetition } from '../redux/actions/girls/girls'
import Loader from '../components/loader/Loader'
import LightBox from '../components/light-box/LightBox'
import Timer from '../components/timer/Timer'
import Message from '../components/message/Message'
import Modal from '../components/modal/Modal'

const VotingScreen = ({ match }) => {
	const dispatch = useDispatch()
	const [votingEnded, setVotingEnded] = useState(false)
	const [open, setOpen] = useState(false)
	const onOpenModal = () => setOpen(true)
	const onCloseModal = () => setOpen(false)

	const girlState = useSelector(state => state.singleModel)

	const { loading, error, girl } = girlState

	const elements = []

	//vote
	const voteState = useSelector(state => state.vote)

	const { loading: voteLoading, error: voteError, msg } = voteState

	//competition
	const comptState = useSelector(state => state.competition)

	const { compt } = comptState

	const votingEndDate = Date.parse(new Date(compt?.endDate)) / 1000

	girl?.photos?.map(p =>
		elements.push({
			src: p,
			thumbnail: p,
			caption: girl.name,
		})
	)

	useEffect(() => {
		dispatch(getSingleGirl(match.params.id))
		dispatch(getCompetition())
	}, [dispatch, match])

	const handleVotingEnded = () => {
		setVotingEnded(true)
	}
	const vote = () => {
		onOpenModal()
	}

	return (
		<>
			{open && (
				<Modal
					open={open}
					onClose={onCloseModal}
					model={girl?._id}
					comptId={compt?._id}
					center
				/>
			)}
			<div className='mt-16'>
				{msg && (
					<div className='text-center'>
						<Message variant='success'>{msg}</Message>
					</div>
				)}
				{voteError && (
					<div className='text-center'>
						<Message variant='danger'>{voteError}</Message>
					</div>
				)}
				{votingEnded ? (
					<div className=''>
						<h1 className='mx-auto text-center text-xl text-gray-700 font-semibold py-60'>
							Voting has ended. The winner will be published on the Site soon.
						</h1>
					</div>
				) : (
					<>
						<h1 className='text-center mb-5 font-semibold text-xl text-gray-700'>
							{girl?.name}
						</h1>
						<Row>
							<Col md={10} className=''>
								{loading ? (
									<Loader />
								) : error ? (
									<span>{error}</span>
								) : (
									<div className='my-px px-px w-1/4 overflow-hidden sm:my-1 sm:px-1 md:my-px md:px-px lg:my-px lg:px-px xl:my-px xl:px-px'>
										<div className='container flex flex-wrap -mx-px overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-px xl:-mx-px'>
											<LightBox images={elements} />
										</div>
									</div>
								)}
							</Col>
							<Col md={2} className='container bg-gray-200'>
								<div>
									<div className=''>
										<p className='mb-2 text-gray-500'>
											{girl?.bio?.slice(0, 150)}
										</p>
									</div>
									<div className=''>
										<button
											onClick={() => vote()}
											disabled={
												msg === 'Your vote has been added successful. Thank you'
													? true
													: false
											}
											className='focus:outline-none text-white text-sm py-2.5 px-3 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg hover:underline border-b'>
											{voteLoading ? (
												<Loader />
											) : msg ===
											  'Your vote has been added successful. Thank you' ? (
												'Thanks for Voting'
											) : (
												`Vote for ${girl?.name}`
											)}
										</button>
									</div>
								</div>
							</Col>
						</Row>
						<Row className='bg-gray-200 mb-5'>
							<div className='mx-auto'>
								<h1 className='text-lg font-semibold text-gray-700'>
									Voting Ends In:
								</h1>
								{compt ? (
									<Timer ending={votingEndDate} ended={handleVotingEnded} />
								) : (
									''
								)}
							</div>
						</Row>
					</>
				)}
			</div>
		</>
	)
}

export default VotingScreen
// awesun remote desktop
