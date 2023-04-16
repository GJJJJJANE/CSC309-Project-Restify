import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function CardProperty({ property }) {
    return (
        <Col>
        <Card>
            <Card.Img variant="top" height={250} src={property.photos} />
            <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description} </Card.Text>
                <Card.Text><h3>${property.price}</h3> <small>(person/night)</small></Card.Text>
                <Link to={`/properties/${property.id}`}>
                    <Button variant="primary">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
        </Col>
    );
}
export default CardProperty;