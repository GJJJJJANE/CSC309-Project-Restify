import { useEffect, useState } from "react";
import axios from "axios";
import ReservationList from "../ReservationList";

//  TODO: Notice, should get query parameter state to support search filter.

const HostReservation = () => {

    const view = 'host'

    const [reservations, setReservations] = useState([])
    const [search, setSearch] = useState("")    

      useEffect (() => {
        try {
            const response = axios.get(`http://127.0.0.1:8000/reservations/hostview?state=${search}`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjY3NjI4LCJpYXQiOjE2ODEyNjczMjgsImp0aSI6ImVmNzY1OGQ1ZDY1YzQ4NjFiZDdkNzE4NjU5ZWFlNWRhIiwidXNlcl9pZCI6NX0.mPBbPQP5R-affyedSRrGLxTV-Z3sxkS06DydA1Nq21w`
              },
            })
            .then(response =>{
                setReservations(response.data.results)
                // note next and previous for pagination support
                console.log(response.data);
            });
          } catch (error) {
            console.log(error);
          }
    }, [search]);

return <ReservationList search={search} reservations = {reservations} 
setSearch={setSearch} view = {view}/>

}


export default HostReservation
