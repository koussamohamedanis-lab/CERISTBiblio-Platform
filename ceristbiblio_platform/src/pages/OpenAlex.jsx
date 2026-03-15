import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from '../context/useSearch';
import { FaSearch, FaSpinner } from "react-icons/fa";
import AdvancedSearchBuilder from '../components/AdvancedSearchBuilder';

function OpenAlex() {
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setResults, setSearchQuery, setLoading } = useSearch();
  const navigate = useNavigate();

  const handleAdvancedSearch = async (searchData) => {
    const { criteria, primaryQuery } = searchData;
    
    if (!primaryQuery.trim()) {
      setError("Veuillez entrer une recherche");
      return;
    }

    setLocalLoading(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/researcher/search/advanced`,
        {
          criteria: criteria,
          primaryQuery: primaryQuery
        }
      );
      console.log("API Response:", response);
      console.log("Results from API:", response.data.results);
      setSearchQuery(primaryQuery);
      setResults(response.data.results || []);
      
      // Store search metadata
      sessionStorage.setItem('searchMetadata', JSON.stringify({
        criteria,
        primaryQuery,
        query: response.data.query || ""
      }));
      
      console.log("State updated - navigating...");
      navigate('/results');
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="openalex-container">
      <div className="openalex-header">
        <h1>Recherche OpenAlex</h1>
        <p>Trouvez des chercheurs, publications et données académiques</p>
      </div>

      <AdvancedSearchBuilder onSearch={handleAdvancedSearch} />

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {localLoading && (
        <div className="loading-container">
          <FaSpinner className="rotating-logo" />
          <p>Recherche en cours...</p>
        </div>
      )}

      {!localLoading && !error && (
        <div className="empty-state">
          <FaSearch className="empty-state-icon" />
          <h3>Commencez votre recherche</h3>
          <p>Utilisez le formulaire ci-dessus pour rechercher des chercheurs</p>
        </div>
      )}
    </div>
  );
}

export default OpenAlex;