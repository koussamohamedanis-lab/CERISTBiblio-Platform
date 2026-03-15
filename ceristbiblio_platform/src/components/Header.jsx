import { FaSearch, FaUserCircle, FaBell, FaQuestionCircle, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifie si le mode sombre est déjà activé
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="top-navbar">

      <div className="Search-navbar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher des auteurs, publications, DOI..."
        />
      </div>

      <div className="nav-actions">

        <button className="nav-btn" title="Aide">
          <FaQuestionCircle />
        </button>

        <button className="nav-btn" title="Notifications">
          <div className="notification-dot"></div>
          <FaBell />
        </button>

        <div className="nav-divider"></div>

        <div
          className="nav-profile"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaUserCircle className="profile-avatar" />
           <div className="profile-info">
            <span className="user-name">Utilisateur</span>
            <span className="user-role">Chercheur</span>
            </div>

          {isOpen && (
            <div className="profile-dropdown">
              <button className="dropdown-item">Mon Profil</button>
              <button className="dropdown-item">Paramètres</button>
              <button className="dropdown-item" onClick={toggleTheme}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
                <span>{isDarkMode ? 'Mode Clair' : 'Mode Sombre'}</span>
              </button>
              <button className="dropdown-item">Déconnexion</button>
            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Header;