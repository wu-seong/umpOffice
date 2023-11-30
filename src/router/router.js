import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Scenario1 from "../pages/scenario1";
import Scenario2 from "../pages/scenario2";
import Header from "../pages/header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/scenario1" element={<Scenario1 />} />
        <Route path="/scenario2" element={<Scenario2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
