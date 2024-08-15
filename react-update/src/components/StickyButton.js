import React from "react";
import './styles/StickyButton.css'

const StickyButton = ({children, href, download, target}) => <a href={href} download={download} target={target} className="Button">{children}</a>;

export default StickyButton;