import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import AiPage from './components/AiPage';
import LocalMultPage from './components/LocalMultPage';
import OnlineMatchUpPage from './components/OnlineMatchUpPage';

function App() {
  return (
    <div className="App bg-indigo-900 bg-fixed min-h-screen">
      <BrowserRouter>
        {/* <Navbar setSearchKey={setSearchKey} setSearchTerm={setSearchTerm}/> */}
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/ai" element={<AiPage/>}/>
          <Route path="/local" element={<LocalMultPage/>}/>
          <Route path="/online" element={<OnlineMatchUpPage/>}/>
          {/* <Route path="/logs" element={<PastLogsPage searchKey={searchKey} searchTerm={searchTerm}/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
