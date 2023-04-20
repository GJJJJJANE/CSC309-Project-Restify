import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useParams} from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel';
import Reserve from '../components/MakeReservation';
import Navbar from "../components/navbar";

const PropertyDetailPage = () => {
    const {id} = useParams()
    const [property, setProperty] = useState(null);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/property/${id}/detail/`).then(response => {
            setProperty(response.data);
        });
    }, [id]);
    
    if (!property) {
        return <div>Loading...</div>;
    }
    
    
    return (
    <div className="container mt-10">

        <Navbar />

        <div className="row my-5"></div>

        <div className="card mb-3">
            <div className="row g-3">
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">{property.title}</h2>
                        <p className="card-text">Place Location details here.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>

        <div className="card text-bg-dark align-item-center border-light" id="Pictures">
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src={property.photos} alt="First slide"/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img className="d-block w-100" src={require('../images/coverpage.jpeg')} alt="Second slide"/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img className="d-block w-100" src={require('../images/coverpage.jpeg')} alt="Third slide"/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

        <div className="row my-5"></div>

        <div className="row mt-5">
            
            <div className="col-md-6">
                <h1>{property.title}</h1>
            </div>

            <div className="col-md-6 text-end g-4">
                <Reserve id={id}/>
            </div>
            <hr className="mt-3"></hr> 
        </div>

        <div className="row">
            <div className="col-md-3">
                <h4>    {property.num_guest} guests   </h4>  
            </div>
            <div className="col-md-3">
                <h4>  {property.num_bedroom} bedrooms   </h4>
            </div>
            <div className="col-md-3">
                <h4>  {property.num_bathroom} baths    </h4>
            </div>
            <div className="col-md-3">
                <h1>$ {property.price}</h1> /person/night
                <h3>Available from </h3>
                <input type="date" className="form-control" value={property.start_date} />
                <h3>To </h3>
                <input type="date" className="form-control" value={property.end_date} />
            </div>
        </div>

        <div className="row mt-2">
            <div className="container p-4">
              <p>{property.description}</p>
            </div>
        </div>

        <div className="row mt-3">
            <div className="card p-4">
              <div className="card-body">
                <h5 className="card-title">ROOM DESCRIPTIONS</h5>
                <p className="card-text">{property.room_description}</p>
              </div>
            </div>
        </div>

        <div className="row mt-3 p-2">
            <div className="container">
                <h3>Amenities</h3>
                <div className="row row-cols-1 row-cols-md-3 mt-2 g-3">
                    <ul className="list-group text-start">
                        <li className="list-group-item"><h5>Essentials</h5></li>
                        <li className="list-group-item">{property.amen_essential}</li>
                    </ul> 
                    <ul className="list-group text-start">
                        <li className="list-group-item"><h5>Indoor</h5></li>
                        <li className="list-group-item">{property.amen_indoor}</li>
                    </ul> 
                    <ul className="list-group text-start">
                        <li className="list-group-item"><h5>Outdoor</h5></li>
                        <li className="list-group-item">{property.amen_outdoor}</li>
                    </ul> 
                </div>
            </div>
        </div> 

        <div className="row mt-3 p-2">
            <div className="container">
                <h5>Location</h5>
                <div className="row p-2">{property.location}</div>
            </div>
        </div> 

        <div className="row mt-3 p-2">
            <div className="container">
                <h5>Things to know</h5>
                <div className="row row-cols-1 row-cols-md-3 mt-2 g-2">

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">House rules</h5>
                        <p className="card-text">{property.house_rule}</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Safety&Property</h5>
                        <p className="card-text">{property.safety_rule}</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Cancellation policy</h5>
                        <p className="card-text">{property.cancellation_policy}</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>

                </div>
            </div>
        </div>

        <button className="btn btn-primary mt-5" type="button">Write My Own Review</button>

    </div>
  );
};

export default PropertyDetailPage;
