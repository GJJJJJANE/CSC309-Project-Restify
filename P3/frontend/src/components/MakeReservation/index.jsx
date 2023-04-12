import { useEffect, useState } from "react";
import axios from "axios";

// using prop drill to get id for current property
const Reserve = ({ id }) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        bookData = new FormData()
        bookData.append('start', start)
        bookData.append('end', end)
        try {
            const response = await axios.post(`http://127.0.0.1:8000/reservations/reserve/${id}`, bookData, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTkyODQwLCJpYXQiOjE2ODExOTI1NDAsImp0aSI6IjVkM2IyZjE5Y2YyYzQzMGE5ODlmM2EyN2RiYzY3NzAzIiwidXNlcl9pZCI6NX0.GnxUjUd3Ijx_x-rxTXc1mNwJatETslBP9iWG13IrMi4`
              },
            });
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }

        const propertyData = new FormData();

    }

    return <>
    <form class="row p-3" onSubmit={handleSubmit}>
            <h5> Confirm your reservation </h5>
            <div class="col-md-6">
              <label for="inputArrival" class="form-label">Arrival</label>
              <input value={start} onChange={event => setStart(event.target.value)} 
              type="date" class="form-control" id="inputArrival"/>
            </div>
            <div class="col-md-6">
              <label for="inputDepart" class="form-label">Depart</label>
              <input value={end} onChange={event => setEnd(event.target.value)}
              type="date" class="form-control" id="inputDepart"/>
            </div>
            <div class="col-12 mt-2">
              <button type="submit" class="btn btn-primary">Book Now</button>
            </div>
          </form>
          </>
}

