import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function Homebox() {


        return (
          <>
            <section class="bg-secondary vertical_center" id="bg_container">

                <div class="container mt-5 text-white text-center">
                    <h1>Restify.</h1>
                    <p>Start to rest right now! </p>
                </div>
                <div class="container p-5">
                    <div class="row d-flex justify-content-center">
                        <div class="col-mt-12">
                            <div class="card text-bg-light border-light p-4 py-4 text-center">
                                <h5>Just one step search away to find your favorite place ......</h5>
                                
                                <div>
                                <Link to={`/search`}>
                                    <Button variant="outline-dark">Start exploring properties</Button>
                                </Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </>
            
      );

}

export default Homebox;