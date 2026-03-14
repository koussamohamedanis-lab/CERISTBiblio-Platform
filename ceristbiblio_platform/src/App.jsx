import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import OpenAlex from "./pages/openalex";
import './assets/style.css';

const Dashboard = () => <div style={{padding: '20px', color: 'white'}}><h1>Dashboard Content</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Sidebar/>
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <Header/> 
        <div className="content-area" style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/openalex" element={<OpenAlex />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;