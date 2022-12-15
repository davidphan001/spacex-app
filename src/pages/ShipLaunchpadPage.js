import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";

export default function ShipLaunchpadPage() {
  const [launchpadInfo, setLaunchpadInfo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchLaunchpadInfo = async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launchpads/${id}`
      );
      const data = await response.json();
      setLaunchpadInfo(data);
    };
    fetchLaunchpadInfo();
  }, [id]);

  return (
    <>
      {!launchpadInfo ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className="heading">{launchpadInfo.full_name}</h1>
            <h2 className="text-white text-2xl opacity-75 font-bold mt-5">
              {launchpadInfo.name}
            </h2>

            <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <ul className="text-white opacity-75 text-sm flex flex-col items-start justify-start gap-3">
                <li>{launchpadInfo.launch_attempts} Launches</li>
                <li>{launchpadInfo.launch_successes} Successful Launches</li>
                {launchpadInfo.status === "active" ? (
                  <li className="text-emerald-500 capitalize">
                    {launchpadInfo.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    {launchpadInfo.status}
                  </li>
                )}
              </ul>
              <ul className="text-white">
                <h3 className="text-white font-bold text-lg mb-1">Region</h3>
                <li className="text-sm opacity-75 mb-2">
                  Locality: {launchpadInfo.locality}
                </li>
                <li className="text-sm opacity-75">
                  Region: {launchpadInfo.region}
                </li>
              </ul>
            </div>
            <p className="text-white opacity-75 mb-10">
              {launchpadInfo.details}
            </p>
            <ul>
              <li>
                <Link
                  to="/launchpads"
                  className="text-white opacity-75 text-sm hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>
          <article>
            <img
              src={launchpadInfo.images.large[0]}
              alt={launchpadInfo.name}
              className="h-full object-cover"
            ></img>
          </article>
        </section>
      )}
    </>
  );
}
