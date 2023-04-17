import React, { Component } from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import ReservationList from "../../components/ReservationList";
import Pagination from 'react-bootstrap/Pagination';    


const Reserve_Host = () => {

    const view = 'host'

    const [reservations, setReservations] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);      

      useEffect (() => {
        try {
            const response = axios.get(`http://127.0.0.1:8000/reservations/hostview?state=${search}&page=${currentPage}`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": 'Bearer '+localStorage.getItem('access'),
              },
            })
            .then(response =>{
                setReservations(response.data.results)
                setTotalPages(Math.ceil(response.data.count / 6))
                // note next and previous for pagination support
                console.log(response.data);
            });
          } catch (error) {
            console.log(error);
          }
    }, [search, currentPage]);

  function handlePageChange(pageNumber) {
      setCurrentPage(pageNumber);
  }

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
      items.push(
      <Pagination.Item key={number} onClick={() => handlePageChange(number)} className={number === currentPage ? "active" : ""}>
          {number}
      </Pagination.Item>,);
  }

    return <main>
    <ReservationList search={search} reservations = {reservations} 
    setSearch={setSearch} view = {view}/>
    <Pagination className="d-flex justify-content-center">{items}</Pagination>
    </main>;
}

export default Reserve_Host
