import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const stopScroll = (value) => {
    if (value === true) {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "unset";
      }
    }
  };

  const linkButton = (name) => {
    return (
      <Link
        to={`spacex-app/${name}`}
        className="text-white link-underline text-xl lg:text-4xl"
        onClick={() => {
          setIsOpen(!isOpen);
          stopScroll(!isOpen);
        }}
      >
        {name}
      </Link>
    );
  };

  return (
    <>
      <header className="fixed flex px-10 w-full z-50">
        <div className="z-50">
          <Link
            to="/spacex-app"
            onClick={() => {
              setIsOpen(false);
              stopScroll(false);
            }}
          >
            <SiSpacex className="text-8xl text-white" />
          </Link>
        </div>
        <div className="flex justify-center z-50">
          <button
            className="text-white text-lg uppercase tracking-tight hover:tracking-widest hover:font-bold transition-all duration-500"
            onClick={() => {
              setIsOpen(!isOpen);
              stopScroll(!isOpen);
            }}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <div
        className={
          isOpen
            ? "flex-col flex p-10 items-start fixed inset-0 uppercase bg-black/70 backdrop-blur-md gap-8 justify-center z-20 m-5 transition-all duration-1000"
            : "fixed robbowen"
        }
      >
        <ul className="max-width grid grid-cols-2 gap-8 md:grid-cols-2 md:gap-10 px-5 text-center">
          <li>{linkButton("Ships")}</li>
          <li>{linkButton("Crew")}</li>
          <li>{linkButton("Cores")}</li>
          <li>{linkButton("Rockets")}</li>
          <li>{linkButton("Dragons")}</li>
          <li>{linkButton("Landings")}</li>
          <li>{linkButton("Payloads")}</li>
          <li>{linkButton("Capsules")}</li>
          <li>{linkButton("Launches")}</li>
          <li>{linkButton("Starlinks")}</li>
          <li>{linkButton("Roadster")}</li>
          <li>{linkButton("Launchpads")}</li>
        </ul>
      </div>
    </>
  );
}
