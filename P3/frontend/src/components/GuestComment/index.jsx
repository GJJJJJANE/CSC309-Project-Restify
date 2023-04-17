import { useEffect, useState } from "react";
import CommentCard from "../CommentCard";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import GuestCommentForm from "../GuestCommentForm";

const GuestComment = ({ context, search, setSearch, id }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return <>
        <div class="container mt-10">
        <div class="row mt-5"></div>

        <div class="row mt-5">
        <div class="col-md-6">
        <h3>Comment for this user</h3>
        </div>
    
        <div class="col-md-3 p-2 text-center">
            Showing 1 of 1
        </div>
    
        <div class="col-md-2">
            <label>
        Filter by Score:
        <input value={search} 
        onChange={event => setSearch(event.target.value)}/>
        </label>

        </div>
    
        <hr class="mt-2"></hr>


        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
              <div class="row mt-3">
            
            {
                    context.map(comment => (
                        <CommentCard key={comment.id}
                        comment={comment}/>
                    )       
            )}
              
        </div>

      <button class="btn btn-primary mt-5" 
      type="button" 
      onClick={handleShow}>
                Write My Own Review</button>

      <Offcanvas show={show} onHide={handleClose}
      placement={'bottom'} style={{height:"200%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My review for this guest</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        <GuestCommentForm id={id} />

        </Offcanvas.Body>
      </Offcanvas>



        </div>        
        </div>
        </div>
        </div>
        </>
    
}

export default GuestComment