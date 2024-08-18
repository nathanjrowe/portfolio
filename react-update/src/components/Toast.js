import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/Toast.css";


const Toast = ({text, component}) => {

    const notify = (component) => {
        toast(component, {
            toastId: 'contact-toast'
        });
    }

    return (
        <div className="Toast"  onClick={() => notify(component)}>
            <span id="toast-link" className="link">{text}<i className="material-icons">arrow_right_alt</i></span>
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