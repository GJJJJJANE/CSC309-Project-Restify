//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from './pages/createPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
