import { useEffect, useState } from "react";
import ActionButton from "../ActionButton";

const ReservationList = ({ search, setSearch, reservations, view }) => {

    return <>
        <div class="container mt-10">
        <div class="row mt-5"></div>

        <div class="row mt-5">
        <div class="col-md-6">
        <h3>My Reservations</h3>
        </div>
    
        <div class="col-md-3 p-2 text-center">
            Showing 1 of 1
        </div>
    
        <div class="col-md-3">
            <label>
        Filter by State:
        <input value={search} 
        onChange={event => setSearch(event.target.value)}/>
        </label>
          {/* <select id="Order" class="form-select">
            <option selected>Filter</option>
            <option>All</option>
            <option>Confirmed</option>
            <option>In progress</option>
            <option>Unpaid</option>
            <option>Completed</option>
          </select> */}
        </div>
    
        <hr class="mt-2"></hr>

            {
                reservations.map(reservation => (
                <div class="row mt-3" key={reservation.id}>

                    <div class="card mb-3">
                        <div class="row g-0">
                        <div class="col-md-2">
                            {/* <img src="coverpage.jpeg" class="img-fluid p-3" alt="..."> */}
                        </div>

                        <div class="col-md-8">
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
                        </div>

                        </div>
                    </div>

                </div>
            ))    
        }
        </div>
        </div>
        
  
      <div class="footer p-5 text-center">
          2023 Restify Inc.
      </div>


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