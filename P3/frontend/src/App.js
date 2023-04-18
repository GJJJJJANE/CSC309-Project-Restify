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
import PropertyCommentPage from './pages/PropertyCommentList';
import PropertyDetailPage from './pages/propertyDetail';
import Login from './pages/login';
import Register from './pages/register';
import CreateProfile from './pages/createProfile';
import ViewProfile from './pages/profile';
import EditProfile from './pages/editProfile';
import EditPassword from './pages/editPassword';
import Logout from './pages/logout';



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
        <Route path="/comments/property/:propertyid" element={<PropertyCommentPage />} />
        {/* User URL */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
        <Route path="/editPassword" element={<EditPassword />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
