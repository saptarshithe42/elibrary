import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingAnimation from '../../components/LoadingAnimation'
import { projectFirestore } from '../../firebase/config'

// styles
import "./BookDetails.css"

function BookDetails() {

    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchBook = async () => {

            try {
                const docRef = projectFirestore.collection("books").doc(id)

                // fetching book
                let data = (await docRef.get()).data()

                setBook(data)
                setIsLoading(false)
            } catch (err) {

                setIsLoading(false)
                alert(err)

            }
        }

        // fetching book
        fetchBook();

    }, [])


    return (
        <div className="book-details">
            {isLoading ? <LoadingAnimation /> :
                <div style={{color : "white"}}>
                
                    {book.name}
                </div>

            }

        </div>
    )
}

export default BookDetails