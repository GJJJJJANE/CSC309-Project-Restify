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
import Modal from 'react-bootstrap/Modal';


function Navigationbar() {

    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";
    const [avatar, setAvatar] = useState("https://on-park-bucket.s3.ca-central-1.amazonaws.com/6d75d98e235bd7e8");

    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [pre_status, setPre_status] = useState(false);
    const [next_status, setNext_status] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        setShow(false);
        var id = event.target.id;
        await axios.delete(`${endpoint}notifications/delete/${id}/`, {headers : {Authorization : `Bearer ${access}`}})
        .then(response => {
            if (response.status == 200){
                axios.get(`${endpoint}notifications/all/?page=${page}`, {headers : {Authorization : `Bearer ${access}`}})
                .then(response => {
                if (response.status == 200){
                    var origin = [];
                    for (const index in response.data.results){
                        origin.push(response.data.results[index]);
                    };
                    setNotifications(origin);
                    setPre_status(response.data.previous != null);
                    setNext_status(response.data.next != null);
                }
                })
                .catch(function (error) {
                    console.log(error)
                });
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    };


    const handleShow = async (event) => {
        event.preventDefault();
        setShow(true);
        var id = event.target.id;
        await axios.patch(`${endpoint}notifications/read/${id}/`, {}, {headers : {Authorization : `Bearer ${access}`}})
        .then(response => {
            if (response.status == 200){
                axios.get(`${endpoint}notifications/all/?page=${page}`, {headers : {Authorization : `Bearer ${access}`}})
                .then(response => {
                if (response.status == 200){
                    var origin = [];
                    for (const index in response.data.results){
                        origin.push(response.data.results[index]);
                    };
                    setNotifications(origin);
                    setPre_status(response.data.previous != null);
                    setNext_status(response.data.next != null);
                }
                })
                .catch(function (error) {
                    console.log(error)
                });
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    };

    const previous = async (event) => {
        event.preventDefault();
        if (pre_status){
            
            await axios.get(`${endpoint}notifications/all/?page=${page-1}`, {headers : {Authorization : `Bearer ${access}`}})
            .then(response => {
            if (response.status == 200){
                var origin = [];
                for (const index in response.data.results){
                    origin.push(response.data.results[index]);
                };
                setNotifications(origin);
                setPre_status(response.data.previous != null);
                setNext_status(response.data.next != null);
            }
            })
            .catch(function (error) {
                console.log(error)
            });

            setPage(page-1);
        }
        
    }

    const next = async (event) => {
        event.preventDefault();
        if (next_status){

            await axios.get(`${endpoint}notifications/all/?page=${page+1}`, {headers : {Authorization : `Bearer ${access}`}})
            .then(response => {
            if (response.status == 200){
                var origin = [];
                for (const index in response.data.results){
                    origin.push(response.data.results[index]);
                };
                setNotifications(origin);
                setPre_status(response.data.previous != null);
                setNext_status(response.data.next != null);
            }
            })
            .catch(function (error) {
                console.log(error)
            });

            setPage(page+1);

        }
    }

    useEffect(() => {

        if(refresh){

            var form = new FormData();
            form.append("refresh", refresh);

            axios.post(`${endpoint}accounts/login/refresh/`, form, {headers : {Authorization : `Bearer ${access}`}})
            .then(response => {
                if (response.status == 200){
                    localStorage.setItem("access", response.data.access);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

            axios.get(`${endpoint}accounts/profile/`, {headers : {Authorization : `Bearer ${access}`}})
            .then(response => {
            if (response.status == 200){
                setAvatar(response.data.avatar);
            }
            })
            .catch(function (error) {
                console.log(error)
            });

            axios.get(`${endpoint}notifications/all/`, {headers : {Authorization : `Bearer ${access}`}})
            .then(response => {
            if (response.status == 200){
                var origin = [];
                for (const index in response.data.results){
                    origin.push(response.data.results[index]);
                };
                setNotifications(origin);
                setPre_status(response.data.previous != null);
                setNext_status(response.data.next != null);
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
                    <Navbar.Brand href="/">Restify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown 
                            align="end"
                            title="Reservation"
                            id={`offcanvasNavbarDropdown-expand-lg`}
                        >
                            <NavDropdown.Item href="/reservations/guestview/">As Guest</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reservations/hostview/">As Host</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/list">Listing</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown 
                            title="Notification"
                            id={`offcanvasNavbarDropdown-expand-lg`}
                            align="end"
                        >   
                        
                            {notifications.map(item => (
                                <div>
                                    {item.if_read ? 
                                        <NavDropdown.Item onClick={handleShow} id={item.id}>{item.title}</NavDropdown.Item> :
                                        <NavDropdown.Item onClick={handleShow} id={item.id}>{item.title}*</NavDropdown.Item>}

                                    <Modal show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>{item.title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{item.content}</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleDelete} id={item.id}>
                                        Delete
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                    </Modal>
                                </div>
                            ))}
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={previous}>
                                Previous
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={next}>
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
                    <Navbar.Brand href="/">Restify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown 
                            align="end"
                            title="Reservation"
                            id={`offcanvasNavbarDropdown-expand-lg`}
                        >
                            <NavDropdown.Item href="/reservations/guestview/">As Guest</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reservations/hostview/">As Host</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/list">Listing</Nav.Link>
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