import React, { useState, useEffect } from "react";
import axios from "axios";


const GenerateComments = async ({ id, type }) => {
    // 1: new reservation to host *
    // 2: cancellation to host *
    // 3: reservation approved to guest *
    // 4: cancellation to guest *
    // 5: terminate to guest *
    // 7: comment to host
    // 8: comment to guest
    // 9: cancellation denied to guest *
    // 10: reservation denied to guest *

    const token = localStorage.getItem("access");
    const endpoint = "http://localhost:8000/";
    const [guest, setGuest] = useState(0);
    const [host, setHost] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [property, setProperty] = useState("");
    const [property_id, setProperty_id] = useState("");


    await axios.get(`${endpoint}/reservations/${id}/detail`, {headers : {Authorization : `Bearer ${token}`}})
    .then(response => {        
        if (response.status == 200){
            setGuest(response.data.guest);
            setProperty_id(response.data.property);
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
            setHost(response.data.host);
        }
    });

    if (type == 1){
        return (<></>);

    } else if(type == 2){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "2");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${host}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})
    
    } else if(type == 3){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "3");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${guest}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})
        
    } else if(type == 4){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "4");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${guest}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})

    } else if(type == 5){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "5");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        notificationForm.append("title", "Reservation terminated");
        notificationForm.append("description", `Your reservation of ${property} from ${start} to ${end} is terminated`);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${guest}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})

    } else if(type == 6){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "5");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        notificationForm.append("title", "Reservation pending");
        notificationForm.append("description", `Your reservation of ${property} from ${start} to ${end} is pending`);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${guest}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})


    } else if(type == 7){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "5");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        notificationForm.append("title", "New comment");
        notificationForm.append("description", `You received a new comment from guest of ${property}`);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${host}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})

    } else if(type == 8){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "5");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        notificationForm.append("title", "New comment");
        notificationForm.append("description", `You received a new comment from host of ${property}`);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${guest}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})

    } else if(type == 10){
        var notificationForm = new FormData();
        notificationForm.append("type_id", "5");
        notificationForm.append("start", start);
        notificationForm.append("end", end);
        notificationForm.append("property", property);
        notificationForm.append("title", "Reservation Denied");
        notificationForm.append("description", `You Reservation to ${property} from ${start} to ${end} is denied by host`);
        await axios.post(`http://127.0.0.1:8000/notifications/receive/${guest}/`, notificationForm, {headers : {Authorization : `Bearer ${localStorage.getItem('access')}`}})

    } 

    return;
}

export default GenerateComments;