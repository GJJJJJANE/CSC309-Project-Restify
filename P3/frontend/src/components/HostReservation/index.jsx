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
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjU5NTEzLCJpYXQiOjE2ODEyNTkyMTMsImp0aSI6IjY0NzY0NDg0MTA3NjRiNzk4OTYzYzE5Zjk1YWE3MmRjIiwidXNlcl9pZCI6NX0.F92A6CGV4ygKo-3vTC2GqP0pU7DqPvN-5VqLsvtVs9M`
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
