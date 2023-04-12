import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardProperty({ property }) {
    return (
        <Col>
        <Card>
            <Card.Img variant="top" src={require('../images/coverpage.jpeg')} />
            <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description} </Card.Text>
                <Card.Text><h3>${property.price}</h3> <small>(person/night)</small></Card.Text>
                <Button variant="primary">Details</Button>
            </Card.Body>
        </Card>
        </Col>
    );
}
export default CardProperty;