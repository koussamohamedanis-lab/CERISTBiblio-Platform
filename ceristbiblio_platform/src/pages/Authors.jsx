import React from 'react';
import { useSearch } from '../context/useSearch';
import ResearcherCard from '../components/ResearcherCard';

function Authors() {
  const { results, setSelectedAuthor, selectedAuthor } = useSearch();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Chercheurs</h1>
        <p>Analysez les profils et sélectionnez un chercheur pour explorer ses publications</p>
      </div>

      {results.length > 0 ? (
        <div className="authors-section">
          <div className="authors-info">
            <span className="authors-badge">{results.length} chercheurs trouvés</span>
            {selectedAuthor && (
              <span className="selection-badge">
                {selectedAuthor.display_name} sélectionné
              </span>
            )}
          </div>
          <div className="authors-grid">
            {results.map((author) => (
              <div 
                key={author.id} 
                className={`author-card-wrapper ${selectedAuthor?.id === author.id ? 'selected' : ''}`}
                onClick={() => setSelectedAuthor(author)}
              >
                <ResearcherCard data={author} />
                <div className="card-footer">
                  {selectedAuthor?.id === author.id ? (
                    <span className="badge-selected">Sélectionné</span>
                  ) : (
                    <span className="badge-clickable">Cliquer pour analyser</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state-full">
          <h2>Aucun chercheur trouvé</h2>
          <p>Effectuez une recherche pour commencer</p>
        </div>
      )}
    </div>
  );
}

export default Authors;