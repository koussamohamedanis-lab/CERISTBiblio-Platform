function ResearcherCard({ data }) {
  if (!data) return null;

  const hIndex = data.summary_stats?.h_index || "N/A";
  const works = data.works_count || 0;
  const citations = data.cited_by_count || 0;
  const affiliation = data.last_known_institutions?.[0]?.display_name || "Unknown";
  const profileUrl = data.id || "#";

  return (
    <div className="researcher-card">
      <h3 className="researcher-name">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          {data.display_name || "Unknown Researcher"}
        </a>
      </h3>
      
      <div className="researcher-stats">
        <div className="stat-item"><strong>H-Index:</strong> {hIndex}</div>
        <div className="stat-item"><strong>Works:</strong> {works}</div>
        <div className="stat-item"><strong>Citations:</strong> {citations}</div>
        <div className="stat-item"><strong>Affiliation:</strong> {affiliation}</div>
      </div>

      {data.counts_by_year && data.counts_by_year.length > 0 && (
        <p className="researcher-year">Active since: {data.counts_by_year[0]?.year || 'N/A'}</p>
      )}
    </div>
  );
}

export default ResearcherCard;