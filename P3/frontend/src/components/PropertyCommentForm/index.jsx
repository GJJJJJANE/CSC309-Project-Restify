import { useEffect, useState } from "react";
import axios from "axios";
import GenerateComments from "../generateComments";


const PropertyCommentForm = ( {id, setCommented} ) => {
    const [score, setScore] = useState("");
    const [content, setContent] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        var reservation = id
        var commentData = new FormData();
        commentData.append("score", score)
        commentData.append("content", content)
        try {
            const response = await axios.post(`http://127.0.0.1:8000/comments/${reservation}/writePropertyComment/`, commentData, {
              headers: {
                  "Access-Control-Allow-Origin": 'http://localhost:3000',
                  "Access-Control-Allow-Credentials": 'true',
                  "Content-Type": "multipart/form-data",
                  "Authorization": 'Bearer '+localStorage.getItem('access'),
              },
            })
            .then(response =>{
              alert("You have submitted a comment")
              setCommented(true)
              GenerateComments(reservation, 7);
              console.log(response.data);
          });
          } catch (error) {
            if (error.response.status === 401){alert("Please login first")}
            if (error.response.status === 400){alert("Comment exists!")}
            console.log(error);
          }
    }

return <>
        <form class="row p-3" onSubmit={handleSubmit}>

        <div class="col-md-2">
            <label for="inputscore" class="form-label">Enter Score (1-5)</label>
            <input value={score} onChange={event => setScore(event.target.value)}
            type="text" class="form-control" id="inputscore"></input>
        </div>

        <div class="col-12">
            <div class="mb-3 mt-3">
            <label for="exampleFormControlTextarea1" class="form-label">Provide my Review</label>
            <textarea value={content} onChange={event => setContent(event.target.value)}
            class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit my review</button>
        </div>
        </form>


</>

}

export default PropertyCommentForm