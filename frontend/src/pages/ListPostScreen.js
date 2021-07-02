import React, { useEffect } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getPostForAdmin, deletePost } from '../redux/actions/post/post'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'

const ListPostScreen = () => {
	const dispatch = useDispatch()
	//get all post for admin
	const adminPost = useSelector(state => state.postForAdmin)
	const { loading, error, posts } = adminPost

	//delete post
	const deletePostState = useSelector(state => state.deletePost)
	const {
		loading: deleteLoading,
		error: deleteError,
		success,
	} = deletePostState

	useEffect(() => {
		dispatch(getPostForAdmin())
	}, [dispatch])

	useEffect(() => {
		dispatch(getPostForAdmin())
	}, [success, dispatch])

	const deleteHandler = id => {
		const del = window.confirm('are you sure you want to delete this post')
		if (del) {
			dispatch(deletePost(id))
		}
	}
	return (
		<>
			<Container className='mt-5'>
				{deleteLoading ? (
					<Loader />
				) : deleteError ? (
					<Message variant='danger'>{deleteError}</Message>
				) : success ? (
					<Message variant='success'>{success}</Message>
				) : (
					''
				)}
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<>
						<Row className='d-sm-flex align-items-center justify-content-between mb-4'>
							<Container>
								<h2 style={{ float: 'left' }}>All posts [{posts?.length}] </h2>
								<LinkContainer
									to='/admin/posts/create'
									style={{ float: 'right', cursor: 'pointer' }}>
									<Button className=''>
										<i className='fa fa-plus'></i> Post
									</Button>
								</LinkContainer>
							</Container>
						</Row>
						<Table striped bordered hover responsive className='table-sm'>
							<thead>
								<th>Image</th>
								<th>Title</th>
								<th>Published</th>
								<th>Views</th>
								<th>Content</th>
								<th>Category</th>
								<th>Date Added</th>
								<th></th>
								<th></th>
								<th></th>
							</thead>
							<tbody>
								{posts.length > 0
									? posts?.map(p => (
											<tr key={p._id}>
												<td>
													<img className='w-48 h-24' src={p.image} alt='' />
												</td>
												<td>{p.title}</td>
												<td>{p.isPublished === true ? 'YES' : 'NO'}</td>
												<td>{p.views}</td>
												<td>{p.content.slice(0, 100)}...</td>
												<td>{p.category?.name}</td>
												<td>{p.createdAt?.split('T')[0]}</td>
												<td>
													{p.isPublished === true ? (
														<button className='focus:outline-none text-white text-sm py-2.5 px-3 rounded-sm bg-green-500 hover:bg-green-600 hover:shadow'>
															unpublish
														</button>
													) : (
														<button className='focus:outline-none text-white text-sm py-2.5 px-3 rounded-sm bg-blue-500 hover:bg-blue-600 hover:shadow'>
															publish
														</button>
													)}
												</td>
												<td>
													<LinkContainer to={`/admin/posts/edit/${p._id}`}>
														<button className='focus:outline-none text-white text-sm py-2.5 px-3 rounded-sm bg-gray-500 hover:bg-gray-600 hover:shadow'>
															<i className='fa fa-edit'></i>
														</button>
													</LinkContainer>
												</td>
												<td>
													<button
														onClick={() => deleteHandler(p._id)}
														className='focus:outline-none text-white text-sm py-2.5 px-3 rounded-sm bg-red-500 hover:bg-red-600 hover:shadow'>
														<i className='fa fa-trash'></i>
													</button>
												</td>
											</tr>
									  ))
									: ''}
							</tbody>
						</Table>
					</>
				)}
			</Container>
		</>
	)
}

export default ListPostScreen
