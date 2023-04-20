import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { CardDeck } from 'reactstrap';
import { Col, Row} from "react-bootstrap";
//import ListProperty from "../components/listItem";
import CardProperty from "../components/searchCard";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    const endpoint = "http://localhost:8000/";

    const login = async (event) => {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password  = document.getElementById("password").value;

        var form = new FormData();
        form.append("email", email);
        form.append("password", password);
        
        await axios.post(`${endpoint}accounts/login/`, form)
        .then(response => {
            
            if (response.status == 200){
                const notif = document.getElementById("login_notification");
                notif.innerHTML = "";
                localStorage.setItem("access", response.data.access)
                localStorage.setItem("refresh", response.data.refresh)
                navigate("/viewProfile");
            }
            
        })
        .catch(function (error) {
            if (error.response.status == 400){
                const notif = document.getElementById("login_notification");
                notif.innerHTML = "Please enter email and password!";
            }
            if (error.response.status == 401){
                const notif = document.getElementById("login_notification");
                notif.innerHTML = "Email and password do not match!";
            }
        });
        // await axios.get(`${endpoint}reservations/guestview/`, {headers : {Authorization : `Bearer ${localStorage.getItem("access")}`}})
        // .then(response => {
            
        //     if (response.status == 200){
        //         today = today.getfullyear()
        //     }
            
        // })
        // .catch(function (error) {
        //     console.log(error)
        // });
    };


    return (

        <div>

        <Navbar />

        <div className="row my-5"></div>
        <div className="row my-5"></div>

        <div className="mycontainer">
            <form className="container-md">
                <div className="text-center">
                    <p className="fw-bold">Login into your account</p>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input type="email" id="email" className="form-control" />
                </div>
  
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" />
                </div>

                <div>
                    <p id='login_notification' style={{"color" : "red"}}></p>
                </div>

                <div className="form-outline mb-4">
                    <div className="col d-flex justify-content-center">
                        <button className="btn btn-block btn-primary" style={{"width": "100%"}} onClick={login}>Sign in</button>
                    </div>
                </div>
                <div className="text-center">
                    <p>Not a member? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>


        <div className="footer p-5 text-center">
            2023 Restify Inc.
        </div>

        </div>

    );
}

export default Login;
