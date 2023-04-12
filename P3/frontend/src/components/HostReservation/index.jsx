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
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjY2OTU4LCJpYXQiOjE2ODEyNjY2NTgsImp0aSI6IjQ1NTk5Nzk4NGVjZjRlOTRiNDc3ZDgyMTg2NzQyNzJhIiwidXNlcl9pZCI6NX0.kyEnwEW_7hDpdBJR_4y2jcwJfj7sw8mMu73jdwRhPAA`
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
