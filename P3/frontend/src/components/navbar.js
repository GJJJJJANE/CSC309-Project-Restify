import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Navigationbar() {

    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";
    const [avatar, setAvatar] = useState("https://on-park-bucket.s3.ca-central-1.amazonaws.com/6d75d98e235bd7e8");


    useEffect(() => {

        if(refresh){
            axios.get(`${endpoint}accounts/profile/`, {headers : {Authorization : `Bearer ${access}`}})
            .then(response => {
            if (response.status == 200){
                setAvatar(response.data.avatar);
            }
            })
            .catch(function (error) {
                console.log(error)
            });
        }
        

        const interval = setInterval(async () => {
            if (refresh){
                var form = new FormData();
                form.append("refresh", refresh);

                await axios.post(`${endpoint}accounts/login/refresh/`, form, {headers : {Authorization : `Bearer ${access}`}})
                .then(response => {
                    if (response.status == 200){
                        console.log(response.data.access);
                        localStorage.setItem("access", response.data.access);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }, 120000);
      
        return () => clearInterval(interval);
      }, [])

    if (refresh){
        return (
            <div className='w3-container'>
            <div className="container-fluid bg-dark">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Reservation</Nav.Link>
                        <Nav.Link href="/">Listing</Nav.Link>
                        <Nav.Link href="/">Property</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown 
                            title="Notification"
                            id={`offcanvasNavbarDropdown-expand-lg`}
                        >
                            <NavDropdown.Item href="#action3">Message1</NavDropdown.Item>
                            <NavDropdown.Item href="#action3">Message2</NavDropdown.Item>
                            <NavDropdown.Item href="#action3">Message3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Previous
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action5">
                                Next
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown 
                            align="end"
                            title={<img src={avatar} id="avatar_sm" class="avatar_sm" style={{"width" : "24px", "height" : "24px", "borderRadius" : "50%"}}/>}
                            id={`offcanvasNavbarDropdown-expand-lg`}
                        >
                            <div className="float-left">
                            <NavDropdown.Item href="/viewProfile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </div>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
            </div>
        </div>
        );
    } else {
        return (
            <div className='w3-container'>
            <div className="container-fluid bg-dark">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Reservation</Nav.Link>
                        <Nav.Link href="/">Listing</Nav.Link>
                        <Nav.Link href="/">Property</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown 
                            align="end"
                            title={<img src="https://on-park-bucket.s3.ca-central-1.amazonaws.com/6d75d98e235bd7e8" id="avatar_sm" class="avatar_sm" style={{"width" : "24px", "height" : "24px", "borderRadius" : "50%"}}/>}
                            id={`offcanvasNavbarDropdown-expand-lg`}
                        >
                            <div className="float-left">
                            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                            </div>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
            </Navbar>
            </div>
        </div>
        );
    }
}
export default Navigationbar;