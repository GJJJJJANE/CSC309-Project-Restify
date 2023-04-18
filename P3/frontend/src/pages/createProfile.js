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

function CreateProfile() {

    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const endpoint = "http://localhost:8000/";
    const [image, setImage] = useState("https://on-park-bucket.s3.ca-central-1.amazonaws.com/6d75d98e235bd7e8");

    const imageHandler = async (event) => {
        event.preventDefault();
        if (event.target.files.length != 0) {
 
            var img_file = event.target.files[0];
            var display_src =  URL.createObjectURL(event.target.files[0]);
            const url = await generateUploadURL();

            fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                body: img_file
            });

            var uploadUrl = url.split('?')[0];
            setImage(uploadUrl);
            console.log(uploadUrl);

            const avatar = document.getElementById("avatar");
            avatar.src = display_src;
        }
        return
    }

    const submitHandler = async (event) => {
        
        event.preventDefault();

        var if_pass = true;
        const username = document.getElementById("username").value;
        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const phone = document.getElementById("phone").value;
        const phone_notification = document.getElementById("phone_notification");
        const username_notification = document.getElementById("username_notification");
        const first_name_notification = document.getElementById("first_name_notification");
        const last_name_notification = document.getElementById("last_name_notification");

        try{
            parseInt(phone);
        } catch (error) {
            phone_notification.innerHTML = "Please enter correct phone number";
            if_pass = false;
        };
        if (username == ''){
            username_notification.innerHTML = "Username can not be empty";
            if_pass = false;
        }
        if (first_name == ''){
            first_name_notification.innerHTML = "First name can not be empty";
            if_pass = false;
        }
        if (last_name == ''){
            last_name_notification.innerHTML = "Last name can not be empty";
            if_pass = false;
        }
        if (phone.length != 10){
            phone_notification.innerHTML = "Please enter correct phone number";
            if_pass = false;
        }

        if (if_pass){
            phone_notification.innerHTML = "";
            username_notification.innerHTML = "";
            first_name_notification.innerHTML = "";
            last_name_notification.innerHTML = "";

            var form = new FormData();
            form.append("email", email);
            form.append("password", password);
            form.append("password_confirm", password);
            form.append("username", username);
            form.append("first_name", first_name);
            form.append("last_name", last_name);
            form.append("avatar", image);
            form.append("phone_number", phone);

            await axios.post(`${endpoint}accounts/register/`, form)
            .then(response => {
                
                if (response.status == 200){
                    navigate("/login");
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                }
                
            })
            .catch(function (error) {
                console.log(error)
            });
        }
        return
    }

    if (email) {
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
                <input type="file" id="actual-btn" onChange={imageHandler} accept="image/*" hidden/> 
                <label htmlFor="actual-btn">
                    <img src="https://on-park-bucket.s3.ca-central-1.amazonaws.com/6d75d98e235bd7e8" alt="avatar" style={{"width" : "100px", "height" : "100px"}} className="avatar" id="avatar" />
                </label>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Username</label>
                <input type="email" id="username" className="form-control" />
                <p id="username_notification" style={{ "color" : "red" }}></p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">First Name</label>
                <input type="email" id="first_name" className="form-control" />
                <p id="first_name_notification" style={{ "color" : "red" }}></p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Last Name</label>
                <input type="email" id="last_name" className="form-control" />
                <p id="last_name_notification" style={{ "color" : "red" }}></p>
            </div>
  
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Phone Number</label>
                <input type="phone" id="phone" className="form-control" />
                <p id="phone_notification" style={{ "color" : "red" }}></p>
            </div>
  
            <div className="form-outline mb-4">
                <button type="button" className="btn btn-block btn-primary" onClick={submitHandler} style={{ "width" : "100%" }}>Create my account</button>
            </div>

            </form>
        </div>

        <div className="footer p-5 text-center">
            2023 Restify Inc.
        </div>


        </div>
        );
    } else {
        return <Navigate to="/register" />;
    }
}

export default CreateProfile;
