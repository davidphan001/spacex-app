import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";

export default function ShipPage() {
  const [shipInfo, setShipInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchShipInfo = async () => {
      const response = await fetch(`https://api.spacexdata.com/v4/ships/${id}`);
      const data = await response.json();
      setShipInfo(data);
    };
    fetchShipInfo();
  }, [id]);

  return (
    <>
      {!shipInfo ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width grid grids-cols-1 gap-8 md:grid-cols-2 px-5">
          <article>
            {shipInfo.image ? (
              <img
                src={shipInfo.image}
                alt={shipInfo.name}
                className="h-full object-cover rounded-lg"
              ></img>
            ) : (
              <img
                src="https://i.imgur.com/7VMC0Gn.jpeg"
                alt={shipInfo.name}
                className="h-full object-cover rounded-lg"
              ></img>
            )}
          </article>
          <article>
            <h1 className="heading mb-2">{shipInfo.name}</h1>
            {shipInfo.year_built ? (
              <h2 className="text-lg align-middle text-white font-bold opacity-75 my-3">
                Year Built: {shipInfo.year_built}
              </h2>
            ) : (
              ""
            )}
            <ul className="text-white text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-start justify-start gap-3 mt-3">
              {shipInfo.status ? (
                <li className="text-emerald-500">Active</li>
              ) : (
                <li className="text-rose-500">Inactive for SpaceX</li>
              )}
              <li className="text-white">
                Launched: {shipInfo.launches.length} times
              </li>
              {shipInfo.mass_lbs ? (
                <li className="text-white">Mass: {shipInfo.mass_lbs}lbs</li>
              ) : (
                <li>No mass reported</li>
              )}
              <li>Home port: {shipInfo.home_port}</li>
              <li>Type: {shipInfo.type}</li>
            </ul>
            <ul className="mt-8 flex items-center justify-start gap-3 mb-8">
              <li>
                <a
                  href={shipInfo.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn hover:bg-white hover:text-black"
                >
                  More Info
                </a>
              </li>
            </ul>
          </article>
        </section>
      )}
    </>
  );
}
