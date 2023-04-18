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

function EditPassword() {

    const navigate = useNavigate();
    const token = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";


    const submitHandler = async (event) => {
        
        event.preventDefault();

        var pass = true;
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm").value;
        const password_notification = document.getElementById("password_notification");
        const confirm_notification = document.getElementById("confirm_notification");

        if (password != confirm){
            confirm_notification.innerHTML = 'Passwords do not match!';
            pass=false;
        } else {
            confirm_notification.innerHTML = '';
        }
        if (password.length < 8 || password.length > 16 || password==''){
            password_notification.innerHTML = 'Password must be between 8-16!';
            pass=false;
        } else {
            password_notification.innerHTML = '';
        }
        
        if (pass){
        var form = new FormData;
        form.append("password", password);
        form.append("password_confirm", confirm);

        await axios.patch(`${endpoint}accounts/password/edit/`, form, {headers : {Authorization : `Bearer ${token}`}})
            .then(response => {
                
                if (response.status == 200){
                    navigate("/login");
                }
                
            })
            .catch(function (error) {
                console.log(error)
            });
        }

        return
    }
    

    if (token) {
        return (
        <div>
        
        <Navbar />

        <div className="row my-5"></div>
        <div className="row my-5"></div>
            
        <div className="mycontainer">
            <form className="container-md">
                <div className="text-center">
                    <p className="fw-bold">Edit Password</p>
                </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Password</label>
                <input type="password" id="password" className="form-control" />
                <p id="password_notification" style={{ "color" : "red" }}></p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Confirm Password</label>
                <input type="password" id="confirm" className="form-control" />
                <p id="confirm_notification" style={{ "color" : "red" }}></p>
            </div>
  
            <div className="form-outline mb-4">
                <button type="button" className="btn btn-block btn-primary" onClick={submitHandler} style={{ "width" : "100%" }}>Edit Password</button>
            </div>

            </form>
        </div>

        <div className="footer p-5 text-center">
            2023 Restify Inc.
        </div>


        </div>
        );
    } else {
        return <Navigate to="/login" />;
    }

}

export default EditPassword;