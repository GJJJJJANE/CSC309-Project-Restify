import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const EditPropertyForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [roomdes, setRoomdes] = useState("");
    const [location, setLocation] = useState("");
    const [numGuests, setNumGuests] = useState(0);
    const [numBeds, setNumBeds] = useState(0);
    const [numBaths, setNumBaths] = useState(0);
    const [amen_e, setAmen_e] = useState("");        
    const [amen_i, setAmen_i] = useState("");    
    const [amen_o, setAmen_o] = useState("");    
    const [price, setPrice] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [hrule, setHrule] = useState("");
    const [srule, setSrule] = useState("");
    const [cpolicy, setCpolicy] = useState("");
    
    const {id} = useParams()
    const token = localStorage.getItem("access");

    useEffect(() => {
        // input property id
        axios.get(`http://127.0.0.1:8000/property/${id}/detail/`)
          .then(response => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setPhoto(response.data.photos);
            setLocation(response.data.location);
            setRoomdes(response.data.room_description);
            setNumGuests(response.data.num_guest);
            setNumBeds(response.data.num_bedroom);
            setNumBaths(response.data.num_bathroom);
            setAmen_e(response.data.amen_essential);
            setAmen_i(response.data.amen_indoor);
            setAmen_o(response.data.amen_outdoor);
            setPrice(response.data.price);
            setStart(response.data.start_date);
            setEnd(response.data.end_date);
            setHrule(response.data.house_rule);
            setSrule(response.data.safety_rule);
            setCpolicy(response.data.cancellation_policy);
          })
          .catch(error => {
            console.log(error);
          });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title ) {
          alert("Please fill in all fields.");
          return;
        }
        const propertyData = new FormData();
        propertyData.append("title", title);
        propertyData.append("description", description);
        propertyData.append("photos", photo); //change
        propertyData.append("location", location);
        propertyData.append("num_guest", numGuests);
        propertyData.append("num_bedroom", numBeds);
        propertyData.append("num_bathroom", numBaths);
        propertyData.append("room_description", roomdes);
        propertyData.append("amen_essential", amen_e); //change
        propertyData.append("amen_indoor", amen_i); //change
        propertyData.append("amen_outdoor", amen_o); //change
        propertyData.append("house_rule", hrule);
        propertyData.append("safety_rule", srule);
        propertyData.append("cancellation_policy", cpolicy);
        propertyData.append("start_date", start);
        propertyData.append("end_date", end);
        propertyData.append("price", price);
        
        
        try {
          const response = await axios.patch(`http://localhost:8000/property/${id}/edit/`, propertyData, {
            headers: {
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                "Access-Control-Allow-Credentials": 'true',
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
    };
  
    return (
    <div className="container px-5">
    <form onSubmit={handleSubmit}>
        <div className ="row">
            <div className ="col-md-5 ms-5 mt-5">
                <h1>   </h1>
                <h1>   </h1>
                <h1>Edit </h1>
                <h1>Your </h1>
                <h1>Property Listing</h1>
            </div>

            <div className ="col-md-6">
            <img src={require('../images/edit.jpg')} className="img-fluid" alt="..."/>
            </div>
        </div>

        <div className ="row">
            <div className ="col-md-2 my-4">
                <br/>
                <h4>Listing Title</h4>
            </div>
            
            <div className ="input-group-lg col-md-10 my-5">
                <input type="text" className ="form-control" id="title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Enter your listing title..." value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
        </div>

        <div className ="justify-content-md-center">
            <div className ="justify-content-md-center">
                <br/>
                <br/>
                  <h4>Listing Details</h4>
                <hr className ="mt-2"/>
                  <h4>Photos</h4>
                  <br/>

                  <h5>Cover page</h5>
                  <br/>
                  <div className ="container">
                    <div className ="row">
                        <div className ="col-md-12 imgUp" id="coverphoto">
                            <img src={photo} style={{"width" : "100%", "height" : "480px"}} />
                            <label className ="btn btn-outline-secondary">Upload<input type="file" className="uploadFile img"/></label>
                        </div>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>

                  <h5>Second & Third slides</h5>
                  <br/>
                  <div className ="container">
                    <div className ="row">
                        <div className ="col-md-6 imgUp">
                            <div className ="imagePreview"></div>
                            <label className ="btn btn-outline-secondary">Upload<input type="file" className="uploadFile img"/></label>
                        </div>
                        <div className ="col-md-6 imgUp">
                            <div className ="imagePreview"></div>
                            <label className ="btn btn-outline-secondary">Upload<input type="file" className="uploadFile img"/></label>
                        </div>
                    </div>
                  </div>
                  <br/>
                  <br/>

                  <h4>Description</h4>
                  <br/>
                  <div className="mb-3">
                    <textarea className="form-control" id="description" rows="6" placeholder="Describe your property..." value={description} onChange={(event) => setDescription(event.target.value)} />
                  </div>

                  <h4>Basics</h4>
                    <hr className="mt-2"/>
                    <br/>
                    <h5>Location</h5>
                    <br/>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="location">Enter your location</span>
                        <input type="text" className="form-control" value={location} onChange={(event) => setLocation(event.target.value)} />
                    </div>

                    <h5>Number of Guests</h5>
                    <br/>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={numGuests} onChange={(event) => setNumGuests(event.target.value)} />
                        <span className="input-group-text" id="people">people</span>
                    </div>
                    <br/>
                    <h5>Rooms</h5>
                    <div className="row">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={numBeds} onChange={(event) => setNumBeds(event.target.value)} />
                            <span className="input-group-text" id="bed">bedrooms</span>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={numBaths} onChange={(event) => setNumBaths(event.target.value)} />
                            <span className="input-group-text" id="bath">bathrooms</span>
                        </div>
                    </div>
                    <br/>
                    <div className="mb-3">
                        <label htmlFor="roomdescription" className="form-label">More description for rooms</label>
                        <textarea className="form-control" id="rromdescription" rows="4" placeholder="Describe your rooms..." value={roomdes} onChange={(event) => setRoomdes(event.target.value)} />
                    </div>

                    <h4>Amenities</h4>
                    <hr className="mt-2"/>
                    <br/>
                    <h5>Essentials</h5>
                    <textarea className="form-control" id="amen_e" rows="2" value={amen_e} onChange={(event) => setAmen_e(event.target.value)} />
                    <h5>Indoor</h5>
                    <textarea className="form-control" id="amen_i" rows="2" value={amen_i} onChange={(event) => setAmen_i(event.target.value)} />
                    <h5>Outdoor</h5>
                    <textarea className="form-control" id="amen_o" rows="2" value={amen_o} onChange={(event) => setAmen_o(event.target.value)} />
                    <br/>
                    <br/>
                    <br/>

                    <h4>Pricing and Availability</h4>
                    <hr className="mt-2"/>
                    <br/>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="price" className="form-label">Price   </label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input type="text" className="form-control" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="from" className="form-label">Available start from</label>
                            <input type="date" className="form-control" id="from" value={start} onChange={(event) => setStart(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="to" className="form-label">To</label>
                            <input type="date" className="form-control" id="to" value={end} onChange={(event) => setEnd(event.target.value)} />
                        </div>
                    </div>
                    <br/>
                    <br/>

                    <h4>Things to know</h4>
                    <hr className="mt-2"/>
                    <br/>
                    <h5>House rules</h5>
                    <div className="mb-3">
                        <textarea className="form-control" id="description" rows="4" value={hrule} onChange={(event) => setHrule(event.target.value)} />
                    </div>
                    <h5>Safety rules</h5>
                    <div className="mb-3">
                        <textarea className="form-control" id="description" rows="4" value={srule} onChange={(event) => setSrule(event.target.value)} />
                    </div>
                    <h5>Cancellation policy</h5>
                    <div className="mb-3">
                        <textarea className="form-control" id="description" rows="4" value={cpolicy} onChange={(event) => setCpolicy(event.target.value)} />
                    </div>
            </div>
        </div>
        <div className="row my-5"></div>
        <div className="d-flex justify-content-center">
            <input className="btn btn-primary" type="submit" />
            <Link to={`/list`}>
                <Button variant="outline-dark">Cancel</Button>
            </Link>
        </div>
        <div className="row my-5"></div>
    </form>
        <div className="footer p-5 text-center">
            2023 Restify Inc.
        </div>
    </div>
  );
};

export default EditPropertyForm;
