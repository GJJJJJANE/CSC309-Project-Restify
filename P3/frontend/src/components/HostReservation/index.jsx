import { useEffect, useState } from "react";
import axios from "axios";


//  TODO: Notice, should get query parameter state to support search filter.

const HostReservation = () => {
    const [reservations, setReservations] = useState([])
    const [search, setSearch] = useState("")

    try {
        const response = axios.get("http://127.0.0.1:8000/reservations/hostview", {
          headers: {
              "Access-Control-Allow-Origin": 'http://localhost:3000',
              "Access-Control-Allow-Credentials": 'true',
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjUyNzQ0LCJpYXQiOjE2ODEyNTI0NDQsImp0aSI6IjkzODRkZWNiODQ2MDRkZDU4Yjg0MGExNTE1YWNkM2E0IiwidXNlcl9pZCI6NX0.vE175Fdhiu4zX_E9USGci--3BGeneWyK8IRykhGnqXg`
          },
        })
        .then(function(response){
            setReservations(response.data)
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }



    // /reservations/hostview?state=${state}

return <>
<label>
    Reservations:
    <input value={search} 
     onChange={event => setSearch(event.target.value)}/>
</label>
<table>
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
</table>
{/* <p>
    {   page > 1
        ? <button onClick={()=> setPage(page-1)}>Previous</button>
        : <></>
    }
    {   page < totalPages
        ? <button onClick={()=> setPage(page+1)}>Next</button>
        : <></>
    }
    
</p> */}
<p>Page out of .</p>
</>

}

export default HostReservation
