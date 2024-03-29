import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";
import Navbar from "../components/navbar";
import Create from "./createPage";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);

    const token = localStorage.getItem("access")
    

    useEffect(() => {
        axios
        .get(`http://127.0.0.1:8000/listing_all/?page=${currentPage}`, {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
            setProperties(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 4));
            setTotal(response.data.count);
        })
        .catch(error => console.error(error));
    }, [currentPage]);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
        <Pagination.Item key={number} onClick={() => handlePageChange(number)} className={number === currentPage ? "active" : ""}>
            {number}
        </Pagination.Item>,);
    }

  

    return (
        <>
        <Navbar />
        <div class="row my-5"></div>

        <div className="container">

            <div className="row">
                <div className="col-md-3">
                    <h3>{total} Listings</h3>
                </div>
                <div className="d-none d-md-block col-md-6">
                    <h3> </h3>
                </div>
                <div className="col-md-3">
                    <Link to={`/create`}>
                        <Button variant="btn btn-outline-dark btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>   Create new listing   
                        </Button>
                    </Link>
                </div>
            </div>

            <br/>
            <br/>
             
            <div className="row">
            <div class="d-none d-md-block col-md-2">
                <p class="fs-6 text-primary fw-semibold font-monospace">cover</p>
            </div>
            <div class="d-none d-md-block col-md-5">
                <p class="fs-6 text-primary fw-semibold font-monospace">title</p>
            </div>
            <div class="d-none d-md-block col-md-3">
                <p class="fs-6 text-primary fw-semibold font-monospace">edit</p>
            </div>
            <div class="d-none d-md-block col-md-2">
                <p class="fs-6 text-primary fw-semibold font-monospace">delete</p>
            </div>
            <hr class="mt-2"/>
            </div>
            <div className="property-list">
                {properties.map(property => (<ListProperty key={property.id} property={property} />))}
                
                <Pagination className="d-flex justify-content-center">{items}</Pagination>
            </div>
        </div>

        
        </>
  );
}

export default PropertyList;
