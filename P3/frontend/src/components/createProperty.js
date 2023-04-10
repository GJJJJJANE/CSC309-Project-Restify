import React, { useState } from "react";
import axios from "axios";
//import { Form, Button, Container, Col, Row } from "react-bootstrap";

const CreatePropertyForm = () => {
  
  return (
    <>
    <div class="container px-5">
        <div class ="row">
            <div class="col-md-5 ms-5 mt-5">
                <h1>   </h1>
                <h1>   </h1>
                <h1>Create</h1>
                <h1>Your New</h1>
                <h1>Property Listing</h1>
            </div>

            <div class="col-md-6">
            <img src={require('../images/housing.jpg')} class="img-fluid" alt="..."/>
            </div>
        </div>

        <div class="row">
            <div class="col-md-2 my-4">
                <br/>
                <h4>Listing Title</h4>
            </div>
            
            <div class="input-group-lg col-md-10 my-5">
                <input type="text" class="form-control" id="title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Enter your listing title..." />
            </div>
        </div>

        <div class="justify-content-md-center">
            <div class="justify-content-md-center">
                <br/>
                <br/>
                  <h3>Listing Details</h3>
                <hr class="mt-2"/>
                  <h4>Photos</h4>
                  <br/>

                  <h5>Cover page</h5>
                  <br/>
                  <div class="container">
                    <div class="row">
                        <div class="col-md-12 imgUp" id="coverphoto">
                            <div class="imagePreview" id="coverphoto"></div>
                            <label class="btn btn-outline-secondary">Upload<input type="file" class="uploadFile img"/></label>
                        </div>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <br/>

                  <h5>Second & Third slides</h5>
                  <br/>
                  <div class="container">
                    <div class="row">
                        <div class="col-md-6 imgUp">
                            <div class="imagePreview"></div>
                            <label class="btn btn-outline-secondary">Upload<input type="file" class="uploadFile img"/></label>
                        </div>
                        <div class="col-md-6 imgUp">
                            <div class="imagePreview"></div>
                            <label class="btn btn-outline-secondary">Upload<input type="file" class="uploadFile img"/></label>
                        </div>
                    </div>
                  </div>
                  <br/>
                  <br/>

                  <h4>Description</h4>
                  <br/>
                  <div class="mb-3">
                    <textarea class="form-control" id="description" rows="8" placeholder="Describe your property..."></textarea>
                  </div>

                  <h4>Basics</h4>
                    <hr class="mt-2"/>
                    <br/>
                    <h5>Location</h5>
                    <br/>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="country">Country / Region</span>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="city">City</span>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="street">Street</span>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="apt">Apt, Suite (optional)</span>
                        <input type="text" class="form-control"/>
                    </div>

                    <h5>Number of Guests</h5>
                    <br/>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control"/>
                        <span class="input-group-text" id="people">people</span>
                    </div>
                    <br/>
                    <h5>Rooms</h5>
                    <br/>
                    <br/>
                    
                    
            </div>


        </div>
    </div>

    </>
  );
};

export default CreatePropertyForm;
