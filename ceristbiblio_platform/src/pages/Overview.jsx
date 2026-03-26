import React from 'react';
import { useSearch } from '../context/useSearch';

function Overview() {
  const { results, selectedAuthor, setSelectedAuthor } = useSearch();

  const dataToAnalyze = selectedAuthor ? [selectedAuthor] : results;

  const getYearlyStats = () => {
    const yearMap = {};
    dataToAnalyze.forEach(author => {
      author.counts_by_year?.forEach(entry => {
        const year = entry.year;
        const count = entry.works_count;
        yearMap[year] = (yearMap[year] || 0) + count;
      });
    });
    return Object.entries(yearMap)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => b.year - a.year)
      .slice(0, 10);
  };

  const getTopicsStats = () => {
    const topicsMap = {};
    dataToAnalyze.forEach(author => {
      author.x_concepts?.forEach(concept => {
        topicsMap[concept.display_name] = (topicsMap[concept.display_name] || 0) + 1;
      });
    });
    return Object.entries(topicsMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const getInstitutionsStats = () => {
    const institutionsMap = {};
    dataToAnalyze.forEach(author => {
      author.last_known_institutions?.forEach(inst => {
        const instName = inst.display_name || 'Unknown';
        institutionsMap[instName] = (institutionsMap[instName] || 0) + 1;
      });
    });
    return Object.entries(institutionsMap)
      .map(([institution, count]) => ({ institution, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const getWorksStats = () => {
    const totalWorks = dataToAnalyze.reduce((sum, author) => sum + (author.works_count || 0), 0);
    const totalCitations = dataToAnalyze.reduce((sum, author) => sum + (author.cited_by_count || 0), 0);
    const avgHIndex = dataToAnalyze.length > 0 
      ? (dataToAnalyze.reduce((sum, author) => sum + (author.summary_stats?.h_index || 0), 0) / dataToAnalyze.length).toFixed(1)
      : 0;
    return { totalWorks, totalCitations, avgHIndex };
  };

  const getMaxValue = (data, key) => {
    return data.length > 0 ? Math.max(...data.map(item => item[key])) : 0;
  };

  const yearlyStats = getYearlyStats();
  const topicsStats = getTopicsStats();
  const institutionsStats = getInstitutionsStats();
  const worksStats = getWorksStats();

  const maxYearCount = getMaxValue(yearlyStats, 'count');
  const maxTopicCount = getMaxValue(topicsStats, 'count');
  const maxInstitutionCount = getMaxValue(institutionsStats, 'count');

  return (
    <div className="page-container">
      <div className="page-header">
        {selectedAuthor ? (
          <>
            <div className="header-with-button">
              <div>
                <h1>Analyse Détaillée</h1>
                <p>{selectedAuthor.display_name}</p>
              </div>
              <button className="btn-back-analysis" onClick={() => setSelectedAuthor(null)}>
                Voir tout
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Analyse Globale</h1>
            <p>Exploration des données de recherche scientifique</p>
          </>
        )}
      </div>

      <div className="overview-stats-boxes">
        <div className="stat-box">
          <div className="stat-label">Publications Totales</div>
          <div className="stat-value">{worksStats.totalWorks}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Citations Totales</div>
          <div className="stat-value">{worksStats.totalCitations}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">H-Index Moyen</div>
          <div className="stat-value">{worksStats.avgHIndex}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Chercheurs</div>
          <div className="stat-value">{dataToAnalyze.length}</div>
        </div>
      </div>

      <div className="overview-charts-grid">
        <div className="chart-card yearly-chart-card">
          <h3>Évolution des Publications par Année</h3>
          <div className="yearly-chart-container">
            {yearlyStats.length > 0 ? (
              <div className="yearly-bars">
                {yearlyStats.map(stat => (
                  <div key={stat.year} className="yearly-item">
                    <div className="year-label">{stat.year}</div>
                    <div className="bar-section">
                      <div className="chart-bar-wrapper">
                        <div 
                          className="chart-bar"
                          style={{ width: `${(stat.count / maxYearCount) * 100}%` }}
                          title={`${stat.year}: ${stat.count} publications`}
                        ></div>
                      </div>
                      <div className="bar-value">{stat.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-chart">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Sujets de Recherche</h3>
          <div className="chart-container">
            {topicsStats.length > 0 ? (
              topicsStats.map((stat, idx) => (
                <div key={idx} className="list-item">
                  <span className="item-label">{stat.topic}</span>
                  <div className="bar-wrapper">
                    <div 
                      className="bar"
                      style={{ width: `${(stat.count / maxTopicCount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="item-count">{stat.count}</span>
                </div>
              ))
            ) : (
              <p className="empty-chart">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Institutions Affiliées</h3>
          <div className="chart-container">
            {institutionsStats.length > 0 ? (
              institutionsStats.map((stat, idx) => (
                <div key={idx} className="list-item">
                  <span className="item-label">{stat.institution}</span>
                  <div className="bar-wrapper">
                    <div 
                      className="bar"
                      style={{ width: `${(stat.count / maxInstitutionCount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="item-count">{stat.count}</span>
                </div>
              ))
            ) : (
              <p className="empty-chart">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Résumé Général</h3>
          <div className="summary-list">
            <div className="summary-item">
              <span className="summary-label">Nombre de chercheurs:</span>
              <span className="summary-value">{dataToAnalyze.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total des publications:</span>
              <span className="summary-value">{worksStats.totalWorks}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total des citations:</span>
              <span className="summary-value">{worksStats.totalCitations}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">H-Index moyen:</span>
              <span className="summary-value">{worksStats.avgHIndex}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Sujets uniques:</span>
              <span className="summary-value">{topicsStats.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Institutions uniques:</span>
              <span className="summary-value">{institutionsStats.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;