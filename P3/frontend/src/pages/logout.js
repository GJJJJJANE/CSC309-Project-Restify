import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck, Form } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
//import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";
import Navbar from "../components/navbar";
import { useNavigate, Navigate} from "react-router-dom";
import { generateUploadURL } from "../components/generateImageURL";

function Logout() {

    const navigate = useNavigate();
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";

    if (refresh) {
        var form = new FormData();
        form.append("refresh_token", refresh);

        axios.post(`${endpoint}accounts/logout/`, form, {headers : {Authorization : `Bearer ${token}`}})
        .then(response => {
                
            if (response.status == 205){
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            }
            
        })
        .catch(function (error) {
            console.log(error)
        });

    }

    const login_nav = (event) => {
        event.preventDefault();

        navigate("/login");
    }

    if (refresh){
    return (
        <div>
        
        <Navbar />

        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="mycontainer">

            <div className="text-center">
                <img src="https://on-park-bucket.s3.ca-central-1.amazonaws.com/9329afe1037dc263" style={{"width" : "30%", "height": "30%"}}/>
            </div>

            <div className="text-center">
                <p className="fw-bold">You have been successfully logged out!</p>
            </div>

            <div></div>
            <div></div>

            <div className="text-center">
                <button type="button" className="btn btn-block btn-primary" onClick={login_nav} id="edit_btn" style={{"width" : "20%"}}>Login Again</button>
            </div>


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

export default Logout;