import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { ContentState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './editor.css'

const ContentEditor = ({ initialContent }) => {
	// let _contentState = ContentState.createFromText(initialContent)
	// const raw = convertToRaw(ContentState.createFromText(initialContent))
	const [contentState, setContentState] = useState()

	useEffect(() => {
		if (initialContent?.length > 0) {
			setContentState(convertToRaw(ContentState.createFromText(initialContent)))
		}
	}, [initialContent])

	return (
		<Editor
			defaultContentState={contentState}
			onContentStateChange={setContentState}
			wrapperClassName='wrapper-class'
			editorClassName='editor-class'
			toolbarClassName='toolbar-class'
		/>
	)
}

export default ContentEditor
