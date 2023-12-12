import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BrogresCircle = ({ v }) => {
  const Example = ({ label, children }) => (
    <div style={{ margin: "20px" }}>
      <h3>{label}</h3>
      {children}
    </div>
  ); 
  const value = v?.toFixed(1);

  const average = (v * 100) / 10; 
  const color = () => {
    if (average >= 80) {
      return "#11883e";
    } else if (average >= 60) {
      return "#a7a40d";
    } else {
      return "#a7111e";
    }
    
  } 

  
  return (
    <div style={{ textAlign: "center" }}>
      <Example>
        <CircularProgressbar
          value={average}
          text={value}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: `${color()}`,
            textColor: `${color()}`,
            textSize: `250%`,
            fontWeight: `bold`,
            pathTransition: "none",
          })}
        />
      </Example>
    </div>
  );
};

export default BrogresCircle;
