import React from "react"
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectStorage, projectFirestore, timestamp } from "../../firebase/config"
import { useNavigate } from "react-router-dom"

// styles
import "./BookUpload.css"

// components
import LoadingAnimation from "../../components/LoadingAnimation"

function BookUpload() {
	const [file, setFile] = useState(null)
	const [fileError, setFileError] = useState(null)
	const [thumbnail, setThumbnail] = useState(null)
	const [thumbnailError, setThumbnailError] = useState(null)
	const [fileSize, setFileSize] = useState(0)
	const [bookName, setBookName] = useState("")
	const [authorNames, setAuthorNames] = useState("")
	const [language, setLanguage] = useState("")
	const [description, setDescription] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const { user } = useAuthContext()

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

	const handleThumbnailChange = (e) => {

		// to reset any selected image
		setThumbnail(null)

		let selected = e.target.files[0]  // selecting first element of array of files
		console.log(selected)

		if (!selected) {
			setThumbnailError("Please select a file")
			return
		}

		if (!selected.type.includes("image")) {
			alert("selected file must be an image");
			setThumbnailError("selected file must be an image")
			return
		}

		// in case of no error
		setThumbnailError(null)

		setThumbnail(selected)
		console.log("thumbnail updated")
	}

	const handleSubmit = async (e) => {

		e.preventDefault()

		setIsLoading(true)

		// forming an array of author names
		let authorList = authorNames.split(",")
		authorList = authorList.map((name) => {
			return (name.trim()).toUpperCase();
		})

		// uploading data

		try {

			// uploading pdf file
			const fileUploadPath = `books/${user.uid}/${file.name}`

			const uploadedFile = await projectStorage.ref(fileUploadPath).put(file)

			const fileUrl = await uploadedFile.ref.getDownloadURL()  // getting the url of the file

			// uploading thumbnail
			const imgUploadPath = `thumbnails/${user.uid}/${thumbnail.name}`

            const img = await projectStorage.ref(imgUploadPath).put(thumbnail)

            const imgUrl = await img.ref.getDownloadURL()  // getting the url of the image

			// console.log(fileUrl);

			// book document to be written into "books" collection
			let bookObj = {

				name: (bookName.trim()).toUpperCase(),
				authorList: authorList,
				upvotes: 0,
				downvotes: 0,
				size: fileSize / 1e6, // size in MB
				fileUrl: fileUrl,
				uploadedBy: user.displayName,
				imgUrl : imgUrl,
				uploadedAt : timestamp.fromDate(new Date()),
				language : (language.trim()).toUpperCase(),
				downloads : 0,
				description : description.trim()
			}

			const addedBook = await projectFirestore.collection("books").add(bookObj)
			const userRef = projectFirestore.collection("users").doc(user.uid);

			// entry to be made in user's uploadedBooks list
			let uploadedArr = (await userRef.get()).data().uploadedBooks


			uploadedArr.push(addedBook.id)
			// adding currently created book ID in uploadedBooks array in user's document
			await userRef.update({
				uploadedBooks: uploadedArr
			})

			setIsLoading(false)
			// console.log(bookObj);
			navigate("/")
		}
		catch (err) {
			console.log(err);
		}





		// console.log(bookObj);
		console.log("submitted")

	}

	return (
		<div>
			{isLoading ? <LoadingAnimation /> :  <form className="book-form" onSubmit={handleSubmit}>
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
					<label htmlFor="language" className="form-label">Language :</label>
					<input
						type="text"
						className="form-control"
						id="language"
						aria-describedby="language"
						autoComplete="off"
						onChange={(e) => setLanguage(e.target.value)}
						value={language}
						required
					/>
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

				<div className="mb-3">
					<label htmlFor="imgFile" className="form-label">Upload thumbnail (image) :</label>
					<input
						className="form-control"
						type="file"
						id="imgFile"
						onChange={handleThumbnailChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">Description :</label>
					<textarea
						className="form-control"
						id="description"
						aria-describedby="description"
						autoComplete="off"
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						required
					/>

				</div>

				<div style={{ textAlign: "center" }}>
					{!fileError && !thumbnailError && !isLoading  && <button type="submit" className="btn btn-primary">Submit</button>}

				</div>
			</form>
}
		</div>
	)
}

export default BookUpload