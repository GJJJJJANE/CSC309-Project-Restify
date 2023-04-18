import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from "axios";

const WriteHostReply = ({id}) => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleReply = () =>  async (event) => {
        event.preventDefault();
        var commentData = new FormData();
        commentData.append("host_response", content)
        try {
            const response = await axios.post(`http://127.0.0.1:8000/comments/${id}/reply/create/`, commentData, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": 'Bearer '+localStorage.getItem('access'),
              },
            })
            .then(response =>{
              alert("You have submitted a reply")
              console.log(response.data);
          });
          } catch (error) {
            if (error.response.status === 401){alert("Please login first")}
            if (error.response.status === 400){alert("Reply exists!")}
            console.log(error);
          }
    }

return <>
<button class="btn btn-primary mt-5" 
      type="button" 
      onClick={handleShow}>
                Write Reply</button>

      <Offcanvas show={show} onHide={handleClose}
      placement={'bottom'} style={{height:"200%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Replying to this guest</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        <form class="row p-3" onSubmit={handleReply}>
      <div class="col-12">
          <div class="mb-3 mt-3">
          <label for="replyarea" class="form-label">Reply to this comment</label>
          <textarea value={content} onChange={event => setContent(event.target.value)}
          class="form-control" id="replyarea" rows="3"></textarea>
          </div>
          <div class="col-8">
            <button type="submit" class="btn btn-primary">Post reply</button>
        </div>
      </div>
          </form>

        </Offcanvas.Body>
      </Offcanvas>
</>

}

export default WriteHostReply