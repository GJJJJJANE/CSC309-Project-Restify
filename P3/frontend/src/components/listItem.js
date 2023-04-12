import React, { useState, useEffect } from "react";
import axios from "axios";


function ListProperty({ property }) {
    return (
        <div className="row">
            <div className="col-md-2">
                <img src={require('../images/coverpage.jpeg')} class="img-fluid img-thumbnail" alt="..."/>
            </div>
            <div className="col-md-5 my-4">
                
                <h5>{property.title}</h5>
                
            </div>
            <div class="col-md-3 my-4">
                <a class="btn btn-outline-dark" href="edit_listing.html" role="button">Edit</a>
            </div>
            <div class="col-md-2 my-4">
                <a class="btn btn-outline-dark" href="edit_listing.html" role="button">Delete</a>
            </div>
            <br />
            <div class="row my-3"></div>
        </div>

    );
}
export default ListProperty;