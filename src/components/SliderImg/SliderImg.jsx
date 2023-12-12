import React, { useEffect, useRef, useState } from "react";
import "./SliderImg.css";
import SliderImgInfo from "./SliderImgInfo/SliderImgInfo";
import BrogresCircle from "../BrogresCircle/BrogresCircle";

const SliderImg = ({ moves }) => {
  const [num, setNum] = useState(0);
  const [scroll, setScroll] = useState(true);
  const [movesInfo, setMovesInfo] = useState([moves[num]]);
  const [activeIndex, setActiveIndex] = useState(num);
  const background = useRef();
  const startLink = "https://image.tmdb.org/t/p/w500/";

  const clickHandler = (e, index) => {
    setNum(index);
    setMovesInfo([e]);
    setScroll(false);
    setActiveIndex(index);
    setTimeout(() => setScroll(true), 60000);
    scrollToArticle(index);
  };

  const scrollToArticle = (index) => {
    const targetElements = background.current.querySelectorAll(".Item .card");

    if (index >= 0 && index < targetElements.length) {
      const targetElement = targetElements[index];
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.log("error L:30 C:sliderImg");
    }
  };

  useEffect(() => {
    let timerId;

    if (scroll) {
      timerId = setTimeout(
        () => setNum((prev) => (prev + 1) % moves.length),
        5000
      );
    }

    setMovesInfo([moves[num]]);
    return () => clearTimeout(timerId);
  }, [moves, num, scroll]);

  useEffect(() => {
    setActiveIndex(num);
    background.current.style.backgroundImage = `url('${startLink}${moves[num]?.backdrop_path}')`;
  }, [moves, num]);

  useEffect(() => {
    scrollToArticle(activeIndex);
  }, [moves, activeIndex]);

  return (
    <div ref={background} className="container-slider">
      <div className="content">
        <SliderImgInfo move={movesInfo[0]} />
        <div className="Item">
          {moves.map((e, index) => (
            <div
              className={`card ${index === activeIndex ? "active" : ""}`}
              key={index}
              onClick={() => clickHandler(e, index)}
            >
              <span className="average">
                <BrogresCircle v={e.vote_average} />
              </span>
              <img
                src={`${startLink}${e.poster_path}`}
                alt={`poster-${e.original_title}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderImg;
