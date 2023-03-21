import React from "react"
import { useState } from "react"
import {useAuthContext} from "../../hooks/useAuthContext"
import { projectStorage, projectFirestore } from "../../firebase/config"

// styles
import "./BookUpload.css"

function BookUpload() {
	const [file, setFile] = useState(null)
	const [fileError, setFileError] = useState(null)
	const [fileSize, setFileSize] = useState(0)
	const [bookName, setBookName] = useState("")
	const [authorNames, setAuthorNames] = useState("")

	const {user} = useAuthContext()

	const handleFileChange = (e) => {

		// to reset any selected image
		setFile(null)

		let selected = e.target.files[0]  // selecting first element of array of files
		console.log(selected)
	
		if (!selected) {
		  setFileError("Please select a file")
		  return
		}
	
		if (!selected.type.includes("pdf")) {
			alert("selected file is not pdf")
		  	setFileError("selected file must be a PDF")
		  return
		}
	
		// in case of no error
		setFileError(null)
	
		setFile(selected)
		setFileSize(selected.size)
		console.log("file uploaded")

	}

	const handleSubmit = async (e) => {

		e.preventDefault()

		// forming an array of author names
		let authorList = authorNames.split(",")
		authorList = authorList.map((name) => {
			return name.trim();
		})


		// uploading the book

		try{

			const uploadPath = `books/${user.uid}/${file.name}`

            const uploadedFile = await projectStorage.ref(uploadPath).put(file)

            const fileUrl = await uploadedFile.ref.getDownloadURL()  // getting the url of the file

			// console.log(fileUrl);

			let bookObj = {

				name : bookName,
				authorList : authorList,
				upvotes : 0,
				downvotes : 0,
				size : fileSize / 1e6, // size in MB
				reviews : [],
				fileUrl : fileUrl,
				uploadedBy : user.displayname
			}
			
		}
		catch(err){
			console.log(err);
		}


		


		// console.log(bookObj);
		console.log("submitted")

	}

	return (
		<div>
			<form className="book-form" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="bookName" className="form-label">Book Name :</label>
					<input
						type="text"
						className="form-control"
						id="bookName"
						aria-describedby="bookName"
						autoComplete="off"
						onChange={(e) => setBookName(e.target.value)}
						value={bookName}
						required
					/>
					<div id="authorName" className="form-text">(Please mention edition also)</div>
				</div>
				<div className="mb-3">
					<label htmlFor="authorName" className="form-label">Author name (s) :</label>
					<input
						type="text"
						className="form-control"
						id="authorName"
						aria-describedby="authorName"
						autoComplete="off"
						onChange={(e) => setAuthorNames(e.target.value)}
						value={authorNames}
						required
					/>
					<div id="authorName" className="form-text">(For multiple authors, write their names in comma separated fashion : author1,author2,author3)</div>
				</div>

				<div className="mb-3">
					<label htmlFor="bookFile" className="form-label">Upload PDF file</label>
					<input 
					className="form-control" 
					type="file" 
					id="bookFile"
					onChange={handleFileChange}
					required
					 />
				</div>

				<div style={{textAlign : "center"}}>
					{!fileError && <button type="submit" className="btn btn-primary">Submit</button>}
				</div>
			</form>

		</div>
	)
}

export default BookUpload