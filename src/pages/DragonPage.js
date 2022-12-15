import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function DragonPage() {
  const [dragonInfo, setDragonInfo] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [imageValue, setImageValue] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetchDragonInfo = async () => {
      const response = await fetch(
        `https://api.spacexdata.com/v4/dragons/${id}`
      );
      const data = await response.json();
      setDragonInfo(data);
    };
    fetchDragonInfo();
  }, [id]);
  return (
    <>
      <section className="py-32 max-width flex flex-col-reverse md:grid md:grid-cols-2 md:gap-10">
        <article className="mt-8 md:mt-0">
          <h1 className="heading mb-8">{dragonInfo.name}</h1>
          <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 text-white">
            First Flight Date: {dragonInfo.first_flight}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ul className="text-sm text-white opacity-75 capitalize flex flex-col items-start justify-start gap-3">
              <li>Type: {dragonInfo.type}</li>
              <li>Crew: {dragonInfo.crew_capacity}</li>
              {!toggle && <li>Dry Mass: {dragonInfo.dry_mass_kg}kg</li>}
              {toggle && <li>Dry Mass: {dragonInfo.dry_mass_lb}lb</li>}
              {dragonInfo.active ? (
                <li className="text-emerald-500">Active</li>
              ) : (
                <li className="text-rose-500">Inactive</li>
              )}
              <li className="mt-3">
                <a
                  href={dragonInfo.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Wikipedia
                </a>
              </li>
            </ul>
            <ul className="bg-neutral-900 text-white text-sm opacity-75 p-3 rounded">
              <h3 className="font-bold opacity-100 text-lg uppercase mb-3">
                Heat shield details
              </h3>
              <li className="mb-3">
                Material: {dragonInfo.heat_shield?.material}
              </li>
              <li className="mb-3">
                Size: {dragonInfo.heat_shield?.size_meters} meters
              </li>
              <li className="mb-3">
                Temperature: {dragonInfo.heat_shield?.temp_degrees} degrees
              </li>
              <li>Dev Partner: {dragonInfo.heat_shield_dev_partner}</li>
            </ul>
          </div>
          <p className="opacity-75 text-white mt-5 mb-8">
            {dragonInfo.description}
          </p>

          <div className="text-white opacity-75 text-sm">
            {/* Metric Units */}
            {!toggle && (
              <ul className="grid grid-cols-2 gap-3">
                <li>
                  Launch Payload Mass: {dragonInfo.launch_payload_mass?.kg}kg
                </li>
                <li>
                  Return Payload Mass: {dragonInfo.return_payload_mass?.kg}kg
                </li>
                <li>
                  Pressurized Capsule Payload Volume:
                  {dragonInfo.pressurized_capsule?.payload_volume?.cubic_meters}
                  m<sup>3</sup>
                </li>
                <li>Height with Trunk: {dragonInfo.height_w_trunk?.meters}m</li>
                <li>
                  Launch Payload Volume:
                  {dragonInfo.launch_payload_vol?.cubic_meters}m<sup>3</sup>
                </li>
                <li>
                  Return Payload Volume:
                  {dragonInfo.return_payload_vol?.cubic_meters}m<sup>3</sup>
                </li>
                <li>
                  Trunk Volume: {dragonInfo.trunk?.trunk_volume?.cubic_meters}m
                  <sup>3</sup>
                </li>
                <li>Diameter: {dragonInfo.diameter?.meters}m</li>
              </ul>
            )}
            {/* Imperial Units */}

            {toggle && (
              <ul className="grid grid-cols-2 gap-3">
                <li>
                  Launch Payload Mass: {dragonInfo.launch_payload_mass?.lb}lb
                </li>
                <li>
                  Return Payload Mass: {dragonInfo.return_payload_mass?.lb}lb
                </li>
                <li>
                  Pressurized Capsule Payload Volume:{" "}
                  {dragonInfo.pressurized_capsule?.payload_volume?.cubic_feet}
                  ft
                  <sup>3</sup>
                </li>
                <li>Height with Trunk: {dragonInfo.height_w_trunk?.feet}ft</li>
                <li>
                  Launch Payload Volume:{" "}
                  {dragonInfo.launch_payload_vol?.cubic_feet}ft<sup>3</sup>
                </li>
                <li>
                  Return Payload Volume:{" "}
                  {dragonInfo.return_payload_vol?.cubic_feet}ft<sup>3</sup>
                </li>
                <li>
                  Trunk Volume: {dragonInfo.trunk?.trunk_volume?.cubic_feet}ft
                  <sup>3</sup>
                </li>
                <li>Diameter: {dragonInfo.diameter?.feet}ft</li>
              </ul>
            )}
          </div>

          <ul className="mt-8 flex items-center justify-start gap-4">
            <li>
              <button onClick={() => setToggle(!toggle)} className="btn">
                {toggle ? "Show Metric Units" : "Show Imperial Units"}
              </button>
            </li>
            <li>
              <Link
                to="/dragons"
                className="text-white opacity-75 text-sm hover:opacity-100"
              >
                &larr; Back
              </Link>
            </li>
          </ul>
        </article>
        <article>
          <img
            src={
              dragonInfo.flickr_images && dragonInfo.flickr_images[imageValue]
            }
            alt={dragonInfo.name}
            className="h-96 object-cover"
          ></img>
          <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
            {dragonInfo.flickr_images?.map((image, index) => (
              <li
                key={index}
                onClick={() => setImageValue(index)}
                className={`${index === imageValue && "p-1 bg-white"}`}
              >
                <img
                  src={image}
                  alt={dragonInfo.name}
                  className="w-28 h-20 object-cover cursor-pointer"
                ></img>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
