import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import './assets/style.css';

// Temporary component to prevent crash until you create Dashboard.jsx
const Dashboard = () => <div style={{padding: '20px'}}><h1>Dashboard Content</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
