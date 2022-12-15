import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";

export default function Dragons() {
  const [dragons, setDragons] = useState([]);

  useEffect(() => {
    const fetchDragons = async () => {
      const response = await fetch("https://api.spacexdata.com/v4/dragons");
      const data = await response.json();
      setDragons(data);
    };
    fetchDragons();
  }, []);
  return (
    <>
      {!dragons ? (
        <LoadingState />
      ) : (
        <section className="py-32">
          <h1 className="heading text-center mb-10">Dragons</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 px-5">
            {dragons.map(({ id, name, flickr_images, description }) => (
              <article key={id}>
                <img
                  src={flickr_images[0]}
                  alt={name}
                  className="h-96 object-cover"
                />
                <div className="bg-zinc-900 p-5">
                  <h2 className="text-white text-lg mb-3 font-bold tracking-wide">
                    {name}
                  </h2>
                  <p className="text-white opacity-75 mb-8">{`${description.substring(
                    0,
                    200
                  )}...`}</p>
                  <Link to={`/dragons/${id}`} className="btn">
                    Read More &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
