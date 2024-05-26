import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailPage from "./views/DetailPage";
import Home from "./views/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/people/:id" element={<DetailPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
