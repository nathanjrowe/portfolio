import React, { useEffect } from "react";
import "./styles/Frame.css";
var imgURL = "";
const Frame = ({frametype = "" , presets, color = 'white', className, img}) => {
 imgURL = img;
  useEffect(() => {
   handleSVGLoad();
  }, []);

  return (
    <div className={`Frame ${presets} ${className}`} id="Frame">
        {frametype ? <object className="framestyle" id="framestyle" data={ `./frame-styles/${frametype}.svg` } type="image/svg+xml" onLoad={handleSVGLoad}/> : null}
    </div>
  );
};


const handleSVGLoad = () => {
  const svg = document.getElementById("framestyle");
  svg.addEventListener("load", () => {
  const svg = document.getElementById("framestyle");
  const svgDoc = svg.contentDocument;
  const imageContainer = svgDoc.getElementById("image-inset");
  //console.log(imageContainer);
  imageContainer.setAttribute("xlink:href", imgURL);
  });  
};

export default Frame;