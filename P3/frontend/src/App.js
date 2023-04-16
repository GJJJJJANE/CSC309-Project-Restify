//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from './pages/createPage'
import Edit from './pages/editPage'
import Reserve_Host from './pages/Reserve_Host';
import Reserve_Guest from './pages/Reserve_Guest';
import PropertyList from './pages/listing';
import SearchPage from './pages/searchPage';
import GuestCommentPage from './pages/GuestCommentList';
import PropertyDetailPage from './pages/propertyDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/reservations/hostview/" element={<Reserve_Host />} />
        <Route path="/reservations/guestview/" element={<Reserve_Guest />} />
        <Route path="/list" element={<PropertyList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/comments/guest/:guestid/" element={<GuestCommentPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
