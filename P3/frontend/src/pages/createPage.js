import React, { Component } from 'react';
import CreatePropertyForm from '../components/createProperty';
import Navbar from "../components/navbar";


class Create extends Component {
    render() {
        return (
            <>
              <Navbar />

              <CreatePropertyForm />
            </>
      );
    }
}

export default Create;
