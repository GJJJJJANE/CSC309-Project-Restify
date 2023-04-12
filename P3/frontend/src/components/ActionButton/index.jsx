// for rendering the buttons based on reservation state
// npm install react-confirm-alert --save
import { useState } from "react"
import axios from "axios";
import { useCallback } from 'react';


const ActionButton = ({ reservation, view }) => {
    var id = reservation.id
    var state = reservation.state

    const [isSending, setIsSending] = useState(false)

    var actiondata = new FormData();
        actiondata.append("state", "ap");
    var API = `http://127.0.0.1:8000/reservations/${id}/pending/action/`

    const sendRequest = useCallback(
        async ({actiondata, API}) => {
        if (isSending) return
        setIsSending(true)
        try {
            console.log(actiondata)
            console.log(API)
        const response = await axios.put(API, actiondata, {
          headers: {
              "Access-Control-Allow-Origin": 'http://localhost:3000',
              "Access-Control-Allow-Credentials": 'true',
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjcxMTc1LCJpYXQiOjE2ODEyNzA4NzUsImp0aSI6ImVlOWZiMzY2MTExYzRkOTFhN2I0MjQ5MTlkZGRhMDVlIiwidXNlcl9pZCI6NX0.Md2hM1wnuPBQdRUajHktVzTe0Yt9Rcdg5JVZ6sBwRfY`
          },
        })
        .then(response =>{
            console.log(response.data);
        });
        } catch (error) {
            console.log(error);
        }
        setIsSending(false)
    }, [isSending])

    console.log(state)

    // approve/deny pending
    if (state === 'pe' && view === 'host'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to approve this pending reservation. This action is irreversible! "
                )
                if (confirmBox === true) {
                    API = `http://127.0.0.1:8000/reservations/${id}/pending/action/`  
                    actiondata = new FormData()
                    actiondata.append("state", "ap")
                    sendRequest({actiondata,API})
                    alert("Action confirmed!")
                }
            }}>Approve</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to deny this pending reservation. This action is irreversible! "
                )
                if (confirmBox === true) {
                    API = `http://127.0.0.1:8000/reservations/${id}/pending/action/`  
                    actiondata = new FormData()
                    actiondata.append("state", "de")
                    sendRequest({actiondata,API})
                    alert("Action confirmed!")
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
                    API = `http://127.0.0.1:8000/reservations/${id}/cancel/action/`  
                    actiondata = new FormData()
                    actiondata.append("state", "ca")
                    sendRequest({actiondata,API})
                    alert("Action confirmed!")
                }
            }}>Confirm Cancel</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to deny this cancel request. The reservation will then be approved. This action is irreversible! "
                )
                if (confirmBox === true) {  
                    API = `http://127.0.0.1:8000/reservations/${id}/cancel/action/` 
                    actiondata = new FormData()
                    actiondata.append("state", "ap")
                    sendRequest({actiondata,API})
                    alert("Action confirmed!")
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
                    API = `http://127.0.0.1:8000/reservations/${id}/cancel/request/`  
                    actiondata = new FormData()
                    actiondata.append("state", "pc")
                    sendRequest({actiondata,API})
                    alert("Action confirmed!")
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
                    API = `http://127.0.0.1:8000/reservations/${id}/terminate/`  
                    actiondata = new FormData()
                    actiondata.append("state", "te")
                    sendRequest({actiondata,API})
                    alert("Action confirmed!")
                }
            }}>terminate</a>
        </div>
    }

    if (state ==='ca' || state ==='de'){
        return    <div className="row m-2 g-3">
    <p>No further action.</p>
    </div>
    }

    return    <div className="row m-2 g-3">
    <p>No further action.</p>
    </div>

}

export default ActionButton
