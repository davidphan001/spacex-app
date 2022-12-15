import React from "react";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";

export default function Starlinks() {
  const [data] = useFetch("https://api.spacexdata.com/v4/starlink");

  return (
    <>
      {!data ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">Starlink</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data.map(({ id, version, spaceTrack }) => (
              <article
                key={id}
                className="bg-blue-800 rounded-xl p-5 text-white"
              >
                <h2 className="font-bold text-lg">
                  {spaceTrack.OBJECT_NAME}, <span>{version}</span>
                </h2>
                <p className="opacity-75 ">
                  Date Launched: {spaceTrack.LAUNCH_DATE}
                </p>
                <p className="opacity-75 ">
                  Site Launched: {spaceTrack.LAUNCH_SITE}
                </p>
                <p className="opacity-75 mt-8">
                  Comments: {spaceTrack.COMMENT}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
