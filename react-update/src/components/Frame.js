import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./styles/Frame.css";


var imgURL = "";
const Frame = ({frametype = "" , presets, color = 'white', className, img}) => {
 imgURL = img;

  useEffect(() => {
   handleSVGLoad();
   
  }, []);
  

  return (
    <div className={`Frame ${presets} ${className}`} id="Frame">
        {frametype ? <motion.object 
                      initial = {{rotate: -5, y: -350,opacity: 0 }}
                      whileInView = {{rotate: 0, y: 0, opacity: 1,
                        transition: {
                          type: "spring",
                          duration: 1.2,
                          bounce: 0.2,
                          delay: 0.5
                        }
                      }}
                      viewport={{amount: .2, once: true}}
                       className={`framestyle ${frametype}`} id="framestyle" data={ `./frame-styles/${frametype}.svg` } type="image/svg+xml" onLoad={handleSVGLoad}/> : null}
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