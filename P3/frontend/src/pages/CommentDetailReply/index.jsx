import React, {  useState, useEffect, Component } from 'react';
import PropertyComment from '../../components/PropertyComment';
import { useParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";
import Navbar from "../../components/navbar";
import ReplyFollowUp from '../../components/ReplyFollowUp';

const CommentDetailPage = () => {

    const [hostreply, setHostreply] = useState("")
    const [userreply, setUserreply] = useState("")
    const [replyid, setReplyid] = useState("")
    const [dt, setDt] = useState("")
    const [submitted, setSubmitted] = useState(false)
     
    var param = useParams()
    var id = param.replyid

    useEffect (() => {
        const guest_id = id["guestid"]
        try {
            const response = axios.get(`http://127.0.0.1:8000/comments/${id}/reply`, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Authorization": 'Bearer '+localStorage.getItem('access'),
              },
            })
            .then(response =>{
                console.log(response.data);
                setHostreply(response.data.host_response)
                setUserreply(response.data.user_response)
                setReplyid(response.data.id)
                setDt(new Date(response.data.modified).toLocaleString('en-US', {hour12: false}))
            });
          } catch (error) {
            console.log(error);
          }
    }, [submitted]);

    if (userreply === "") {
        var followup = <>
        <div class="row mt-3">
        <h6>Reply to host</h6>
        <ReplyFollowUp id={replyid} submitted={submitted} setSubmitted={setSubmitted}/>
        </div>
        </>
    } else {
        var followup = <>
        <div class="row">
            <h6>User reply</h6>
            <p>{userreply}</p>
            </div>
        </>
    
    }

    return <>
    <main>

    <Navbar />
    <div class="container mt-10">

        <div class="row mt-5">
        <div class="col-md-6">
        <h3>Reply Details</h3>
        </div>
        <div class="row mt-5"></div>

    <div class="card mb-3">
                        <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">Reply from host</h5>
                            
                            <span>{hostreply}</span><br></br>
                        
                        <div class="row mt-3">{followup}</div>
                        <div class="col-md-8"><small></small> 
                        <small class="text-muted">Last updated: {dt}</small><br></br>
                        </div>

                        </div>
                        </div>
                        </div>
                        </div>

    </div>
    </div>
    </main>
    </>
}

export default CommentDetailPage