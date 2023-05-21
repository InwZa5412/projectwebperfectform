import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNews from "./MainNews";
import GameNews from "./GameNews";
import SportNews from "./SportNews";

export const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainNews />} />
        <Route path="/game" element={<GameNews />} />
        <Route path="/sport" element={<SportNews />} />
      </Routes>
    </Router>
  );
}