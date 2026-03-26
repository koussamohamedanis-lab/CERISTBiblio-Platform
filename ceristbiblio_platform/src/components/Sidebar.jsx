import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// Importation de quelques icônes SVG simples (installe react-icons si ce n'est pas fait)
import { 
  FaHome, FaDatabase, FaCompass, FaChartBar, 
  FaRobot, FaChevronDown 
} from "react-icons/fa";

function Sidebar() {
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isApiOpen, setIsApiOpen] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      
      {/* Header */}
      <div className="sidebar_header" onClick={toggleSidebar}>
        <div className="logo_wrapper">
          <img src={Logo} alt="Logo" className="logo-img" />
          {!isCollapsed && (
            <div className="header-text">
              <h2 className="brand-name">CeristBiblio-Platform</h2>
              <span>PFE Licence L3</span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar_content">
        
        {/* HOME */}
        <NavLink to="/" className="nav-item">
          <FaHome className="icon-svg" />
          {!isCollapsed && <span>Home</span>}
        </NavLink>

        {!isCollapsed && <p className="section-title">NIVEAUX D'ANALYSE</p>}

        {/* DATA */}
        <div className={`menu-group ${isDataOpen && !isCollapsed ? "open" : ""}`}>
          <button className="nav-item dropdown-btn" onClick={() => !isCollapsed && setIsDataOpen(!isDataOpen)}>
            <div className="btn-content">
              <FaDatabase className="icon-svg" />
              {!isCollapsed && <span>Data</span>}
            </div>
            {!isCollapsed && <FaChevronDown className={`arrow ${isDataOpen ? 'rotate' : ''}`} />}
          </button>

          {isDataOpen && !isCollapsed && (
            <div className="submenu">
               
                <div 
                    className="nav-item sub-dropdown cursor-pointer" 
                    onClick={() => setIsApiOpen(!isApiOpen)}
                    >
                    <div className="btn-content">
                        <span>API</span>
                    </div>
                    <FaChevronDown className={`arrow arrow-small ${isApiOpen ? 'rotate' : ''}`} />
                    </div>

                 
                    {isApiOpen && (
                    <div className="sub-submenu">
                        <Link to="/openalex">OpenAlex</Link>
                        <Link to="/pubmed">PubMed</Link>
                    </div>
                    )}
              <Link to="/upload">Upload File</Link>
            </div>
          )}
        </div>

        {/* FILTER */}
        <div className="menu-group">
          <button className="nav-item dropdown-btn" onClick={() => !isCollapsed && setIsFilterOpen(!isFilterOpen)}>
            <div className="btn-content">
              <FaCompass className="icon-svg" />
              {!isCollapsed && <span>Explore</span>}
            </div>
            <FaChevronDown className={`arrow arrow-small ${isFilterOpen ? 'rotate' : ''}`} />
          </button>
          {isFilterOpen && !isCollapsed && (
            <div className="submenu">
              <Link to="/results">Results</Link>
            </div>
          )}
        </div>

        {/* ANALYSIS */}
        <div className="menu-group">
          <button className="nav-item dropdown-btn" onClick={() => !isCollapsed && setIsAnalysisOpen(!isAnalysisOpen)}>
            <div className="btn-content">
              <FaChartBar className="icon-svg" />
              {!isCollapsed && <span>Analysis</span>}
            </div>
            <FaChevronDown className={`arrow arrow-small ${isAnalysisOpen ? 'rotate' : ''}`} />
          </button>
          {isAnalysisOpen && !isCollapsed && (
            <div className="submenu">
              <Link to="/overview">Overview</Link>
              <Link to="/sources">Sources</Link>
              <Link to="/authors">Authors</Link>
              <Link to="/documents">Documents</Link>
            </div>
          )}
        </div>

        {/* AI */}
        <NavLink to="/ai" className="nav-item ai-link">
          <FaRobot className="icon-svg" />
          {!isCollapsed && <span>AI Assistant</span>}
        </NavLink>
        


      </div>
    </aside>
  );
}

export default Sidebar;