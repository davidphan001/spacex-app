import React, { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";

export default function Homepage() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await fetch("https://api.spacexdata.com/v4/company");
      const data = await response.json();
      setCompany(data);
    };
    fetchCompany();
  }, []);
  return (
    <>
      {!company ? (
        <LoadingState />
      ) : (
        <section className="showcase">
          <div className="overlay">
            <article className="text-white">
              <h1 className="heading text-center">
                Welcome to the SpaceX Database
              </h1>
              <p className="max-w-3xl mx-auto text-center mt-10">
                {company.summary}
              </p>
              <div className="max-width mt-10 bg-white/70 rounded-full pt-1">
                <article>
                  <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5 px-5 text-center text-black">
                    <li className="mb-1 hover:font-bold">
                      <a
                        href={company.links.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        SpaceX
                      </a>
                    </li>
                    <li className="mb-1 hover:font-bold">
                      <a
                        href={company.links.flickr}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Flickr
                      </a>
                    </li>
                    <li className="mb-1 hover:font-bold">
                      <a
                        href={company.links.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Twitter
                      </a>
                    </li>
                    <li className="mb-1 hover:font-bold">
                      <a
                        href={company.links.elon_twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Elon's Twitter
                      </a>
                    </li>
                  </ul>
                </article>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
