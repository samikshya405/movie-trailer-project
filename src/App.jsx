import React from "react";
import Home from "./Component/Home";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./Component/moviePage/MoviePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviePage/:id" element={<MoviePage />} />
      </Routes>
    </>
  );
}

export default App;
