import axios from "axios";
import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import ResearcherCard from '../components/ResearcherCard';

function OpenAlex() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Veuillez entrer une recherche");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/researcher/${query}`
      );
      setResults(response.data);
      console.log("Données reçues :", response.data);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="openalex-container">
      <div className="openalex-header">
        <h1>Recherche OpenAlex</h1>
        <p>Trouvez des chercheurs, publications et données académiques</p>
      </div>

      <form className="openalex-search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <FaSearch className="search-icon-input" />
          <input
            type="text"
            placeholder="Rechercher un chercheur, un auteur, une publication..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="search-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="spinner-icon" />
              Recherche...
            </>
          ) : (
            "Rechercher"
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <FaSpinner className="rotating-logo" />
          <p>Recherche en cours...</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="results-container">
          <h2>Résultats ({results.length})</h2>
          <div className="results-grid">
            {results.map((result, index) => (
              <ResearcherCard key={index} data={result} />
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && query && !error && (
        <div className="no-results">
          <p>Aucun résultat trouvé pour "{query}"</p>
        </div>
      )}

      {!loading && results.length === 0 && !query && !error && (
        <div className="empty-state">
          <FaSearch className="empty-state-icon" />
          <p>Commencez par entrer une recherche</p>
        </div>
      )}
    </div>
  );
}

export default OpenAlex;