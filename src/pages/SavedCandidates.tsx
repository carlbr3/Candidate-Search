import { useState, useEffect } from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { FcCancel } from 'react-icons/fc';
import '../index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (username: string | null) => {
    const updatedSavedCandidates = savedCandidates.filter(candidate => candidate.Username !== username);
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table-container">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Reject Candidate</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.Username || candidate.Email || candidate.Html_url}>
                <td><img src={candidate.Avatar || ''} alt={candidate.Username || 'Avatar'} /></td>
                <td>{candidate.Name}</td>
                <td>{candidate.Username}</td>
                <td>{candidate.Location}</td>
                <td>{candidate.Email}</td>
                <td>{candidate.Company}</td>
                <td>
                  <a href={candidate.Html_url ? String(candidate.Html_url) : '#'} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
                <td>
                  <FcCancel
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={() => handleDelete(candidate.Username)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates found.</p>
      )}
    </>
  );
};

export default SavedCandidates;