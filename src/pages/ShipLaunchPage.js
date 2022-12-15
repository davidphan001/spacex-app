import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { format } from "date-fns";

export default function ShipLaunchPage() {
  const [launchesInfo, setLaunchesInfo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchLaunchesInfo = async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launches/${id}`
      );
      const data = await response.json();
      setLaunchesInfo(data);
    };
    fetchLaunchesInfo();
  }, [id]);

  return (
    <>
      {!launchesInfo ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-10 md:grid-cols-2 ">
          <article>
            {launchesInfo.links.patch.large ? (
              <img
                src={launchesInfo.links.patch.large}
                alt={launchesInfo.name}
              ></img>
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/001/192/291/small/circle.png"
                alt="empty"
              ></img>
            )}
          </article>
          <article>
            <h1 className="heading">{launchesInfo.name}</h1>
            <h2 className="text-white font-bold text-xl opacity-75 mt-2">
              Launch Date:{" "}
              {format(new Date(launchesInfo.date_local), "dd MMMM yyyy")},{" "}
              {launchesInfo.success ? (
                <span className="text-emerald-500">Successful</span>
              ) : (
                <span className="text-rose-500">Failed</span>
              )}
            </h2>
            <p className="text-white opacity-75 my-10">
              {launchesInfo.details}
            </p>
            <ul className="text-white text-sm opacity-75 mb-8">
              <li className="mb-3">
                Fairings:
                {/* Pairing Ternary Operators */}
                {launchesInfo.fairings
                  ? `${launchesInfo.fairings.reused ? "Reused" : "Not Reused"}`
                  : "No Fairings Used"}
              </li>
              <li className="text-white opacity-75 text-sm ">
                Recovered:{" "}
                {launchesInfo.fairings
                  ? `${
                      launchesInfo.fairings.recovered
                        ? "Recovered"
                        : "Recovery Failed"
                    }`
                  : "No Fairings Used"}
              </li>
            </ul>
            <ul className="flex flex-wrap items-center justify-start gap-8">
              <li>
                {launchesInfo.links.article ? (
                  <a
                    href={launchesInfo.links.article}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Read Article
                  </a>
                ) : (
                  <a
                    href={launchesInfo.links.article}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    No Article Available
                  </a>
                )}
              </li>
              <li>
                {launchesInfo.links.webcast ? (
                  <a
                    href={launchesInfo.links.webcast}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Watch Video
                  </a>
                ) : (
                  <a
                    href={launchesInfo.links.webcast}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    No Video Available
                  </a>
                )}
              </li>
              <Link
                to="/launches"
                className="text-white opacity-75 hover:opacity-100"
              >
                &larr;Back
              </Link>
            </ul>
          </article>
        </section>
      )}
    </>
  );
}
