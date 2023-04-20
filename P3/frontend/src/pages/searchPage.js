import React, { Component } from 'react';
import SearchBar from '../components/searchBar';
import SearchList from './searchList';
import Navbar from "../components/navbar";


class SearchPage extends Component {


    render() {
        return (
          <>
            <Navbar />

            <SearchBar />
          </>
            
      );
    }
}

export default SearchPage;