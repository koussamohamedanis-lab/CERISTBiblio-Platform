import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// Importation de quelques icônes SVG simples (installe react-icons si ce n'est pas fait)
import { 
  FaHome, FaDatabase, FaFilter, FaChartBar, 
  FaRobot, FaChevronDown 
} from "react-icons/fa";

function Sidebar() {
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, serIsDark]=useState(false);
  const [isApiOpen, setIsApiOpen] = useState(false);

  // Fonction pour gérer le toggle global
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      
      {/* Header - Le clic ici réduit la sidebar */}
      <div className="sidebar_header" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
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
                    className="nav-item sub-dropdown" 
                    onClick={() => setIsApiOpen(!isApiOpen)}
                    style={{ cursor: 'pointer' }}
                    >
                    <div className="btn-content">
                        <span>API</span>
                    </div>
                    <FaChevronDown className={`arrow ${isApiOpen ? 'rotate' : ''}`} style={{ fontSize: '0.7rem' }} />
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
              <FaFilter className="icon-svg" />
              {!isCollapsed && <span>Filter</span>}
             <FaChevronDown className={`arrow ${isFilterOpen ? 'rotate' : ''}`} style={{ fontSize: '0.7rem' }} />
            </div>
          </button>
          {isFilterOpen && !isCollapsed && (
            <div className="submenu">
              <Link to="/filter">Options</Link>
            </div>
          )}
        </div>

        {/* ANALYSIS */}
        <div className="menu-group">
          <button className="nav-item dropdown-btn" onClick={() => !isCollapsed && setIsAnalysisOpen(!isAnalysisOpen)}>
            <div className="btn-content">
              <FaChartBar className="icon-svg" />
              {!isCollapsed && <span>Analysis</span>}
              <FaChevronDown className={`arrow ${isAnalysisOpen ? 'rotate' : ''}`} style={{ fontSize: '0.7rem' }} />
            </div>
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
