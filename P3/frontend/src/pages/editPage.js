import React, { Component } from 'react';
import EditPropertyForm from '../components/editProperty';
import Navbar from "../components/navbar";


class Edit extends Component {
    render() {
        return (
            <>
              <Navbar/>

              <EditPropertyForm />
            </>
      );
    }
}

export default Edit;
