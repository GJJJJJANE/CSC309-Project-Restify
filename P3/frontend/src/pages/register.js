import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
//import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const endpoint = "http://localhost:8000/";
    var mailformat = /^[a-zA-Z0-9]+([\.!+%][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,3})+$/;

    const checkEmail = (email) => {
        var emailForm = new FormData();
            emailForm.append("email", email)
            axios.post(`${endpoint}accounts/checkEmail/`, emailForm).then(response => {
                if (response.data[0] != "true"){
                    return false;
                }
            });
        return true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        var pass = true;

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm").value;

        const email_notification = document.getElementById("email_notification");
        const confirm_notification = document.getElementById("confirm_notification");
        const password_notification = document.getElementById("password_notification");
        
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

        if (email.match(mailformat) && email != ''){
            if (!checkEmail(email)) {
                pass = false;
                email_notification.innerHTML = "Email already been used!";
            } else {
                email_notification.innerHTML='';
            }
        } else {
            email_notification.innerHTML = "Please enter a valid email!";
            pass=false;
        }
        
        if (pass){
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            navigate(`/createProfile`);
            return
        }
        return
        
    };

    return (

        <div>
        
        <Navbar />


        <div className="row my-5"></div>
        <div className="row my-5"></div>

        <div className="mycontainer">
    
            <form className="container-md">
                <div className="text-center">
                    <p className="fw-bold">Create an account</p>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input type="email" id="email" className="form-control"/>
                    <p id="email_notification" style={{"color" : "red"}}></p>
                </div>
            
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" />
                    <p id="password_notification" style={{"color" : "red"}}></p>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirm">Confirm Password</label>
                    <input type="password" id="confirm" className="form-control" />
                    <p id="confirm_notification" style={{"color" : "red"}}></p>
                </div>
            
                <div className="form-outline mb-4">
                    <button type="button" className="btn btn-block btn-primary" style={{ "width" : "100%" }} onClick={submitHandler}>Sign Up</button>
                </div>

                <div className="text-center">
                <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            
            </form>
        </div>

        <div className="footer p-5 text-center">
            2023 Restify Inc.
        </div>


        </div>

    );
}

export default Register;
