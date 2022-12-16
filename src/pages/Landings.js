import React from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import useFetch from "../hooks/useFetch";
import { HOMEPAGE } from "./RouteInfo";

export default function Landings() {
  const [data] = useFetch("https://api.spacexdata.com/v4/landpads");

  return (
    <>
      {!data ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">Landings</h1>
          {data && (
            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
              {data.map(({ id, images, full_name, type, details }) => (
                <article key={id}>
                  <img
                    src={images.large[0]}
                    alt={full_name}
                    className="h-64 object-cover"
                  ></img>
                  <div className="bg-neutral-900 p-5">
                    <h2 className="text-white font-bold text-xl mb-5">
                      <span className="opacity-75">{type}</span>,{full_name}
                    </h2>
                    <p className="text-white opacity-75 mb-10">{`${details.substring(
                      0,
                      200
                    )}...`}</p>
                    <Link to={`/${HOMEPAGE}/landings/${id}`} className="btn">
                      Read More &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
