import React from 'react'

// styles
import "./BookCard.css"

// icons
import { BsDownload } from "react-icons/bs"
import { AiFillLike } from "react-icons/ai"
import { AiFillDislike } from "react-icons/ai"



function BookCard({ book }) {

    const iconTray = {
        fontSize : "1.5rem",
        display : "flex",
        justifyContent : "space-evenly"

    }


    return (

        <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-12 card-holder-div">
            <div className="card" style={{ width: "15rem", overflow: "hidden" }}>
                <img src={book.imgUrl} className="card-img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{book.name.slice(0, 30)}...</h5>
                    <p className="card-text">Authors : {
                        book.authorList.map((author, index) => {
                            return (<span key={index}>{author}. </span>)
                        })
                    }</p>
                    <p className="card-text">
                        Language : {book.language}
                    </p>
                    <span style={iconTray}>
                        <a href={`/book/${book.id}`} target="_blank">
                            <BsDownload size="1.5rem" />
                        </a>
                        <span>
                            <AiFillLike size="1.5rem" style={{ color: "green" }}
                             />
                            <span> {book.upvotes}</span>
                        </span>
                        <span>
                            <AiFillDislike size="1.5rem" style={{ color: "red" }} />
                            <span> {book.downvotes}</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default BookCard