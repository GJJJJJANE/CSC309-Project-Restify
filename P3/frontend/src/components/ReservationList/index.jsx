import { useEffect, useState } from "react";
import ActionButton from "../ActionButton";

const ReservationList = ({ search, setSearch, reservations, view }) => {

    // const [option, setOption] = useState("");
    
    // function selectState(option) {
    //     if (option === "Pending"){
    //         console.log("pe")
    //         return "pe"
    //     }
    // }

    // useEffect (() => {
    //     search = selectState(option)
    // }, [option]);

    return <>
        <div class="container mt-10">
        <div class="row mt-5"></div>

        <div class="row mt-5">
        <div class="col-md-6">
        <h3>My Reservations</h3>
        </div>
    
        <div class="col-md-2">
            <label>
        Filter by State:
        <input value={search} 
        onChange={event => setSearch(event.target.value)}/>
        </label>
        </div>

        {/* <div className="col-md-3">
        <select id="inputState" className="form-select" value={option} onChange={(event) => setOption(event.target.value)}>
            <option selected>Filter Reservation State</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Denied</option>
            <option>Cancelled</option>
            <option>Requested Cancel</option>
            <option>Terminated</option>
        </select>    
        </div>   */}


        <hr class="mt-2"></hr>

            {
                reservations.map(reservation => (
                <div class="row mt-3" key={reservation.id}>

                    <div class="card mb-3 p-2">
                        <div class="row g-0">

                        <div class="col-md-10">
                            <div class="card-body">
                            <h5 class="card-title">Reservation</h5>
                            {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                            
                            <p>Reservation ID: {reservation.id}</p>
                            <p>Duration: {reservation.start} to {reservation.end}</p>
                            <p>Status: {reservation.state}</p>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <ActionButton reservation={reservation} view = {view}/>
                            <div className="row m-2 g-2">
                            <a className="btn btn-outline-primary btn-block" href={`/properties/${reservation.property}/`} role="buttom">View Property</a>
                            <a className="btn btn-outline-primary btn-block" href={`/comments/property/${reservation.property}/`} role="buttom">View Property Comments</a>
                            </div>
                        </div>

                        </div>
                    </div>

                </div>
            ))    
        }
        </div>
        </div>
        
  
      {/* <div class="footer p-5 text-center">
          2023 Restify Inc.
      </div> */}


    {/* <table>
    <thead>
        <tr><th>Test</th>
        <th>Test</th>
        <th>Test</th>
        <th>Test</th>
        <th>Test</th></tr>

    </thead>
    <tbody>
        {
            reservations.map(reservation => (
                <tr key={reservation.id}>
                    <td>{reservation.guest}</td>
                    <td>{reservation.property}</td>
                    <td>{reservation.state}</td>
                    <td>{reservation.start}</td>
                    <td>{reservation.end}</td>
                </tr>
            ))
        }
    </tbody>
    </table> */}
    </>
}



export default ReservationList