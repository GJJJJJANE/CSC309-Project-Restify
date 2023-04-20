// for rendering the buttons based on reservation state
// npm install react-confirm-alert --save
import { useState } from "react"
import axios from "axios";
import { useCallback } from 'react';
import GenerateComments from "../generateComments";


const ActionButton = ({ reservation, view }) => {
    var id = reservation.id
    var state = reservation.state
    var guestid = reservation.guest
    var property = reservation.property
    
    // approve/deny pending
    if (state === 'pe' && view === 'host'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to approve this pending reservation. This action is irreversible! "
                )
                if (confirmBox === true) {
                    try {
                        var actiondata = new FormData()
                        actiondata.append("state", "ap")
                        console.log(actiondata.state)
                        
                    const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/pending/action/`, actiondata, {
                        headers: {
                          "Access-Control-Allow-Origin": 'http://localhost:3000',
                          "Access-Control-Allow-Credentials": 'true',
                          "Content-Type": "multipart/form-data",
                          "Authorization": 'Bearer '+localStorage.getItem('access')
                      },
                    })
                        .then(response =>{
                            console.log(response.data);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    alert("Action confirmed!")
                    GenerateComments(id, 3);

                }
            }}>Approve</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to deny this pending reservation. This action is irreversible! "
                )
                if (confirmBox === true) {
                    try {
                        var actiondata = new FormData()
                        actiondata.append("state", "de")
                        console.log(actiondata.state)
                        
                    const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/pending/action/`, actiondata, {
                        headers: {
                          "Access-Control-Allow-Origin": 'http://localhost:3000',
                          "Access-Control-Allow-Credentials": 'true',
                          "Content-Type": "multipart/form-data",
                          "Authorization": 'Bearer '+localStorage.getItem('access')
                      },
                    })
                        .then(response =>{
                            console.log(response.data);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    alert("Action confirmed!")
                    GenerateComments(id, 10);
                }
            }}>Deny</a>
        </div>
    }

    // approve/deny cancel
    if (state === 'pc' && view === 'host'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to approve this cancel request. The reservation will then be cancelled. This action is irreversible! "
                )
                if (confirmBox === true) {  
                    try {
                        var actiondata = new FormData()
                        actiondata.append("state", "ca")
                        console.log(actiondata.state)
                        
                    const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/cancel/action/`, actiondata, {
                        headers: {
                          "Access-Control-Allow-Origin": 'http://localhost:3000',
                          "Access-Control-Allow-Credentials": 'true',
                          "Content-Type": "multipart/form-data",
                          "Authorization": 'Bearer '+localStorage.getItem('access')
                      },
                    })
                        .then(response =>{
                            console.log(response.data);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    alert("Action confirmed!")
                    GenerateComments(id, 4);
                }
            }}>Confirm Cancel</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to deny this cancel request. The reservation will then be approved. This action is irreversible! "
                )
                if (confirmBox === true) {
                    try {
                    var actiondata = new FormData()
                    actiondata.append("state", "ap")
                    console.log(actiondata.state)
                    
                const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/cancel/action/`, actiondata, {
                    headers: {
                      "Access-Control-Allow-Origin": 'http://localhost:3000',
                      "Access-Control-Allow-Credentials": 'true',
                      "Content-Type": "multipart/form-data",
                      "Authorization": 'Bearer '+localStorage.getItem('access')
                  },
                })
                    .then(response =>{
                        console.log(response.data);
                    });
                } catch (error) {
                    console.log(error);
                }
                alert("Action confirmed!")
                GenerateComments(id, 9);
            }
            }}>Deny Cancel</a>
        </div>
    }


    // guest view
    // when pending or approved, request to cancel
    if ((state === 'pe'|| state === 'ap') && view === 'guest'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to request to cancel this reservation. This action is irreversible! "
                )
                if (confirmBox === true) {
                    try {
                        var actiondata = new FormData()
                        actiondata.append("state", "pc")
                        console.log(actiondata.state)
                        
                    const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/cancel/request/`, actiondata, {
                        headers: {
                          "Access-Control-Allow-Origin": 'http://localhost:3000',
                          "Access-Control-Allow-Credentials": 'true',
                          "Content-Type": "multipart/form-data",
                          "Authorization": 'Bearer '+localStorage.getItem('access')
                      },
                    })
                        .then(response =>{
                            console.log(response.data);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    alert("Action confirmed!")
                    GenerateComments(id, 2);
                }
            }}>Request Cancel</a>
        </div>
    }

    if (state === 'pc' && view === 'guest'){
        return <div className="row m-2 g-3">
            <p>Cancel requested. Waiting for host action.</p>
        </div>
    }


    if (state === 'ap' && view === 'host'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to terminate this reservation. This action is irreversible! "
                )
                if (confirmBox === true) {
                    try {
                        var actiondata = new FormData()
                        actiondata.append("state", "te")
                        console.log(actiondata.state)
                        
                    const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/terminate/`, actiondata, {
                        headers: {
                          "Access-Control-Allow-Origin": 'http://localhost:3000',
                          "Access-Control-Allow-Credentials": 'true',
                          "Content-Type": "multipart/form-data",
                          "Authorization": 'Bearer '+localStorage.getItem('access')
                      },
                    })
                        .then(response =>{
                            console.log(response.data);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    alert("Action confirmed!")  
                    GenerateComments(id, 5);
                }
            }}>terminate</a>
        </div>
    }

    if (state ==='ca' || state ==='de'){
        return    <div className="row m-2 g-3">
    <p>No further action.</p>
    </div>
    }

    if (state === 'te' && view === 'host'){
        return <div className="row m-2 g-3">
            <a className="btn btn-outline-primary btn-block" href={`/comments/guest/${guestid}/`} role="buttom">View Guest</a>
        </div>
    }

    if (state === 'te' && view === 'host'){
        return <div className="row m-2 g-3">
            <a className="btn btn-outline-primary btn-block" href={`/comments/guest/${guestid}/`} role="buttom">View Guest</a>
        </div>
    }

    return    <div className="row m-2 g-3">
    <p>No further action.</p>
    </div>

}

export default ActionButton
