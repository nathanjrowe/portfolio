import React from "react";
import "./styles/Footer.css";

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="contact-container">
                <div className="contact-info">
                    <a href="mailto:naterowe2002@gmail.com">Email: naterowe2002@gmail.com</a>
                    <a href="tel:505-573-5160">Phone: 505-573-5160</a>
                </div>
                <div className="social-container">
                    <a target="_blank" href="https://www.linkedin.com/in/nathan-james-rowe-4649b11b1/"><img src="https://myportfoliobucketnater.s3.us-east-2.amazonaws.com/images/linkdIn.png" alt="LinkedIn" /></a>
                    <a target="_blank" href="https://github.com/nathanjrowe"><img src="https://myportfoliobucketnater.s3.us-east-2.amazonaws.com/images/github.svg" alt="GitHub" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;