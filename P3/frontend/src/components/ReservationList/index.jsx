import { useEffect, useState } from "react";

const ReservationList = ({ search, setSearch, reservations }) => {

    return (<>
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
    )
}

export default ReservationList