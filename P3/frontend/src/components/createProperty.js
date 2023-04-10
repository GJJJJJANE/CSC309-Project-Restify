import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Col, Row, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
//import Multiselect from 'react-bootstrap-multiselect'



const CreatePropertyForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [roomdes, setRoomdes] = useState("");
    const [location, setLocation] = useState("");
    const [numGuests, setNumGuests] = useState(0);
    const [numBeds, setNumBeds] = useState(0);
    const [numBaths, setNumBaths] = useState(0);
    const [amenities, setAmenities] = useState("");
    const [price, setPrice] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !numGuests) {
          alert("Please fill in all fields.");
          return;
        }
        const propertyData = new FormData();
        propertyData.append("title", title);
        propertyData.append("num_guests", numGuests);
        //formData.append("amenities", amenities);
        //images.forEach((image) => formData.append("images", image));
        try {
          const response = await axios.post("", propertyData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
    };
  
    return (
    <div class="container px-5">
    <form onSubmit={handleSubmit}>
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
                <input type="text" class="form-control" id="title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Enter your listing title..." value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
        </div>

        <div class="justify-content-md-center">
            <div class="justify-content-md-center">
                <br/>
                <br/>
                  <h4>Listing Details</h4>
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
                    <textarea class="form-control" id="description" rows="6" placeholder="Describe your property..." value={description} onChange={(event) => setDescription(event.target.value)} />
                  </div>

                  <h4>Basics</h4>
                    <hr class="mt-2"/>
                    <br/>
                    <h5>Location</h5>
                    <br/>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="location">Enter your location</span>
                        <input type="text" class="form-control" value={location} onChange={(event) => setLocation(event.target.value)} />
                    </div>

                    <h5>Number of Guests</h5>
                    <br/>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" value={numGuests} onChange={(event) => setNumGuests(event.target.value)} />
                        <span class="input-group-text" id="people">people</span>
                    </div>
                    <br/>
                    <h5>Rooms</h5>
                    <div class="row">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value={numBeds} onChange={(event) => setNumBeds(event.target.value)} />
                            <span class="input-group-text" id="bed">bedrooms</span>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value={numBaths} onChange={(event) => setNumBaths(event.target.value)} />
                            <span class="input-group-text" id="bath">bathrooms</span>
                        </div>
                    </div>
                    <br/>
                    <div class="mb-3">
                        <label for="roomdescription" class="form-label">More description for rooms</label>
                        <textarea class="form-control" id="rromdescription" rows="4" placeholder="Describe your rooms..." value={roomdes} onChange={(event) => setRoomdes(event.target.value)} />
                    </div>

                    <h4>Amenities</h4>
                    <hr class="mt-2"/>
                    <br/>
                    <h5>Essentials</h5>
                    <ToggleButtonGroup type="checkbox">
                        <ToggleButton value={1}>Option 1</ToggleButton>
                        <ToggleButton value={2}>Option 2</ToggleButton>
                        <ToggleButton value={3}>Option 3</ToggleButton>
                    </ToggleButtonGroup>
                    <h5>Indoor</h5>
                    <ToggleButtonGroup type="checkbox">
                        <ToggleButton value={1}>Option 1</ToggleButton>
                        <ToggleButton value={2}>Option 2</ToggleButton>
                        <ToggleButton value={3}>Option 3</ToggleButton>
                    </ToggleButtonGroup>
                    <h5>Outdoor</h5>
                    <ToggleButtonGroup type="checkbox">
                        <ToggleButton value={1}>Option 1</ToggleButton>
                        <ToggleButton value={2}>Option 2</ToggleButton>
                        <ToggleButton value={3}>Option 3</ToggleButton>
                    </ToggleButtonGroup>
                    <br/>
                    <br/>
                    <br/>

                    <h4>Pricing and Availability</h4>
                    <hr class="mt-2"/>
                    <br/>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="price" class="form-label">Price   </label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="text" class="form-control" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="from" class="form-label">Available start from</label>
                            <input type="date" class="form-control" id="from" value={start} onChange={(event) => setStart(event.target.value)} />
                        </div>
                        <div class="col-md-4">
                            <label for="to" class="form-label">To</label>
                            <input type="date" class="form-control" id="to" value={end} onChange={(event) => setEnd(event.target.value)} />
                        </div>
                    </div>
                    <br/>
                    <br/>

                    <h4>Things to know</h4>
                    <hr class="mt-2"/>
                    <br/>
                    <h5>House rules</h5>
                    <div class="mb-3">
                        <textarea class="form-control" id="description" rows="4"></textarea>
                    </div>
                    <h5>Cancellation policy</h5>
                    <div class="mb-3">
                        <textarea class="form-control" id="description" rows="4"></textarea>
                    </div>
            </div>
        </div>
        <div class="row my-5"></div>
        <input class="btn btn-primary" type="submit" />
        <div class="row my-5"></div>
    </form>

    </div>
  );
};

export default CreatePropertyForm;
