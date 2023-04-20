import React, {  useState, useEffect, Component } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import WriteHostReply from '../WriteHostReply';

const ReplyThread = ({commentid}) => {
    const [replied, setReplied] = useState(false)
    const [content, setContent] = useState("");
    const [unlogin, setUnlogin] = useState(false)
    const [dt, setDt] = useState("");
    const [replyid, setReplyid] = useState("")
    
    useEffect(() => {
    try {
        const response = axios.get(`http://127.0.0.1:8000/comments/${commentid}/reply/`, {
          headers: {
              "Access-Control-Allow-Origin": 'http://localhost:3000',
              "Access-Control-Allow-Credentials": 'true',
              "Authorization": 'Bearer '+localStorage.getItem('access')
          },
        })
        .then(response =>{
            setReplied(true)
            setContent(response.data.host_response);
            setReplyid(response.data.id)
            setDt(new Date(response.data.modified).toLocaleString('en-US', {hour12: false}))
            console.log(response.data);
        });
        
      } catch (error) {
        if (error.response.status === 404){
            console.log(commentid)
            setReplied(false)
        }
        if (error.response.status === 401){
            setUnlogin(true)
        }
        console.log(error);
      }
    }, []);

      if (unlogin){
        return <></>
      } else {

      if (!replied){
      return <>
        <WriteHostReply id={commentid}/>
          </>
    } else {
        return <>
        <div class="row">
        <div class="col-12">
            <h6>Reply from host</h6>
            <p><small class="text-muted"> {dt} </small></p>
            <p><small>{content}</small></p>
        </div>
        <div class="col-4">
        <a className="btn btn-outline-primary btn-block" href={`/comments/reply/${replyid}`} role="buttom">Reply Detail</a>
        </div>
        </div>
        </>
    }
}

}

export default ReplyThread
