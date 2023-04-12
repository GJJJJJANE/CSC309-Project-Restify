// for rendering the buttons based on reservation state
// npm install react-confirm-alert --save
import { useState } from "react"
import axios from "axios";


function Approve(e,id) {}
    


function Deny(e) {
    alert("You denied this reservation!")
}

function CancelRequest(e){
    alert("You requested cancel!")
}

function CancelConfirm(e){
    alert("you confirmed this cancellation!")
}

function CancelDeny(e){
    alert("you confirmed this cancellation!")
}


const ActionButton = ({ id, state, view }) => {

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
                        const response = axios.put(`http://127.0.0.1:8000/reservations/${id}/pending/action/`, {
                          headers: {
                              "Access-Control-Allow-Origin": 'http://localhost:3000',
                              "Access-Control-Allow-Credentials": 'true',
                              "Content-Type": "multipart/form-data",
                              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjY0NzgzLCJpYXQiOjE2ODEyNjQ0ODMsImp0aSI6ImJkZTg3ZjA4NzRjNTRiNTc4M2ZkYTcxZTdhMGIyNDdkIiwidXNlcl9pZCI6NX0.SEZFY3-E18aC83B5y90TUfrLjL08Q7Wef4Uy_NGNdfw`
                          },
                          data: {"state": "ap"},
                        })
                        .then(response =>{
                            console.log(response.data);
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    alert("Action confirmed!")
                }
            }}>Approve</a>
        <a className="btn btn-outline-secondary btn-block" href="" role="buttom"
        onClick={Deny}>Deny</a>
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
