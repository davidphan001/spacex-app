import React from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import useFetch from "../hooks/useFetch";
import { HOMEPAGE } from "./RouteInfo";

export default function Launches() {
  const [data] = useFetch("https://api.spacexdata.com/v4/launches");
  return (
    <>
      {!data ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10"> Launches </h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 px-5">
            {data.map(({ id, name, links, details }) => (
              <Link
                to={`/${HOMEPAGE}/launches/${id}`}
                key={id}
                className="p-5 rounded-2xl bg-blue-800"
              >
                <article>
                  {links.patch.large ? (
                    <img src={links.patch.large} alt={name}></img>
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/001/192/291/small/circle.png"
                      alt="empty"
                    ></img>
                  )}
                  <h2 className="font-bold text-white mt-5 mb-3 text-xl">
                    {name}
                  </h2>
                  {details && (
                    <p className="opacity-75 text-white">{`${details.substring(
                      0,
                      50
                    )}...`}</p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
