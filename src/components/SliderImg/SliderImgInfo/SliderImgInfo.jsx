import React from "react";
import "./SliderImgInfo.css";
import genresData from "../../../dist/genres.json";
import BrogresCircle from "../../BrogresCircle/BrogresCircle";
import { TfiMoreAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";



const SliderImgInfo = ({ move }) => {
  const startLink = "https://image.tmdb.org/t/p/w500/";


  const genreIds = move?.genre_ids || [];
  const genreNames = genreIds.map((genreId) => {
    const genre = genresData.genres.find((g) => g.id === genreId);
    return genre ? genre.name : "Unknown";
  });

  return (
    <div className="info">
      <div className="details">
        <div className="genreNames">
          {genreNames.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </div>
        <h2 className="title">{move?.title}</h2>
        <p className="overview">{move?.overview}</p>
        <button type="button">
          <Link to={`/move/${move?.id}`}>
            More details <TfiMoreAlt />
          </Link>
        </button>
      </div>
      <div className="img">
        <span className="average">
          <BrogresCircle v={move?.vote_average} />
        </span>
        <img
          src={`${startLink}${move?.poster_path}`}
          alt={`poster-${move?.original_title}`}
        />
      </div>
    </div>
  );
};

export default SliderImgInfo;
