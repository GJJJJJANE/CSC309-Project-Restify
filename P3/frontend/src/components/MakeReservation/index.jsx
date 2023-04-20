import { useEffect, useState } from "react";
import axios from "axios";

// using prop drill to get id for current property
const Reserve = ({ id }) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const [property, setProperty] = useState("");
    const [owner, setOwner] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        var bookData = new FormData();
        bookData.append("start", start);
        bookData.append("end", end);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/reservations/reserve/${id}/`, bookData, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": 'Bearer '+localStorage.getItem('access'),
              },
            })
            .then(response =>{
              alert("You have submitted reservation. Please check in reservation list.")
              console.log(response.data);
          });

          await axios.get(`http://127.0.0.1:8000/property/${id}/detail/`)
          .then(response => {
            if (response.status == 200){
              setProperty(response.data.title);
              setOwner(response.data.owner);
            }
          });

          var notificationForm = new FormData();
          notificationForm.append("type_id", "1");
          notificationForm.append("start", start);
          notificationForm.append("end", end);
          notificationForm.append("property", property);

          await axios.post(`http://127.0.0.1:8000/notifications/receive/${owner}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})

          } catch (error) {
            if (error.response.status === 401){alert("Please login first")}
            if (error.response.status === 400){alert("Some field is invalid. Please check the reservation detail and property available time!")}
            console.log(error);
          }
    }

    return <>
    <div class="card p-2 sticky-md-top sticky-rel mb-5">
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

          </div>
          </>
}

export default Reserve