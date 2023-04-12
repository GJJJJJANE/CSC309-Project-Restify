// for rendering the buttons based on reservation state
// npm install react-confirm-alert --save
import { useState } from "react"
import axios from "axios";
import { useCallback } from 'react';

function CancelRequest(e){
    alert("You requested cancel!")
}

function CancelConfirm(e){
    alert("you confirmed this cancellation!")
}

function CancelDeny(e){
    alert("you confirmed this cancellation!")
}


const ActionButton = ({ reservation, view }) => {
    var id = reservation.id
    var state = reservation.state

    const [isSending, setIsSending] = useState(false)

    var actiondata = new FormData();
        actiondata.append("state", "ap");

    const sendRequest = useCallback(async () => {
        if (isSending) return
        setIsSending(true)
        try {
        const response = await axios.put(`http://127.0.0.1:8000/reservations/${id}/pending/action/`, actiondata, {
          headers: {
              "Access-Control-Allow-Origin": 'http://localhost:3000',
              "Access-Control-Allow-Credentials": 'true',
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjY3NjI4LCJpYXQiOjE2ODEyNjczMjgsImp0aSI6ImVmNzY1OGQ1ZDY1YzQ4NjFiZDdkNzE4NjU5ZWFlNWRhIiwidXNlcl9pZCI6NX0.mPBbPQP5R-affyedSRrGLxTV-Z3sxkS06DydA1Nq21w`
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
                    sendRequest()
                    alert("Action confirmed!")
                }
            }}>Approve</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={() => {
            const confirmBox = window.confirm(
                "You are going to approve this pending reservation. This action is irreversible! "
                )
                if (confirmBox === true) {  
                    actiondata = new FormData()
                    actiondata.append("state", "de")
                    sendRequest()
                    alert("Action confirmed!")
                }
            }}>Deny</a>
        </div>
    }

    // approve/deny cancel
    if (state === 'pc' && view === 'host'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={CancelConfirm}>Confirm Cancel</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={CancelDeny}>Deny Cancel</a>
        </div>
    }


    // guest view
    // when pending, request to cancel
    if (state === 'pe' && view === 'guest'){
        return <div className="row m-2 g-3">
        <a className="btn btn-outline-primary btn-block" href="" role="buttom"
        onClick={CancelRequest}>Request Cancel</a>
        </div>
    }

    if (state === 'pc' && view === 'guest'){
        return <div className="row m-2 g-3">
            <p>Cancel requested. Waiting for host action.</p>
        </div>
    }



    return    <div className="row m-2 g-3">
    <a className="btn btn-outline-primary btn-block" href="u_ReservationConfirm.html" role="buttom">View</a>
    <a className="btn btn-outline-secondary btn-block" href="#" role="buttom">Contact Host</a>
    </div>

}

export default ActionButton
