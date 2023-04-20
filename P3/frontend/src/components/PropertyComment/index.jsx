import { useEffect, useState } from "react";
import CommentCard from "../CommentCard";
import Button from 'react-bootstrap/Button';


const PropertyComment = ({ context, search, setSearch }) => {
    const reply = true


//     <div class="col-md-2">
//     <label>
// Filter by Score:
// <input value={search} 
// onChange={event => setSearch(event.target.value)}/>
// </label>

// </div>

    return <>
        <div class="container mt-10">
        <div class="row mt-5"></div>

        <div class="row mt-5">
        <div class="col-md-6">
        <h3>Comment for this property</h3>
        </div>
    

    
        <hr class="mt-2"></hr>


        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
              <div class="row mt-3">
            
            {
                    context.map(comment => (
                        <CommentCard key={comment.id}
                        comment={comment} 
                        reply={reply}/>
                    )       
            )}
              
        </div>


        </div>        
        </div>
        </div>
        </div>
        </>
    
}

export default PropertyComment