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

function EditProfile() {

    const navigate = useNavigate();
    const endpoint = "http://localhost:8000/";
    const token = localStorage.getItem("access")
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

    const [emailRef, setEmailRef] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [display, setDispaly] = useState("");
    const [upload, setUpload] = useState("");

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
            setUpload(uploadUrl);

            const display_avatar = document.getElementById("avatar");
            display_avatar.src = display_src;
        }
        return
    }

    axios.get(`${endpoint}accounts/profile/`, {headers : {Authorization : `Bearer ${token}`}})
    .then(response => {
            
        if (response.status == 200){
            setEmailRef(response.data.email);
            setUsername(response.data.username);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setPhone(response.data.phone_number);
            setAvatar(response.data.avatar);
            setDispaly(response.data.avatar);
            setEmail(response.data.email);
        }
        
    })
    .catch(function (error) {
        console.log(error)
    });


    const submitHandler = async (event) => {
        
        event.preventDefault();

        var if_pass = true;
        const username = document.getElementById("username").value;
        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const phone_notification = document.getElementById("phone_notification");
        const username_notification = document.getElementById("username_notification");
        const first_name_notification = document.getElementById("first_name_notification");
        const last_name_notification = document.getElementById("last_name_notification");
        const email_notification = document.getElementById("email_notification");

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
        if (email != emailRef){
            if (email.match(mailformat) && email != ''){
                if (!checkEmail(email)) {
                    if_pass = false;
                    email_notification.innerHTML = "Email already been used!";
                } else {
                    email_notification='';
                }
            } else {
                email_notification.innerHTML = "Please enter a valid email!";
                if_pass=false;
            }
        }

        if (if_pass){
            phone_notification.innerHTML = "";
            username_notification.innerHTML = "";
            first_name_notification.innerHTML = "";
            last_name_notification.innerHTML = "";

            var form = new FormData();
            form.append("email", email);
            form.append("username", username);
            form.append("first_name", first_name);
            form.append("last_name", last_name);
            if (upload != ''){
                form.append("avatar", upload);
            } else {
                form.append("avatar", avatar);
            }
            form.append("phone_number", phone);

            await axios.patch(`${endpoint}accounts/profile/`, form, {headers : {Authorization : `Bearer ${token}`}})
            .then(response => {
                
                if (response.status == 200){
                    navigate("/viewProfile");
                }
                
            })
            .catch(function (error) {
                console.log(error)
            });
        }

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
                    <p className="fw-bold">My Profile</p>
                </div>

            <div className="form-outline mb-4 text-center">
                <input type="file" id="actual-btn" onChange={imageHandler} accept="image/*" hidden/> 
                <label htmlFor="actual-btn">
                    <img src={display} alt="avatar" style={{"width" : "100px", "height" : "100px"}} className="avatar" id="avatar" />
                </label>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Email</label>
                <input type="email" id="email" className="form-control" defaultValue={email}/>
                <p id="email_notification" style={{ "color" : "red" }}></p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Username</label>
                <input type="email" id="username" className="form-control" defaultValue={username}/>
                <p id="username_notification" style={{ "color" : "red" }}></p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">First Name</label>
                <input type="email" id="first_name" className="form-control" defaultValue={firstName}/>
                <p id="first_name_notification" style={{ "color" : "red" }}></p>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Last Name</label>
                <input type="email" id="last_name" className="form-control" defaultValue={LastName}/>
                <p id="last_name_notification" style={{ "color" : "red" }}></p>
            </div>
  
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Phone Number</label>
                <input type="phone" id="phone" className="form-control" defaultValue={phone}/>
                <p id="phone_notification" style={{ "color" : "red" }}></p>
            </div>
  
            <div className="form-outline mb-4">
                <button type="button" className="btn btn-block btn-primary" onClick={submitHandler} style={{ "width" : "100%" }}>Edit My Profile</button>
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

export default EditProfile;