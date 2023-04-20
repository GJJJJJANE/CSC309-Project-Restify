import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
//import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";
import Navbar from "../components/navbar";
import { useNavigate, Navigate} from "react-router-dom";
import { generateUploadURL } from "../components/generateImageURL";

function ViewProfile() {

    const navigate = useNavigate();
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {

        axios.get(`${endpoint}accounts/profile/`, {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {   
        if (response.status == 200){
            setUsername(response.data.username);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setPhone(response.data.phone_number);
            setAvatar(response.data.avatar);
        }
        })
        .catch(function (error) {
            console.log(error)
        });
    }, [])

    const edit_profile = (event) => {
        event.preventDefault();
        navigate("/editProfile");
        return 
    }

    const edit_password = (event) => {
        event.preventDefault();
        navigate("/editPassword");
        return
    }

    if (refresh) {
        return (
        <div>
        
        <Navbar />

        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="mycontainer">

            <form className="container-md">
                <div className="text-center">
                    <p className="fw-bold">My Profile</p>
                </div>

            <div className="form-outline mb-4 text-center">
                <img src={avatar} alt="avatar" className="avatar" id="avatar1" style={{"width" : "100px", "height" : "100px"}}/>
            </div>

            <div className="form-outline mb-4">
                <p className="form-label" htmlFor="form2Example1">Username</p>
                <div></div>
                <p className="form-label" htmlFor="form2Example1">{username}</p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">First Name</label>
                <div></div>
                <label className="form-label" id="display_text1" htmlFor="form2Example1">{firstName}</label>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Last Name</label>
                <div></div>
                <label className="form-label" id="display_text2" htmlFor="form2Example1">{LastName}</label>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Phone Number</label>
                <div></div>
                <label className="form-label" id="display_text3" htmlFor="form2Example2">{phone}</label>
            </div>

            <div className="form-outline mb-4">
                <button type="button" className="btn btn-block btn-primary" onClick={edit_profile} id="edit_btn" style={{"width" : "100%"}}>Edit Profile</button>
            </div>

            <div className="form-outline mb-4">
                <button type="button" className="btn btn-block btn-primary" onClick={edit_password} id="edit_btn" style={{"width" : "100%"}}>Edit Password</button>
            </div>

            </form>


        </div>
        <div className="footer p-5 text-center">
            2023 Restify Inc.
        </div>


        </div>
        )
    } else {
        return <Navigate to="/login" />;
    }
}

export default ViewProfile;