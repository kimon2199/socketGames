import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import AiPage from './components/AiPage';
import LocalMultPage from './components/LocalMultPage';

function App() {
  return (
    <div className="App bg-indigo-900 bg-fixed h-100">
      <BrowserRouter>
        {/* <Navbar setSearchKey={setSearchKey} setSearchTerm={setSearchTerm}/> */}
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/ai" element={<AiPage/>}/>
          <Route path="/local" element={<LocalMultPage/>}/>
          <Route path="/online" element={<HomePage/>}/>
          {/* <Route path="/logs" element={<PastLogsPage searchKey={searchKey} searchTerm={searchTerm}/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
