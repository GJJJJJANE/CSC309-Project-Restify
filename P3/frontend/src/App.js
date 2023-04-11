//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from './pages/createPage'
import Edit from './pages/editPage'
import Reserve_Host from './pages/Reserve_Host';
import Reserve_Guest from './pages/Reserve_Guest';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/reservations/hostview/" element={<Reserve_Host />} />
        <Route path="/reservations/guestview/" element={<Reserve_Guest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
