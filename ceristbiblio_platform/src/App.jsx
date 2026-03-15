import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import OpenAlex from "./pages/OpenAlex";
import Results from "./pages/Results";
import './assets/style.css';

const Dashboard = () => <div style={{padding: '20px', color: 'white'}}><h1>Dashboard Content</h1></div>;
const PubMed = () => <div style={{padding: '20px', color: 'white'}}><h1>PubMed Search</h1><p>Coming soon...</p></div>;
const Upload = () => <div style={{padding: '20px', color: 'white'}}><h1>Upload File</h1><p>Coming soon...</p></div>;
const Filter = () => <div style={{padding: '20px', color: 'white'}}><h1>Filter Results</h1><p>Coming soon...</p></div>;
const Overview = () => <div style={{padding: '20px', color: 'white'}}><h1>Overview</h1><p>Coming soon...</p></div>;
const Sources = () => <div style={{padding: '20px', color: 'white'}}><h1>Sources</h1><p>Coming soon...</p></div>;
const Authors = () => <div style={{padding: '20px', color: 'white'}}><h1>Authors</h1><p>Coming soon...</p></div>;
const Documents = () => <div style={{padding: '20px', color: 'white'}}><h1>Documents</h1><p>Coming soon...</p></div>;
const AIAssistant = () => <div style={{padding: '20px', color: 'white'}}><h1>AI Assistant</h1><p>Coming soon...</p></div>;

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
            <Route path="/results" element={<Results />} />
            <Route path="/pubmed" element={<PubMed />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/ai" element={<AIAssistant />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;