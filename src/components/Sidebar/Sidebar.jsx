import "./sidebar.css"
import { GoSearch, GoHomeFill } from "react-icons/go";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import BtnFullscreen from "../Fullscreen/FullScreen";

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="container-sidebar">
      <div className="fullScreenButton">
        <BtnFullscreen />
      </div>
      <ul>
        <li className={location.pathname === "/" ? "active " : ""}>
          <Link to="/" title="Home">
            <GoHomeFill />
          </Link>
        </li>
        <li className={location.pathname === "/tv" ? "active " : ""}>
          <Link to="/tv" title="TV">
            <PiTelevisionSimpleFill />
          </Link>
        </li>
        <li className={location.pathname === "/search" ? "active " : ""}>
          <Link to="/search" title="search">
            <GoSearch />
          </Link>
        </li>
      </ul>
      <div className="icon">
        <img src="./img/movie-icon.png" alt="icon" />
      </div>
    </div>
  );
}

export default Sidebar
