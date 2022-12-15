import React, { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    const fetchCapsules = async () => {
      const response = await fetch("https://api.spacexdata.com/v4/capsules");
      const data = await response.json();
      setCapsules(data);
    };
    fetchCapsules();
  }, []);

  return (
    <>
      {!capsules ? (
        <LoadingState />
      ) : (
        <section className="py-32">
          <h1 className="heading text-center mb-10">Capsules</h1>
          <div className=" max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {capsules.map(
              ({
                id,
                type,
                status,
                serial,
                launches,
                last_update,
                land_landings,
                water_landings,
                reuse_count,
              }) => (
                <article key={id} className="articles">
                  <h2 className="text-xl font-bold mb-5">
                    {type},{" "}
                    <span className="text-base opacity-75">{serial}</span>
                  </h2>
                  <ul>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{land_landings} land landings</li>
                    <li className="mb-1">{water_landings} water landings</li>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    {status === "active" ? (
                      <li className="text-emerald-500">Active</li>
                    ) : (
                      <li className="text-rose-500">Inactive</li>
                    )}
                  </ul>
                  <p className="mt-5 opacity-75">{last_update}</p>
                </article>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
}
