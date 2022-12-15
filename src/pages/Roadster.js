import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";
import { format } from "date-fns";

export default function Roadster() {
  const [data] = useFetch("https://api.spacexdata.com/v4/roadster");
  const [value, setValue] = useState(0);

  return (
    <>
      {!data ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">The Starman</h1>
          <div>
            <article>
              <div className="flex flex-col">
                <img src={data.flickr_images[value]} alt="Starman"></img>
                <ul className="flex  items-center justify-start gap-3 flex-wrap my-5">
                  {data.flickr_images.map((image, index) => (
                    <li
                      key={index}
                      onClick={() => setValue(index)}
                      className={`cursor-pointer bg-white ${
                        value === index && "p-1"
                      }`}
                    >
                      <img src={image} alt="Starman" className="w-20"></img>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white opacity-75">{data.details}</p>
                <ul className="text-white opacity-75 text-sm mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:mt-10 mb-5">
                  <li>
                    Launch Date:{" "}
                    {format(new Date(data.launch_date_utc), "dd MMMM yyyy")}
                  </li>
                  <li>
                    Launch Mass: {data.launch_mass_lbs.toLocaleString()}lbs
                  </li>
                  <li>Days Since Launch: {Math.floor(data.period_days)}</li>
                  <li>
                    Speed: {Math.floor(data.speed_mph).toLocaleString()} mph
                  </li>
                  <li>
                    Distance from the Earth:
                    {Math.round(data.earth_distance_mi).toLocaleString()} miles
                  </li>
                </ul>
                <ul className="flex flex-wrap items-center justify-start gap-8">
                  <li>
                    <a
                      href={data.wikipedia}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                    >
                      Wikipedia
                    </a>
                  </li>
                  <li>
                    <a
                      href={data.video}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                    >
                      Watch Video
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
