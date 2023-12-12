import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import TV from "./Pages/TV/TV";

import Search from "./Pages/Search/Search";
import MoveDetails from "./Pages/MoveDetails/MoveDetails";

function App() {
  const [ar, setAr] = useState();

  useEffect(() => {}, [ar]);
  const onLanguageChange = (e) => {
    setAr(e);
  };

  return (
    <HashRouter>
      <div className="App">
        <Sidebar onLanguageChange={onLanguageChange} />
        <div className="main-data-container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  arLanguage={ar}
                />
              }
            />
            <Route path="/tv" element={<TV />} />
            <Route path="/move/:moveId" element={<MoveDetails />} />
            <Route path="search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
