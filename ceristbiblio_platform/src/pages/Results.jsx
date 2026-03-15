import { useSearch } from '../context/useSearch';
import ResearcherCard from '../components/ResearcherCard';

function Results() {
  const { results, loading } = useSearch();

  if (loading) {
    return <div className="loading-container"><p>Chargement en cours...</p></div>;
  }

  return (
    <div className="results-page">
      <h1>Résultats de Recherche</h1>
      
      {results.length > 0 ? (
        <div className="results-container">
          <p className="results-count">Résultats trouvés: <strong>{results.length}</strong></p>
          <div className="results-grid">
            {results.map((result, index) => (
              <ResearcherCard key={index} data={result} />
            ))}
          </div>
        </div>
      ) : (
        <p className="no-results">Aucun résultat disponible</p>
      )}
    </div>
  );
}

export default Results;
