import React, { useState, useEffect } from "react";
import { Form, FormControl, Button, DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchList from "../pages/searchList";



function SearchBar() {
    //const today = new Date().toISOString().substr(0, 10);
    const [key, setKey] = useState("");
    const [date, setDate] = useState('yyyy-mm-dd');
    const [n_guest, setGuest] = useState(0);
    const [n_bed, setBed] = useState(0);
    const [n_bath, setBath] = useState(0);
    const [order, setOrder] = useState("");
    
    

    function handleSubmit(event) {
        event.preventDefault();
        setKey(key)
        
    }

    function dateornot() {
        if(date == 'yyyy-mm-dd')
           return <SearchList keyword={key} bed={n_bed} bath={n_bath} guest={n_guest} order={order}/>;
        return <SearchList keyword={key} date={date} bed={n_bed} bath={n_bath} guest={n_guest} order={order}/>;
     }     

    
    return (
        
    <div>
    <form onSubmit={handleSubmit}>
        <div className="container mt-10">
            <div className="row my-5"></div>
            
            <div className="row">
                <div className="row mt-2 g-4">
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Quick search again" value={key} onChange={(event) => setKey(event.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <input className="btn btn-outline-secondary" type="submit" />
                    </div>
                    
                    <div className="col-md-3">
                        <select id="inputState" className="form-select" value={order} onChange={(event) => setOrder(event.target.value)}>
                            <option selected>Order by</option>
                            <option>time_new</option>
                            <option>time_old</option>
                            <option>price_high</option>
                            <option>price_low</option>
                        </select>    
                    </div>  
                </div>
            </div>

            <div className="row">
                    <div className="row mt-2 g-4">
                        <div className="col-md-3">
                            <label for="inputArrival" className="form-label">Arrival</label>
                            <input type="date" className="form-control" id="inputArrival" value={date} onChange={(event) => setDate(event.target.value)} />
                        </div>

                        <div className="col-md-3">
                            <label for="inputState" className="form-label">Guests</label>
                            <input type="text" className="form-control" id="guest" value={n_guest} onChange={(event) => setGuest(event.target.value)} />    
                        </div>
            
                        <div className="col-md-3">
                            <label for="Pricelow" className="form-label">Bedrooms</label>
                            <input type="text" id="Pricelow" className="form-control" value={n_bed} onChange={(event) => setBed(event.target.value)} />
                        </div>
                    
                        <div className="col-md-3">
                            <label for="Pricehigh" className="form-label">Bathrooms</label>
                            <input type="text" id="Pricehigh" className="form-control" value={n_bath} onChange={(event) => setBath(event.target.value)} />
                        </div>
                    </div>
                    
                </div>
            </div>
            
    </form>
    <SearchList keyword={key} date={date} bed={n_bed} bath={n_bath} guest={n_guest} order={order}/>
    </div>
  )
}

export default SearchBar;