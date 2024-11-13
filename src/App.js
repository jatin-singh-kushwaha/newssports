import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Preferences from "./pages/Preferences";
import NewsDetail from "./pages/NewsDetail"; // Create this component later
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
