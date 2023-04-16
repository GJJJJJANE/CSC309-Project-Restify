import React, {  useState, useEffect, Component } from 'react';
import GuestComment from '../../components/GuestComment';
import { useParams } from "react-router-dom";
import axios from "axios";

const GuestCommentPage = () => {
    const id = useParams();
    const [context, setContext] = useState([])
    const [search, setSearch] = useState("") // query param

    useEffect (() => {
        const guest_id = id["guestid"]
        try {
            const response = axios.get(`http://127.0.0.1:8000/comments/${guest_id}/Guestview/?score=${search}`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
              },
            })
            .then(response =>{
                setContext(response.data.results)
                // note next and previous for pagination support
                console.log(response.data);
            });
          } catch (error) {
            console.log(error);
          }
    }, [search]);

    return <main>
    <GuestComment context={context} search={search} setSearch={setSearch}/>
    </main>;
}

export default GuestCommentPage
