import React, { useState, useEffect } from "react";
import "./Filter.css";

const Filter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("currentFilter");
    return storedFilter || "now_playing";
  });

  useEffect(() => {
    const storedFilter = localStorage.getItem("currentFilter");
    if (storedFilter && storedFilter !== filter) {
      setFilter(storedFilter);
    }
  }, [filter]);

  const handleButtonClick = (newFilter) => {
    setFilter(newFilter);
    onFilterChange(newFilter);
    localStorage.setItem("currentFilter", newFilter);
  };

  return (
    <div className="btn-group">
      <button
        className={filter === "now_playing" ? "active" : ""}
        onClick={() => handleButtonClick("now_playing")}
      >
        New Playing
      </button>
      <button
        className={filter === "popular" ? "active" : ""}
        onClick={() => handleButtonClick("popular")}
      >
        Popular
      </button>
      <button
        className={filter === "top_rated" ? "active" : ""}
        onClick={() => handleButtonClick("top_rated")}
      >
        Top Rated
      </button>
      <button
        className={filter === "upcoming" ? "active" : ""}
        onClick={() => handleButtonClick("upcoming")}
      >
        Upcoming
      </button>
    </div>
  );
};

export default Filter;
