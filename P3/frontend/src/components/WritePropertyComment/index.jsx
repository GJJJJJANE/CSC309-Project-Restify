import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropertyCommentForm from "../PropertyCommentForm";

const WritePropertyComment = ({id, setCommented}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return <>
<button class="btn btn-primary mt-5" 
      type="button" 
      onClick={handleShow}>
                Write Review</button>

      <Offcanvas show={show} onHide={handleClose}
      placement={'bottom'} style={{height:"200%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My review for this property</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        <PropertyCommentForm id={id} setCommented={setCommented}/>

        </Offcanvas.Body>
      </Offcanvas>
</>

}

export default WritePropertyComment