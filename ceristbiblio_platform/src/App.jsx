import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import OpenAlex from "./pages/OpenAlex";
import Results from "./pages/Results";
import Overview from "./pages/Overview";
import Authors from "./pages/Authors";
import Sources from "./pages/Sources";
import Documents from "./pages/Documents";
import './assets/style.css';

const Dashboard = () => <div className="placeholder-page"><h1>Dashboard Content</h1></div>;
const PubMed = () => <div className="placeholder-page"><h1>PubMed Search</h1><p>Coming soon...</p></div>;
const Upload = () => <div className="placeholder-page"><h1>Upload File</h1><p>Coming soon...</p></div>;
const Filter = () => <div className="placeholder-page"><h1>Filter Results</h1><p>Coming soon...</p></div>;
const AIAssistant = () => <div className="placeholder-page"><h1>AI Assistant</h1><p>Coming soon...</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Sidebar/>
      <main className="main-content">
        <Header/> 
        <div className="content-area-wrapper">
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