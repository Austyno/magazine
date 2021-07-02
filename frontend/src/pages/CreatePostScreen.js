import React, { useState, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { allCat } from '../redux/actions/category/category'
import { createPost } from '../redux/actions/post/post'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import { CREATE_POST_RESET } from '../redux/constants/post/postConstants'
import ContentEditor from '../components/editor/Editor'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert'

const CreatePostScreen = ({ history }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('')

	const [convertedContent, setConvertedContent] = useState(null)

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const dispatch = useDispatch()

	const catState = useSelector(state => state.categories)

	const { categories } = catState

	const postState = useSelector(state => state.createPost)

	const { success, loading, error } = postState
	useEffect(() => {
		dispatch(allCat())
	}, [dispatch])

	useEffect(() => {
		if (success) {
			dispatch({
				type: CREATE_POST_RESET,
			})
			history.push('/admin/posts')
		}
	}, [success, history, dispatch])

	const preview = e => {
		const image = e.target.files[0] ? e.target.files[0] : ''
		const FR = new FileReader()
		FR.onload = () => {
			const url = FR.result
			setImage(url)
		}
		FR.readAsDataURL(image)
	}
	const submitHandler = e => {
		e.preventDefault()
		const data = {
			title,
			content,
			category,
			image,
		}
		dispatch(createPost(data))
	}
	const handleEditorChange = state => {
		setEditorState(state)
		setConvertedContent(convertToHTML(editorState.getCurrentContent()))
	}
	return (
		<>
			{/* title,content publish, image */}

			<h1 className='text-center text-lg text-gray-700 my-4'>Add New Article</h1>
			<div className='mx-auto mt-2'>
				<Row className='justify-content-md-center mt-5'>
					{loading ? <Loader /> : error ? <Message>{error}</Message> : ''}
					<Col xs={12} md={9}>
						<form>
							<div className='form-group'>
								<Row>
									<label
										className='col-4 text-center control-label py-2'
										style={{
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										Title
									</label>
									<div className='col-8'>
										<input
											name='title'
											className='form-control'
											type='text'
											value={title}
											required
											onChange={e => setTitle(e.target.value)}
										/>
									</div>
								</Row>
							</div>

							<div className='form-group'>
								<Row>
									<label
										className='col-4 text-center control-label py-2'
										style={{
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										Image
									</label>
									{image && (
										<img
											className='ml-3'
											src={image}
											alt=''
											name='image'
											style={{ height: '60px', width: '60px' }}
										/>
									)}
								</Row>
								<div className='form-group'>
									<Row>
										<div className='col-4'></div>
										<div className='col-8'>
											<Form.File
												name='image'
												label='Add post image'
												custom
												onChange={e => preview(e)}></Form.File>
										</div>
									</Row>
								</div>
							</div>

							<div className='form-group'>
								{/* Todo: get the select to have a default value of the current product cat */}
								<Row>
									<label
										className='col-4 text-center control-label py-2'
										style={{
											fontFamily: 'American Typewriter',
											fontWeight: 'bold',
										}}>
										Category
									</label>
									<div className='col-8'>
										<select
											className='form-control'
											required
											onChange={e => setCategory(e.target.value)}>
											{categories &&
												categories.map(cat => (
													<option value={cat._id}>{cat.categoryName}</option>
												))}
										</select>
									</div>
								</Row>
							</div>
							<div className='form-group'>
								<Row>
									<div className='col-12'>
										<Editor
											defaultEditorState={editorState}
											editorState={editorState}
											onEditorStateChange={handleEditorChange}
											wrapperClassName='wrapper-class'
											editorClassName='editor-class'
											toolbarClassName='toolbar-class'
										/>
									</div>
								</Row>
							</div>
							<div className='col-4 text-center control-label py-2'></div>
							<button
								onClick={submitHandler}
								className='btn btn-primary block mb-5 col-4'
								style={{
									float: '',
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								create post
							</button>
						</form>
					</Col>
				</Row>{' '}
			</div>
		</>
	)
}

export default CreatePostScreen
