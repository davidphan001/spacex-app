import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import {
  Homepage,
  Error,
  Capsules,
  Cores,
  Crew,
  CrewPage,
  Dragons,
  DragonPage,
  Landings,
  ShipLandingPage,
  Launches,
  ShipLaunchPage,
  Launchpads,
  ShipLaunchpadPage,
  Payloads,
  Roadster,
  Rockets,
  RocketPage,
  Ships,
  ShipPage,
  Starlinks,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/spacex-app" element={<Homepage />}></Route>
        <Route path="spacex-app/capsules" element={<Capsules />}></Route>
        <Route path="spacex-app/cores" element={<Cores />}></Route>
        <Route path="spacex-app/crew" element={<Crew />}></Route>
        <Route path="spacex-app/crew/:id" element={<CrewPage />}></Route>
        <Route path="spacex-app/dragons" element={<Dragons />}></Route>
        <Route path="spacex-app/dragons/:id" element={<DragonPage />}></Route>
        <Route path="spacex-app/landings" element={<Landings />}></Route>
        <Route
          path="spacex-app/landings/:id"
          element={<ShipLandingPage />}
        ></Route>
        <Route path="spacex-app/launches" element={<Launches />}></Route>
        <Route
          path="spacex-app/launches/:id"
          element={<ShipLaunchPage />}
        ></Route>
        <Route path="spacex-app/launchpads" element={<Launchpads />}></Route>
        <Route
          path="spacex-app/launchpads/:id"
          element={<ShipLaunchpadPage />}
        ></Route>
        <Route path="spacex-app/payloads" element={<Payloads />}></Route>
        <Route path="spacex-app/roadster" element={<Roadster />}></Route>
        <Route path="spacex-app/rockets" element={<Rockets />}></Route>
        <Route path="spacex-app/rockets/:id" element={<RocketPage />}></Route>
        <Route path="spacex-app/ships" element={<Ships />}></Route>
        <Route path="spacex-app/ships/:id" element={<ShipPage />}></Route>
        <Route path="spacex-app/starlinks" element={<Starlinks />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
