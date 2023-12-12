import React, { useEffect, useState } from "react";
import SearchItem from "../../components/SearchItem/SearchItem";
import "./Search.css";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../components/Pagenation/Pagenation";

const Search = () => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0YTc1MGJjNmQ2M2FmMDU0MjM4MTI0Mzc0OTA5ZCIsInN1YiI6IjY1Njg4MTAxYTQ0ZDA5MDBlY2JmNDY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK4Uw6ytOAT4nrBOacFt--nZLe9G5SD8O6FYgfhJvvY";
  const [newData, setNewData] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}&with_genres=${selectedGenre}`,
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setNewData(data);
      } catch (error) {
        console.error(`${error} L:38 C:Search`);
      }
    };

    fetchData();
  }, [page, search, selectedGenre]); 

  const handelBtnClick = (genre) => {
    setSearch(genre.toLowerCase());
    setSelectedGenre(genre.toLowerCase()); 
  };


  const handleGenreChange = (e) => {
    setSearch(e.target.value);
    setSelectedGenre(e.target.value);
  };
  return (
    <div className="search-main-container">
      <div className="search">
        <div className="search-input">
          <label htmlFor="search">
            <FiSearch />
          </label>
          <input
            type="search"
            id="search"
            placeholder="Enter Movie Name"
            onChange={handleGenreChange}
          />
        </div>
        <div className="btn-grope">
          <button onClick={() => handelBtnClick("comedy")}>Comedy</button>
          <button onClick={() => handelBtnClick("action")}>Action</button>
          <button onClick={() => handelBtnClick("animation")}>Animation</button>
          <select onChange={handleGenreChange}>
            <option value="">more...</option>
            <option value="crime">Crime</option>
            <option value="war">War</option>
            <option value="documentary">Documentary</option>
            <option value="drama">Drama</option>
            <option value="family">Family</option>
            <option value="history">History</option>
            <option value="adventure">Adventure</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="music">Music</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
          </select>
        </div>
        <div className="details">
          <span>
            Page: <span> {newData.total_pages}</span>
          </span>
          <span>
            Item:<span>{newData.total_results}</span>
          </span>
        </div>
      </div>
      <SearchItem data={newData.results || []} />
      <Pagination
        length={newData.total_results || 0}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};

export default Search;
