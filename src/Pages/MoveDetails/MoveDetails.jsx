import { useState, useEffect, useRef } from "react";
import "./MoveDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import BrogresCircle from "../../components/BrogresCircle/BrogresCircle";
import { FaQuoteRight, FaQuoteLeft, FaRegStar, FaStar } from "react-icons/fa";
import { HiLanguage } from "react-icons/hi2";
import { FaMountainCity } from "react-icons/fa6";
import { MdDateRange , MdMoreTime  } from "react-icons/md";


const MovieDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const startLink = "https://image.tmdb.org/t/p/w500/";
  const background = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0YTc1MGJjNmQ2M2FmMDU0MjM4MTI0Mzc0OTA5ZCIsInN1YiI6IjY1Njg4MTAxYTQ0ZDA5MDBlY2JmNDY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK4Uw6ytOAT4nrBOacFt--nZLe9G5SD8O6FYgfhJvvY",
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${params.moveId}?language=en-US`,
          options
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [params.moveId]);

  useEffect(() => {
    if (background.current && data?.backdrop_path) {
      background.current.style.backgroundImage = `url('${startLink}${data.backdrop_path}')`;
    }
  }, [data, startLink]);

  const backClick = () => {
    navigate(-1);
  };

  const hours = Math.floor(data?.runtime / 60);
  const minutes = data?.runtime % 60;

  const revenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(data?.revenue / 100);

  const budget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(data?.budget / 100);



  const average = parseInt((data?.vote_average) / 2);

  
    const averageStar = Array.from({ length: average }, (_, index) => (
      <FaStar key={index} />
    ));
  
    const averageNun = Array.from({ length: 5 - average }, (_, index) => (
      <FaRegStar key={index} />
    ));

  return (
    <div className="container-details-move" ref={background}>
      <button onClick={backClick}>back</button>
      <div className="content">
        <div className="details">
          <p className="tagline">
            <span>
              <FaQuoteLeft />
            </span>
            {data?.tagline}
            <span>
              <FaQuoteRight />
            </span>
          </p>
          <h1 className="title">{data?.title}</h1>
          <p className="overview">{data?.overview}</p>
          <div className="genreNames">
            {data?.genres.map((genre, index) => (
              <span key={index}>{genre.name}</span>
            ))}
          </div>
          <div className="star">
            {averageStar}
            {averageNun}
          </div>
          <div className="languages">
            <span>languages: </span>
            {data?.spoken_languages.map((genre, index) => (
              <span key={index}>
                <span className="icon">
                  <HiLanguage />
                </span>
                {genre.english_name}
              </span>
            ))}
          </div>
          <div className="production">
            <span>production: </span>
            {data?.production_countries.map((genre, index) => (
              <span key={index}>
                <span className="icon">
                  <FaMountainCity />
                </span>
                {genre.iso_3166_1}
              </span>
            ))}
          </div>
          <div className="time">
            <p>
              <span className="icon">
                <MdDateRange />
              </span>
              {data?.release_date}
            </p>
            <p>
              <span className="icon">
                <MdMoreTime />
              </span>
              {hours}h:{minutes}m
            </p>
          </div>
          <div
            className={`money ${
              data?.revenue > data?.budget ? "true" : "false"
            }`}
            style={
              (revenue || budget) === "$0"
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <span>
              Budget: <span className="s">{budget}</span>
            </span>
            <span>
              revenue: <span className="s">{revenue}</span>
            </span>
          </div>
          <div>
          <button>
            <a href={data?.homepage}>More ...</a>
          </button>
          </div>
        </div>
        <div className="img">
          <span className="average">
            <BrogresCircle v={data?.vote_average} />
          </span>
          <img src={`${startLink}${data?.poster_path}`} alt={data?.title} />
          {!data && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
