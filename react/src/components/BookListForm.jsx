import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { booksActions } from "../store/books";


const BookListForm = ({ match, getBook, createBook, updateBook, books}) => {
	const [title, setTitle] = useState('');
	const [contents, setContents] = useState('');

	const param = match.params.name;
	const history = useHistory();

	useEffect(() => {
		if (param === 'create') return;
		if (!books?.payload){
			getBook();
		} else {
			let book = books?.payload?.filter((val) => val.id === parseInt(param))[0];
			setTitle(book?.title || '')
			setContents(book?.contents || '')
		}		
	}, [books.payload])

	const onSubmitForm = (e) => {
		e.preventDefault();
		const data = new FormData(e.target)
		if (param === 'create') {
			createBook(data)
			history.push("/booklist");			
		} else {
			updateBook(data, param)
			history.push("/booklist");	
		}
	}

	return (
		<Form onSubmit={onSubmitForm} enctype="multipart/form-data">
			<Input
				type="text"
				name="title"
				placeholder="제목"
				value={title}
				onChange={e => setTitle(e.target.value)}
				required
			/>
			<textarea
				name="contents"
				value={contents}
				placeholder="내용"
				onChange={e => setContents(e.target.value)}
			/>
			<input type="file" name="file1" />
			<input type="file" name="file2" />
			<button type="submit">확인</button>
		</Form>
	)
}

const Form = styled.form`
	width: 100%;
	height: 50vh;
	max-width: 800px;
	margin: auto;
	textarea {
		width: 100%;
		height: auto;
		min-height: 80%;
		border-radius: 5px;
		margin-bottom: 20px;
		border: 1px solid #aaa;
		resize: none;
	}
	@media (max-width: 1024px) {
		padding: 0 5%;
	}
`
const Input = styled.input`
	height: 40px;
	border-radius: 5px;
	margin-bottom: 10px;
	border: 1px solid #aaa;
`

const mapStateToProps = (state, ownProps) => {
  return { books: state.books };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    getBook: () => dispatch(booksActions.getBook()),   
		createBook: (data) => dispatch(booksActions.createBook(data)),
		updateBook: (data, param) => dispatch(booksActions.updateBook(data, param)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (BookListForm);