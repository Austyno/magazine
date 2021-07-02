import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { addVote } from '../../redux/actions/girls/girls'
import Loader from '../loader/Loader'
import {VOTE_GIRL_RESET }from '../../redux/constants/girls/girlsConstants'


const MyModal = ({ open, onClose, model, comptId}) => {
	const dispatch = useDispatch()

	const voteState = useSelector(state => state.vote)

	const {loading, error, msg} = voteState

	const [email, setEmail] = useState('')

	const handleVote = () => {
		onClose()
		const data = {
			competitionId: comptId,
			userEmail: email,
			modelId: model,
		}
		return dispatch(addVote(data))
	}

	// useEffect(() => {
	// 	if (error) {
	// 		onClose()
	// 		dispatch({
	// 			type: VOTE_GIRL_RESET,
	// 		})
	// 	}
	// 	if (msg) {
	// 		onClose()
	// 		dispatch({
	// 			type: VOTE_GIRL_RESET,
	// 		})
	// 	}
	// }, [msg, onClose,dispatch, error])
	return (
		<>
			<div>
				<Modal open={open} onClose={onClose} center>
					<div className='w-full md:max-w-md mt-6'>
						<div className='card bg-white shadow-md rounded-lg px-4 py-4 mb-6 bg-gray-400'>
							<form>
								<div className='flex items-center justify-center'>
									<h2 className='text-xl text-gray-500 font-bold tracking-wide'>
										Please Enter Your Email to vote
									</h2>
								</div>
									<>
										<input
											type='text'
											className='rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none'
											placeholder='Email Address'
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>

										<div className='flex items-center justify-between'>
											<button
												onClick={handleVote}
												className='bg-gray-500 text-gray-200  px-2 py-1 rounded'>
												{loading ? <Loader /> : 'Proceed'}
											</button>
										</div>
									</>
							</form>
						</div>
					</div>
				</Modal>
			</div>
		</>
	)
}

export default MyModal
