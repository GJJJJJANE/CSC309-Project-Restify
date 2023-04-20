import { useEffect, useState } from "react";
import axios from "axios";
import GenerateComments from "../generateComments";

// using prop drill to get id for current property
const Reserve = ({ id }) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const token = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";
    const [guest, setGuest] = useState(0);
    const [host, setHost] = useState(0);
    const [property, setProperty] = useState("");
    const [property_id, setProperty_id] = useState("");
    const [reservation_id, setReservation_id] = useState("");

    const handleComment = async () => {
      await axios.get(`${endpoint}reservations/${reservation_id}/detail`, {headers : {Authorization : `Bearer ${token}`}})
      .then(response => {        
          if (response.status == 200){
              setGuest(response.data.guest);
              // setProperty_id(response.data.property);
              setStart(response.data.start);
              setEnd(response.data.end);
          }
      })
      .catch(function (error) {
          console.log(error)
      });
  
      await axios.get(`http://127.0.0.1:8000/property/${property_id}/detail/`)
      .then(response => {
          if (response.status == 200){
              setProperty(response.data.title);
              setHost(response.data.owner.id);
          }
      });

      var notificationForm = new FormData();
      notificationForm.append("type_id", "1");
      notificationForm.append("start", start);
      notificationForm.append("end", end);
      notificationForm.append("property", property);
      await axios.post(`http://127.0.0.1:8000/notifications/receive/${host}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})
    }

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
              setReservation_id(response.data.id)
              console.log(response.data.id)
              setProperty_id(response.data.property)
              console.log(response.data.property)
              handleComment();
              alert("You have submitted reservation. Please check in reservation list.");  
              console.log(response.data);
          });
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