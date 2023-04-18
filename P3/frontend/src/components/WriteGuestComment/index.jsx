import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import GuestCommentForm from "../GuestCommentForm";

const WriteGuestComment = (id) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return <>
<button class="btn btn-primary mt-8" 
      type="button" 
      onClick={handleShow}>
                Write Review for Guest</button>

      <Offcanvas show={show} onHide={handleClose}
      placement={'bottom'} style={{height:"200%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My review for this guest</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        <GuestCommentForm id={id} />

        </Offcanvas.Body>
      </Offcanvas>

</>

}

export default WriteGuestComment