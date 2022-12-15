import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";

export default function ShipLandingPage() {
  const [landingInfo, setLandingInfo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchLandingInfo = async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/landpads/${id}`
      );
      const data = await response.json();
      setLandingInfo(data);
    };
    fetchLandingInfo();
  }, [id]);

  return (
    <>
      {!landingInfo ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
          <article>
            <h1 className="heading">{landingInfo.full_name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 text-white mt-2">
              {landingInfo.name}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <ul className="flex flex-col items-start justify-start gap-3 text-white opacity-75 text-small">
                <li>{landingInfo.launches.length} launches</li>
                <li>{landingInfo.landing_successes} landings</li>
                {landingInfo.status === "active" ? (
                  <li className="text-emerald-500 capitalize">
                    {landingInfo.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    {landingInfo.status}
                  </li>
                )}
              </ul>
              <ul className="text-sm text-white">
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <li className="opacity-75 mb-3">
                  Locality: {landingInfo.locality}
                </li>
                <li className="opacity-75">Region: {landingInfo.region}</li>
              </ul>
            </div>
            <p className="text-white opacity-75 mt-10">{landingInfo.details}</p>
            <ul className="flex items-center justify-start gap-3 mt-10">
              <li>
                <a
                  href={landingInfo.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <Link
                  to="/landings"
                  className="text-white text-sm opacity-75 hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>
          <article>
            <img
              src={landingInfo.images.large[0]}
              alt={landingInfo.full_name}
              className="h-full"
            ></img>
          </article>
        </section>
      )}
    </>
  );
}
