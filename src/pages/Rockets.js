import React from "react";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";
import { Link } from "react-router-dom";

export default function Rockets() {
  const [data] = useFetch("https://api.spacexdata.com/v4/rockets");

  return (
    <>
      {!data ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width">
          <article>
            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
              {data.map(({ id, name, flickr_images, description }) => (
                <article key={id} className="bg-blue-800">
                  <img
                    src={flickr_images[0]}
                    alt={name}
                    className="h-64 object-cover"
                  ></img>
                  <div className="p-5">
                    <h2 className="font-bold text-white mb-3 text-lg">
                      {name}
                    </h2>
                    <p className="text-white opacity-75 mb-10">{`${description.substring(
                      0,
                      100
                    )}...`}</p>
                    <Link to={`/rockets/${id}`} className="btn">
                      Read More &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>
      )}
    </>
  );
}
