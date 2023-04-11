import { useEffect, useState } from "react";
import axios from "axios";
import ReservationList from "../ReservationList";

//  TODO: Notice, should get query parameter state to support search filter.

const GuestReservation = () => {
    const [reservations, setReservations] = useState([])
    const [search, setSearch] = useState("")    

      useEffect (() => {
        try {
            const response = axios.get(`http://127.0.0.1:8000/reservations/guestview?state=${search}`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjU1MjEyLCJpYXQiOjE2ODEyNTQ5MTIsImp0aSI6IjlmYjFhZDUxMzEyMjRhMGQ5YjQ2MmUyM2JhZDQzYWY4IiwidXNlcl9pZCI6Nn0.MFKj3Nyb6_3lf5NKpSKgeoZqk1H7bWtPyrK0jnM9tHY`
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

export default GuestReservation
