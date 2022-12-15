import React from "react";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";
import { Link } from "react-router-dom";

export default function Ships() {
  const [data] = useFetch("https://api.spacexdata.com/v4/ships");

  return (
    <>
      {!data ? (
        <LoadingState />
      ) : (
        <section className="py-32 max-width">
          <article>
            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 px-5">
              {data.map(({ id, name, image, home_port }) => (
                <Link to={`/ships/${id}`} key={id}>
                  <article>
                    {image ? (
                      <div className="box-zoom">
                        <div className="box-zoom-image">
                          <img
                            src={image}
                            alt={name}
                            className="h-64 object-cover"
                          ></img>
                        </div>
                      </div>
                    ) : (
                      <div className="box-zoom">
                        <div className="box-zoom-image">
                          <img
                            src="https://i.imgur.com/7VMC0Gn.jpeg"
                            alt={name}
                            className="h-64 object-cover"
                          ></img>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <h2 className="text-white text-xl mb-1">{name}</h2>
                      <p className="text-white opacity-75 ">{home_port}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </article>
        </section>
      )}
    </>
  );
}
