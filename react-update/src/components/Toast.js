import React, { useEffect, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/Toast.css";
import { ToastContainer, toast } from "react-toastify";

const Toast = ({text, component}) => {

    const notify = (component) => {
        toast(component, {
            toastId: 'contact-toast'
        });
    }

    return (
        <div className="Toast"  onClick={() => notify(component)}>
            <span id="toast-link" className="link">{text}</span>
            <ToastContainer className="contact-toast"
                position="top-center"
                autoClose={false}
                limit={1}
                newestOnTop={false}
              
                rtl={false}
                draggable
/>
        </div>
    );
};

export default Toast;