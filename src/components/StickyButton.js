import React from "react";
import './styles/StickyButton.css'

/**
 * 
 * props.href - The URL the button should link to
 * props.download - The file to download when the button is clicked
 * props.target - The target of the link
 */
const StickyButton = ({children, href, download, target}) => <a href={href} download={download} target={target} className="Button">{children}</a>;

export default StickyButton;