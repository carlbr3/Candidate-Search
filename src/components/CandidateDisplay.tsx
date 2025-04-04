import type React from "react";
import type Candidate from "../interfaces/Candidate.interface";
import { FcPlus, FcCancel } from "react-icons/fc";

type CandidateDisplayProps = {
  currentCandidate: Candidate;
  addToSavedCandidates?: (() => void) | null;
  onCandidateList?: boolean | null;
  removeFromStorage?: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    currentlyOnCandidateList: boolean | null | undefined,
    title: string | null
  ) => void | null;
};

const CandidateCard = ({
  currentCandidate,
  addToSavedCandidates,
  onCandidateList,
  removeFromStorage,
}: CandidateDisplayProps) => {
  return (
    <>
      {currentCandidate.Username ? (
        <section className="candidateCard">
          <figure>
            <img
              src={`${currentCandidate.Avatar}`}
              alt={`${currentCandidate.Username}`}
            />
          </figure>
          <article className="details">
            <h2>{currentCandidate.Name} (Username: {currentCandidate.Username})</h2>
            <p>
              URL: {currentCandidate.Html_url}
            </p>
            <p>
              Location: {currentCandidate.Location}
            </p>
            <p>
              Email: {currentCandidate.Email}
            </p>
            <p>
              Company: {currentCandidate.Company}
            </p>
          </article>

          {onCandidateList ? (
            <aside className="icons">
              <FcPlus
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={addToSavedCandidates || undefined}
              />
              <FcCancel
                style={{ fontSize: "40px", cursor: "pointer" }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onCandidateList,
                    currentCandidate.Name
                  )
                }
              />
            </aside>
          ) : null}
        </section>
      ) : null}
    </>
  );
};

export default CandidateCard;