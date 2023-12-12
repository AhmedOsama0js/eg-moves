import React from "react";
import "./SearchItem.css";
import BrogresCircle from "../BrogresCircle/BrogresCircle";
import { Link } from "react-router-dom";

export default function SearchItem({ data }) {
  const startLink = "https://image.tmdb.org/t/p/w500/";

  const filteredData = data?.filter((e) => e?.poster_path);

  return (
    <div className="container-item">
      {filteredData?.map((e) => (
        <Link to={`/move/${e?.id}`} key={e?.id}>
          <div className="card">
            <span className="average">
              <BrogresCircle v={e?.vote_average} />
            </span>
            <img
              src={`${startLink}${e?.poster_path}`}
              alt={`img-${e?.title}`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
