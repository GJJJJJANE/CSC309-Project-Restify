import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function ListProperty({ property }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const token = localStorage.getItem("access");
 
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/property/${property.id}/delete/`, {headers : {Authorization : `Bearer ${token}`}})
          .then(() => 
            window.location.reload())
          .catch(error => console.log(error));
    }


    return (
        <div className="row">
            <div className="col-md-2">
                <img src={property.photos} class="img-fluid img-thumbnail" height={50}/>
            </div>
            <div className="col-md-5 my-4">
                
                <h5>{property.title}</h5>
                
            </div>
            <div class="col-md-3 my-4">
                <Link to={`/edit/${property.id}`}>
                    <Button variant="outline-dark">Edit details</Button>
                </Link>
            </div>
            <div class="col-md-2 my-4">
                <Button variant="outline-dark" onClick={() => setShowConfirm(true)}>Delete</Button>
                {showConfirm && (
                <div>
                    <p>Are you sure you want to delete this property?</p>
                    <Button variant="primary" onClick={handleDelete}>Yes</Button>
                    <Button variant="outline-dark" onClick={() => setShowConfirm(false)}>No</Button>
                </div>
                )}
            </div>
            <br />
            <div class="row my-3"></div>
        </div>

    );
}
export default ListProperty;