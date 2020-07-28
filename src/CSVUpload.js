import React, { Component } from 'react'

import { CSVReader } from 'react-papaparse'
import { Button } from 'semantic-ui-react'
const buttonRef = React.createRef()

export default class CSVUpload extends Component {
	constructor(props) {
		super(props)
	}

	handleOpenDialog = (e) => {
		// Note that the ref is set async, so it might be null at some point 
		if (buttonRef.current) {
			buttonRef.current.open(e)
		}
	}

	handleOnFileLoad = async (data) => {
		console.log('---------------------------')
		console.log(data)
		console.log('---------------------------')
		this.props.toggleChange(data)
	}

	handleOnError = (err, file, inputElem, reason) => {
		console.log(err)
	}


	render() {
		return (
			<CSVReader
				ref={buttonRef}
				onFileLoad={this.handleOnFileLoad}
				onError={this.handleOnError}
				noClick
				noDrag
				onRemoveFile={this.handleOnRemoveFile}
				config={{
					header: true,
					skipEmptyLines: true,
					transformHeader: (header) => { return header.replace(/\s/, '') },
					transform: (value) => {return value.replace(/"/g,'').trim()}
				}}
			>
				{({ file }) => (
					<Button color="blue" onClick={this.handleOpenDialog} style={{marginBottom: 8}}>Upload CSV</Button>
				)}
			</CSVReader>
		)
	}
}