import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {currentIndex, setCurrentIndex} = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  const fetchCandidates = async (username:string) => {
    setLoading(true);
    const user = await searchGithubUser(username);
    const candidateData = Candidate ={
      Name: user.name || "No Name",
      Username: user.login || "No Username",
      Avatar: user.avatar_url || "No Avatar",
      Location: user.location || "No Location",
      Email: user.email || "No Email",
      Html_url: user.html_url || "No URL",
      Company: user.company || "No Company",
    };
    setCurrentCandidate(candidateData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await searchGithub();
      const transformedData = data.map((user:string) => ({
        Name: user.name || "No Name",
        Username: user.login || "No Username",
        Avatar: user.avatar_url || "No Avatar",
        Location: user.location || "No Location",
        Email: user.email || "No Email",
        Html_url: user.html_url || "No URL",
        Company: user.company || "No Company",
      }));
      setCandidates(transformedData);
      setLoading(false);

      if (transformedData.length > 0) {
        fetchCandidates(transformedData[0].Username);
      }
    };

    fetchCandidates();
  }
  }, []);

  const handleNextCandidate = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      setCurrentIndex(nextIndex);
      fetchCandidate(candidates[nextIndex].Username);
    } else {
      //display message indicating that there are no more candidates.
      setNoMoreCandidates(true);
      setCurrentCandidate(null);
    }
  };

  const addToSavedCandidates = () => {
    if (currentCandidate && !savedCandidates.some(c => c.Username === currentCandidate.Username)) {
      const updatedSavedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      handleNextCandidate();
    }
  };

  const removeFromStorage = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, currentlyOnCandidateList: boolean | null | undefined, title: string | null) => {
    if (currentCandidate) {
      const updatedSavedCandidates = savedCandidates.filter(c => c.Username !== currentCandidate.Username);
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      handleNextCandidate();
    }
  };
  return (
    <div>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : noMoreCandidates ? (
      <p>No further candidates Available.</p>
      ) : (
        currentCandidate && (
          <div>
            <CandidateCard
              currentCandidate={currentCandidate}
              addToSavedCandidates={addToSavedCandidates}
              onCandidateList={true}
              removeFromStorage={removeFromStorage}
            />
          </div>
        )
      )}
    </div>
  );
};


export default CandidateSearch;