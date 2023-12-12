import React, { useEffect, useRef, useState } from "react";
import "./Switch.css";

const Switch = ({ onLanguageChange }) => {
  const [changeLanguage, setChangeLanguage] = useState("en-US");
  const language = useRef(null);

  const handleClick = (e) => {
    setChangeLanguage(e.target.checked ? "ar-SA" : "en-US");
    language.current.textContent = e.target.checked ? "AR" : "EN";
  };

  useEffect(() => {
    onLanguageChange(changeLanguage);
  }, [changeLanguage, onLanguageChange]);

  return (
    <div className="container-switch">
      <span ref={language}>EN</span>
      <label className="switch">
        <input type="checkbox" onChange={handleClick} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Switch;
