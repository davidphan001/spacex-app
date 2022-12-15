import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { format } from "date-fns";

export default function RocketPage() {
  const [rocketInfo, setRocketInfo] = useState(null);
  const [imperial, setImperial] = useState(false);
  const [value, setValue] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchRocketInfo = async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/rockets/${id}`
      );
      const data = await response.json();
      setRocketInfo(data);
    };
    fetchRocketInfo();
  }, [id]);
  return (
    <>
      {!rocketInfo ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2 ">
          <article>
            <h1 className="heading">{rocketInfo.name}</h1>
            <h2 className="capitalize text-3xl opacity-75 mt-2 text-white font-bold">
              Type: {rocketInfo.type}
            </h2>
            <h2 className="text-4xl opacity-75 mt-2 text-white font-bold mb-8">
              First Flight Date:
              {format(new Date(rocketInfo.first_flight), "dd MMMM yyyy")}
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-white opacity-75">
              <ul>
                <li>
                  Cost per launch: $
                  {rocketInfo.cost_per_launch.toLocaleString()}
                </li>
                <li>Company: {rocketInfo.company}</li>
                <li>Success Rate: {rocketInfo.success_rate_pct}%</li>
                {rocketInfo.active ? (
                  <li className="text-emerald-500">Active</li>
                ) : (
                  <li className="text-rose-500">Inactive</li>
                )}
              </ul>
              <ul>
                <li>Country: {rocketInfo.country}</li>
                <li>Stages: {rocketInfo.stages}</li>
                {!imperial && (
                  <>
                    <li>Height: {rocketInfo.height.meters}m</li>
                    <li>Diameter: {rocketInfo.diameter.meters}m</li>
                    <li>Mass: {rocketInfo.mass.kg}kg</li>
                  </>
                )}
                {imperial && (
                  <>
                    <li>Height: {rocketInfo.height.feet}ft</li>
                    <li>Diameter: {rocketInfo.diameter.feet}ft</li>
                    <li>Mass: {rocketInfo.mass.lb.toLocaleString()}lb</li>
                  </>
                )}
              </ul>
            </div>
            <p className="text-white opacity-75 mt-5">
              {rocketInfo.description}
            </p>
            <ul className="flex items-center justify-start gap-3 mt-5">
              <li>
                <a
                  href={rocketInfo.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <button className="btn" onClick={() => setImperial(!imperial)}>
                  {imperial ? "Toggle Metric Units" : "Toggle Imperial Units"}
                </button>
              </li>
              <Link
                to="/rockets"
                className="text-white opacity-75 hover:opacity-100"
              >
                &larr; Back
              </Link>
            </ul>
          </article>
          <article>
            <img
              src={rocketInfo.flickr_images[value]}
              alt={rocketInfo.name}
              className="h-full object-cover"
            ></img>
            <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
              {rocketInfo.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setValue(index)}
                  className={`cursor-pointer bg-white ${
                    index === value && "p-1"
                  }`}
                >
                  <img src={image} alt={rocketInfo.name} className="w-20"></img>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  );
}
