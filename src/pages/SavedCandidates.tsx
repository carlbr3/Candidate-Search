import { useState, useEffect } from "react";
import type Candidate from '../interfaces/Candidate.interface';
import {FcCancel} from 'react-icons/fc';
import '../index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedCandidates");
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
    // Fetch saved candidates from the database
    // setSavedCandidates(response.data);
  }, []);

  const handleDelete = (username:string) => {
    const updatedSavedCandidates = savedCandidates.filter((candidate) => candidate.Username !== username);
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedSavedCandidates));
  };

  return (
      <>
        <h1>Potential Candidates</h1>
        {savedCandidates.length > 0 ? (
          <table className='table-container'>
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
                <tr key={candidate.Username}>
                  <td><img src={candidate.Avatar ?? ''} /></td>
                  <td>{candidate.Name}</td>
                  <td>{candidate.Username}</td>
                  <td>{candidate.Location}</td>
                  <td>{candidate.Email}</td>
                  <td>{candidate.Company}</td>
                  <td>
                    <a href={candidate.Html_url ?? undefined} target="_blank" rel="noreferrer">
                      View Profile
                    </a>
                  </td>
                  <td>
                    <button onClick={() => candidate.Username && handleDelete(candidate.Username)}>
                      <FcCancel />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No saved candidates</p>
        )}
      </>
    );
};

export default SavedCandidates;


