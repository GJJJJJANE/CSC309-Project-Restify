import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
//import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";
import Navbar from "../components/navbar";


function SearchList(props) {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    

    useEffect(() => {
        let parameters = {
            keyword: props.keyword,
            num_bedroom: props.bed,
            num_bathroom: props.bath,
            num_guest: props.guest,
            order_by: props.order
        };
      
        if (props.date !== 'yyyy-mm-dd') {
            parameters.available_date = props.date;
        }
        axios
        .get(`http://127.0.0.1:8000/search_result/?page=${currentPage}`, 
            {params: parameters})
        .then(response => {
            setProperties(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 6));
        })
        .catch(error => console.error(error));
    }, [currentPage, props.keyword, props.date, props.bed, props.bath, props.guest, props.order]);

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
            <hr className="mt-2"/>
            
            <div className="property-list">
                <Row xs={2} md={3} className="g-4">
                    {properties.map(property => (<CardProperty key={property.id} property={property} />))}
                </Row>
                <div className="row my-3"></div>
                <Pagination className="d-flex justify-content-center">{items}</Pagination>
            </div>
            <div className="row my-3"> </div>
        </div>

  );
}

export default SearchList;
