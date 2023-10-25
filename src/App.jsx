import "./App.css";
import Home from "./assets/pages/Home";
import { Route, Routes } from "react-router-dom";
import Show from "./assets/pages/Show";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Show />} />
      </Routes>
    </>
  );
}

export default App;
