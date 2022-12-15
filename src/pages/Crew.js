import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";

export default function Crew() {
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchCrew = async () => {
      const response = await fetch("https://api.spacexdata.com/v4/crew");
      const data = await response.json();
      setCrew(data);
    };
    fetchCrew();
  }, []);
  return (
    <>
      {!crew ? (
        <LoadingState />
      ) : (
        <section className="py-32">
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 px-5">
            {crew.map(({ id, name, image }) => (
              <Link key={id} to={`/crew/${id}`}>
                <article className="relative">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-96 w-full object-cover"
                  ></img>
                  <h2 className="absolute bottom-5 left-5 font-bold text-white text-lg tracking-wide">
                    {name}
                  </h2>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
