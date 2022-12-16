import { Link } from "react-router-dom";
import { HOMEPAGE } from "./RouteInfo";
export default function Error() {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center h-screen">
        <h1>Error | The requested information could not be found</h1>
        <Link to={`/${HOMEPAGE}`} className="btn">
          &larr; Back to Homepage
        </Link>
      </section>
    </>
  );
}
