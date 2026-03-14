function ResearcherCard({ data }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{data.display_name || "Nom inconnu"}</h3>
      <p>ID: {data.id}</p>
    </div>
  );
}
export default ResearcherCard;