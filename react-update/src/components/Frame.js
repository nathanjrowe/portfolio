import React, { useEffect } from "react";
import "./styles/Frame.css";

const Frame = ({ children, frametype = "" , presets, color = 'white'}) => {

  useEffect(() => {
    handleSVGLoad(color);
  }, [color]);

  return (
    <div className={`Frame ${presets}`}>
        {children}
        {frametype ? <object className="framestyle" id="framestyle" data={ `./frame-styles/${frametype}.svg` } type="image/svg+xml" onLoad={handleSVGLoad}/> : null}
    </div>
  );
};


const handleSVGLoad = (color) => {
  const svg = document.getElementById("framestyle");
  svg.addEventListener("load", () => { 
    const svgDoc = svg.contentDocument;
    const svgContainer = svgDoc.getElementById("svg-container");
    const svgElement = svgDoc.getElementById("framedesign");
    //Set the color of the SVG element
    svgElement.style.fill = color;    
  });  
};

export default Frame;