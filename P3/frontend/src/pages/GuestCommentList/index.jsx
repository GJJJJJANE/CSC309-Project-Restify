import React, {  useState, useEffect, Component } from 'react';
import GuestComment from '../../components/GuestComment';
import { useParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";

const GuestCommentPage = () => {
    const id = useParams();
    const [context, setContext] = useState([])
    const [search, setSearch] = useState("") // query param
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect (() => {
        const guest_id = id["guestid"]
        try {
            const response = axios.get(`http://127.0.0.1:8000/comments/${guest_id}/Guestview/?score=${search}&page=${currentPage}`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
              },
            })
            .then(response =>{
                setContext(response.data.results)
                setTotalPages(Math.ceil(response.data.count / 6))
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
    <GuestComment context={context} search={search} setSearch={setSearch}/>
    <Pagination className="d-flex justify-content-center">{items}</Pagination>
    </main>;
}

export default GuestCommentPage
