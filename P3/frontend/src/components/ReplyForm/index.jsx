import { useEffect, useState } from "react";
import axios from "axios";


const ReplyForm = ( {id} ) => {

    const [content, setContent] = useState("");
    
    const handleSubmit = async (event) => {
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
            if (error.response.status === 400){alert("Only the host of property can reply to this comment!")}
            console.log(error);
          }
    }

return <>
        <form class="row p-3" onSubmit={handleSubmit}>

        <div class="col-12">
            <div class="mb-3 mt-3">
            <label for="exampleFormControlTextarea1" class="form-label">Provide my reply</label>
            <textarea value={content} onChange={event => setContent(event.target.value)}
            class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit my reply</button>
        </div>
        </form>


</>

}

export default ReplyForm