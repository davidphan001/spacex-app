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
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/capsules" element={<Capsules />}></Route>
        <Route path="/cores" element={<Cores />}></Route>
        <Route path="/crew" element={<Crew />}></Route>
        <Route path="/crew/:id" element={<CrewPage />}></Route>
        <Route path="/dragons" element={<Dragons />}></Route>
        <Route path="/dragons/:id" element={<DragonPage />}></Route>
        <Route path="/landings" element={<Landings />}></Route>
        <Route path="/landings/:id" element={<ShipLandingPage />}></Route>
        <Route path="/launches" element={<Launches />}></Route>
        <Route path="/launches/:id" element={<ShipLaunchPage />}></Route>
        <Route path="/launchpads" element={<Launchpads />}></Route>
        <Route path="/launchpads/:id" element={<ShipLaunchpadPage />}></Route>
        <Route path="/payloads" element={<Payloads />}></Route>
        <Route path="/roadster" element={<Roadster />}></Route>
        <Route path="/rockets" element={<Rockets />}></Route>
        <Route path="/rockets/:id" element={<RocketPage />}></Route>
        <Route path="/ships" element={<Ships />}></Route>
        <Route path="/ships/:id" element={<ShipPage />}></Route>
        <Route path="/starlinks" element={<Starlinks />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
