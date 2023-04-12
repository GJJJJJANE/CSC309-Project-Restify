import { useEffect, useState } from "react";
import axios from "axios";
import ReservationList from "../ReservationList";

//  TODO: Notice, should get query parameter state to support search filter.

const HostReservation = () => {

    const [reservations, setReservations] = useState([])
    const [search, setSearch] = useState("")    

      useEffect (() => {
        try {
            const response = axios.get(`http://127.0.0.1:8000/reservations/hostview?state=${search}`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjYwOTE4LCJpYXQiOjE2ODEyNjA2MTgsImp0aSI6IjZlNmY0NmY5MzNiODQxZjU4ZWIxZDEyN2EzODE2ZjkzIiwidXNlcl9pZCI6NX0.btPAtC4vthzsWbNdfxkKCzCc4TpXX1m2wPc5pvLl2PI`
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

return <ReservationList search={search} reservations = {reservations} setSearch={setSearch}/>

}


export default HostReservation
