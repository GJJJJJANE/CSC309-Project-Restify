
import { useEffect, useState } from "react";

const CommentCard = ({ comment }) => {

    var stars = [];
    for (var i = 0; i < comment.score; i++) {
        stars.push(<svg key={comment.id+i} xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>);
    }

    var dt = new Date(comment.modified).toLocaleString('en-US', {hour12: false})
    
    return <>
    <div class="card mb-3">
                        <div class="row g-0">
                        {/* <div class="col-md-2">
                            <img src="avatar.jpg" class="img-fluid p-3" alt="...">
                        </div> */}
        
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">{comment.host_name}</h5>
                            <small class="text-muted">Previous host</small><br></br>
                            {stars}
                            <br></br>
                            <span>{comment.content}</span><br></br>
                            <p class="card-text"><small class="text-muted"> {dt} </small></p>
                            
                        </div>
                        </div>
                        </div>
                        </div>
                    </>

}

export default CommentCard