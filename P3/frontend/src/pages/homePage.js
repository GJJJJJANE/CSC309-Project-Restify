import React, { Component } from 'react';
import SearchBar from '../components/searchBar';
import SearchList from './searchList';
import Navbar from "../components/navbar";
import Homebox from '../components/homebox';


class HomePage extends Component {


    render() {
        return (
          <>
            <Navbar />

            <Homebox />
          </>
            
      );
    }
}

export default HomePage;