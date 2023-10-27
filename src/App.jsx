import "./App.css";
import Home from "./assets/pages/Home";
import { Route, Routes } from "react-router-dom";
import Show from "./assets/pages/Show";
import "./style.scss";
import Footer from "./assets/components/Footer";
import Layout from "./assets/components/Layout";
function App() {
  return (
    <>
      <Layout />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Show />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
