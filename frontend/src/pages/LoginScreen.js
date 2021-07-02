import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/user/user'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
	let history = useHistory()

	const dispatch = useDispatch()

	const loginState = useSelector(state => state.userLogin)

	const { loading, error, userInfo } = loginState

	const [formState, setFomState] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (userInfo?.token) {
			setTimeout(() => {
				history.push('/admin/posts')
			}, 2000)
		}
	}, [history, userInfo])

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value

		setFomState({
			...formState,
			[name]: value,
		})
	}

	console.log(userInfo?.token)

	const submitHandler = e => {
		e.preventDefault()

		const password = formState.password
		const email = formState.email

		dispatch(login(email, password))
	}

	return (
		<>
			<Container className='mb-3'>
				{loading && <Loader />}
				{error && <Message>{error}</Message>}
				{userInfo?.token && (
					<Message variant='success'>Congrats login Successful</Message>
				)}
				<Col md={6} className='mx-auto mb-5 mt-4' style={{ height: '400px' }}>
					<Card className='py-4 p-3 mt-5' style={{ marginTop: '30px' }}>
						<Card.Text
							as='h5'
							className='mb-5 text-gray-500'
							style={{
								fontFamily: 'American Typewriter',
								fontWeight: 'bold',
							}}>
							Admin Login
						</Card.Text>
						<Form className='form-horizontal'>
							<div className='form-group'>
								<Row>
									<label for='email' className='col-4 control-label py-2'>
										email
									</label>
									<div className='col-8'>
										<input
											name='email'
											className='form-control'
											type='text'
											value={formState.email}
											onChange={handleChange}
											placeholder='email'
										/>
									</div>
								</Row>
							</div>
							<div className='form-group'>
								<Row>
									<label for='password' className='col-4 control-label py-2'>
										Password
									</label>
									<div className='col-8'>
										<input
											name='password'
											className='form-control'
											type='password'
											value={formState.password}
											onChange={handleChange}
											placeholder='password'
										/>
									</div>
								</Row>
							</div>

							<Button
								onClick={submitHandler}
								className='w-100 bg-gray-700 hover:bg-gray-600 hover:border-b border-b'>
								Proceed
							</Button>
						</Form>
					</Card>
				</Col>
			</Container>
		</>
	)
}

export default LoginScreen
