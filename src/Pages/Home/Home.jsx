import React, { useEffect, useMemo, useState, useCallback } from "react";
import "./Home.css";
import SliderImg from "../../components/SliderImg/SliderImg";
import Filter from "../../components/Filter/Filter";
import Switch from "../../components/Switch/Switch";
import Pagination from "../../components/Pagenation/Pagenation";

  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0YTc1MGJjNmQ2M2FmMDU0MjM4MTI0Mzc0OTA5ZCIsInN1YiI6IjY1Njg4MTAxYTQ0ZDA5MDBlY2JmNDY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK4Uw6ytOAT4nrBOacFt--nZLe9G5SD8O6FYgfhJvvY";

  const Home = () => {
  const [filterAndPage, setFilterAndPage] = useState(() => {  
  const storedPage = localStorage.getItem("currentPage");
  const storedFilter = localStorage.getItem("currentFilter");

  return {
    filter: storedFilter || "now_playing",
    page: storedPage ? parseInt(storedPage, 10) : 1,
  };
});


  const [moveData, setMoveData] = useState([]);
  const [language, setLanguage] = useState("en-UA");

  const fetchData = useCallback(async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${filterAndPage.filter}?language=${language}&page=${filterAndPage.page}`,
        options
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMoveData(data.results.filter((e) => !e.adult));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    localStorage.setItem("currentPage", filterAndPage.page.toString());
    localStorage.setItem("currentFilter", filterAndPage.filter.toString());
  }, [filterAndPage.filter, filterAndPage.page, language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (newFilter) => {
    setFilterAndPage((prev) => ({ filter: newFilter, page: 1 }));
  };

  const onLanguageChange = (e) => {
    setLanguage(e);
  };

  return (
    <div>
      <div className="switch-side">
        <Switch onLanguageChange={onLanguageChange} />
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <SliderImg moves={useMemo(() => moveData, [moveData])} />
      <Pagination
        length={moveData.length}
        setPage={(newPage) =>
          setFilterAndPage((prev) => ({ ...prev, page: newPage }))
        }
        page={filterAndPage.page}
      />
    </div>
  );
};

export default Home;
