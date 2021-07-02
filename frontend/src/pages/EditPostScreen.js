import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editPost, updatePost } from '../redux/actions/post/post'
import {UPDATE_POST_RESET} from '../redux/constants/post/postConstants'
import { getAdminCategory, allCat } from '../redux/actions/category/category'
import Loader from '../components/loader/Loader'
import Message from '../components/message/Message'
import ContentEditor from '../components/editor/Editor'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert'

// import { UPDATE_POST_RESET } from '../redux/constants/post'

const EditPostScreen = ({ match, history }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('')
	const [publish, setPublish] = useState(false)

	const [convertedContent, setConvertedContent] = useState(null)

	const [editorState, setEditorState] = useState(
		EditorState.createWithText('Edit text') //edit text or any string is required as initial value else it will return an error
	)
	const dispatch = useDispatch()

	const editState = useSelector(state => state.editPost)

	const { loading, error, post } = editState

	const catState = useSelector(state => state.categories)

	const { categories } = catState

	const updateState = useSelector(state => state.updatePost)

	const { success, loading: updateLoading, error: updateError } = updateState

	useEffect(() => {
		dispatch(editPost(match.params.id))
		dispatch(allCat())
	}, [dispatch, match])

	useEffect(() => {
		if (post) {
			setTitle(post.title)
			setContent(post.content)
			setImage(post.image)
			setCategory(post.category)
		}
	}, [post])

	useEffect(() => {
		if (content?.length > 0) {
			setEditorState(EditorState.createWithText(content))
		}
	}, [content])

	useEffect(() => {
		if (success) {
			dispatch({
				type: UPDATE_POST_RESET,
			})
			history.push('/admin/posts')
		}
	}, [success, history, dispatch])

	const preview = e => {
		const image = e.target.files[0] ? e.target.files[0] : ''
		// setImage(image)
		const FR = new FileReader()
		FR.onload = () => {
			const url = FR.result
			setImage(url)
		}
		FR.readAsDataURL(image)
	}

	const submitHandler = e => {
		const id = match.params.id
		e.preventDefault()

		const data = {
			title,
			image,
			postId: id,
			category: category._id,
			content: convertedContent ? convertedContent : content,
			isPublished:
				publish === 'true' ? true : publish === 'false' ? false : false,
		}

		dispatch(updatePost(id, data))
	}

	const handleEditorChange = state => {
		setEditorState(state)
		setConvertedContent(convertToHTML(editorState.getCurrentContent()))
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{updateLoading ? (
						<Loader />
					) : updateError ? (
						<Message variant='danger'>{updateError}</Message>
					) : (
						''
					)}
					<Row className='justify-content-md-center mt-5'>
						<Col xs={12} md={6}>
							<form>
								<div className='form-group'>
									<Row>
										<label
											className='col-4 control-label py-2'
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
											className='col-4 control-label py-2'
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											Image
										</label>

										<img
											className='ml-3'
											src={image}
											alt=''
											name='image'
											style={{ height: '150px', width: '150px' }}
										/>
									</Row>
									<div className='form-group'>
										<Row>
											<div className='col-4'></div>
											<div className='col-8'>
												<Form.File
													name='image'
													label='change post image'
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
											className='col-4 control-label py-2'
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
												{categories?.map(cat => (
													<option
														value={cat._id}
														selected={
															cat._id === post.category?._id ? true : false
														}>
														{cat.name}
													</option>
												))}
											</select>
										</div>
									</Row>
								</div>
								<div className='form-group'>
									<Row>
										<label
											className='col-4 control-label py-2'
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											Publish Now
										</label>
										<div className='col-8'>
											<div class='custom-control custom-radio custom-control-inline'>
												<input
													className='custom-control-input'
													type='radio'
													id='customRadioInline1'
													name='publish'
													value='true'
													onChange={e => setPublish(e.target.value)}
												/>
												<label
													class='custom-control-label'
													for='customRadioInline1'>
													True
												</label>
											</div>
											<div class='custom-control custom-radio custom-control-inline'>
												<input
													className='custom-control-input'
													type='radio'
													id='customRadioInline2'
													name='publish'
													value='false'
													onChange={e => setPublish(e.target.value)}
												/>
												<label
													className='custom-control-label'
													for='customRadioInline2'>
													False
												</label>
											</div>
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
								{/* <div className='col-4 control-label py-2'></div> */}
								<button
									onClick={submitHandler}
									className='btn btn-primary block mb-5 col-4'
									style={{
										float: 'right',
										fontFamily: 'American Typewriter',
										fontWeight: 'bold',
									}}>
									Update
								</button>
							</form>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default EditPostScreen
