import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";


function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const token = localStorage.getItem("access")
    

    useEffect(() => {
        axios
        .get(`http://127.0.0.1:8000/listing_all/?page=${currentPage}`, {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
            setProperties(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 6));
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
        <div className="container">
             
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
  );
}

export default PropertyList;
