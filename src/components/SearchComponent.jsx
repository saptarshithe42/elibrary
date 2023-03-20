import React from "react"

// styles
import "./SearchComponent.css"

// components
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

function SearchComponent() {
    return (
        <div className="search-component">
            <Form className="search-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Button variant="primary" type="submit" className="search-btn">
                    Search
                </Button>
            </Form>

        </div>
    )
}

export default SearchComponent