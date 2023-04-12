//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from './pages/createPage'
import Edit from './pages/editPage'
import PropertyList from './pages/listing'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/list" element={<PropertyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
