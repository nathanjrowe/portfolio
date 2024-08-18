import React, { useEffect } from 'react';
import { handleSubmit } from './scripts/form-submission-handler';
import './styles/Contact.css';

const Contact = () => {

    /*Adds AJAX to avoid page redirection on submit*/
    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <section className="Contact">
            <div className="text">Contact Me</div>
            <form className=" gform" method='post' action='https://script.google.com/macros/s/AKfycbzhm62YZwBZvvoM_0wOKJb46GdPCQRhytZ0jzifKaxc3C0vDelgsRzCUwHxfdbCcAYAPw/exec'>
                <div className="input-row">
                    <div className="input-data">
                        <input id="first" type="text" name="firstname" required placeholder=" "/>
                        <div className="underline"></div>
                        <label htmlFor="first">First Name</label>
                    </div>
                    <div className="input-data">
                        <input id="last" type="text" name="lastname" required placeholder=" "/>
                        <div className="underline"></div>
                        <label htmlFor='last'>Last Name</label>
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-data">
                        <input id="company" type="text" name="company" placeholder=" "/>
                        <div className="underline"></div>
                        <label htmlFor="company">Company (Optional)</label>
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-data">
                        <input id="email" type="text" name="email" required placeholder=" "/>
                        <div className="underline"></div> 
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-data textarea">
                        <textarea  rows="8" cols="80" id="message" name="message" required placeholder=" "/>
                        <div className="underline"></div>
                        <label htmlFor="message">Message</label>
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-data">
                        <input className="submit-btn" type="submit" value="Submit" />
                    </div>
                </div>
                <div style={{display:"none"}} className="thankyou_message">
                    <h2>Thanks for you submission! I will reach out to you soon.</h2>
                </div>
            </form>
          
        </section>
    )
}

export default Contact;