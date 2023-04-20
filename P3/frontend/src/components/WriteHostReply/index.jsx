import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from "axios";
import ReplyForm from "../ReplyForm";

const WriteHostReply = ({id}) => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
          

        <ReplyForm id={id} />
        {/* <form class="row p-3" onSubmit={handleSubmit}>
      <div class="col-12">
          <div class="mb-3 mt-3">
          <label for="replyarea" class="form-label">Reply to this comment</label>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} class="form-control" id="replyarea" rows="3"></textarea>
          </div>
          <div class="col-8">
            <button type="submit" class="btn btn-primary">Post reply</button>
        </div>
      </div>
          </form> */}

        </Offcanvas.Body>
      </Offcanvas>
</>

}

export default WriteHostReply