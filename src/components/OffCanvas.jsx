import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import ProfilePicture from './ProfilePicture'

// styles
import "./OffCanvas.css"
import { NavLink } from 'react-router-dom'

// icons
import { AiOutlineStar } from 'react-icons/ai'
import { AiOutlineUpload } from 'react-icons/ai'
import { AiOutlineDownload } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'

function OffCanvas() {

    const { user } = useAuthContext()

    const closeBtnStyle = {
        marginLeft: "auto",
        marginTop: "1rem",
        marginRight: "1rem",
        backgroundColor: "white"
    }

    return (
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <button type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={closeBtnStyle}
            ></button>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                    <ProfilePicture
                        src={user.photoURL}
                        displayName={user.displayName}
                    />
                    {/* <p>{user.displayName}</p> */}
                </h5>
            </div>

            <div className="offcanvas-body">
                <ul className="offcanvas-options-list">
                    <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                        <NavLink to="/" className="nav-link-item">
                            <AiOutlineHome className="offcanvas-icons" />  Dashboard
                        </NavLink>
                    </li>
                    <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                        <NavLink to="/favourites" className="nav-link-item">
                            <AiOutlineStar className="offcanvas-icons" />   Favourites
                        </NavLink>
                    </li>
                    <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                        <NavLink to="/uploaded_books" className="nav-link-item">
                            <AiOutlineUpload className="offcanvas-icons" />  Uploaded Books
                        </NavLink>
                    </li>
                    <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                        <NavLink to="/downloaded_books" className="nav-link-item">
                            <AiOutlineDownload className="offcanvas-icons" />  Downloaded Books
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default OffCanvas