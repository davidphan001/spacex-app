import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { HOMEPAGE } from "./RouteInfo";

export default function CrewPage() {
  const [crewInfo, setCrewInfo] = useState([]);
  const { id } = useParams();

  // useEffect will run every time the id changes
  useEffect(() => {
    const fetchCrewInfo = async () => {
      const response = await fetch(`https://api.spacexdata.com/v4/crew/${id}`);
      const data = await response.json();
      setCrewInfo(data);
    };
    fetchCrewInfo();
  }, [id]);
  return (
    <>
      {!crewInfo ? (
        <LoadingState />
      ) : (
        <section className="py-32">
          <div className="max-width grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 px-5">
            <article>
              <img src={crewInfo.image} alt={crewInfo.name}></img>
            </article>
            <article>
              <h1 className="heading mb-10">{crewInfo.name}</h1>
              <h2 className="font-bold text-white mb-5 text-lg">Details</h2>
              <ul className="text-white opacity-75 text-sm">
                <li className="mb-2">Currently at {crewInfo.agency}</li>
                <li className="mb-2">{crewInfo.launches?.length} launches</li>
                {crewInfo.status === "active" ? (
                  <li className="text-emerald-500 capitalize ">
                    Status: {crewInfo.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    Status: {crewInfo.status}
                  </li>
                )}
              </ul>
              <ul className="flex items-center justify-start gap-5 mt-10">
                <li>
                  <a
                    href={crewInfo.wikipedia}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Wikipedia
                  </a>
                </li>
                <li className="text-white opacity-75 text-sm hover:opacity-100">
                  <Link to={`/${HOMEPAGE}/crew`}>&larr; Back</Link>
                </li>
              </ul>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
