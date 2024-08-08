import React from 'react';
import './styles/Contact.css';

const Contact = () => {
    return (
        <section className="Contact">
            <div className="text">Contact us Form</div>
            <form className=" gform" method='post' action='https://script.google.com/macros/s/AKfycbxz4NSI8Ls8IZKwYdhhvNNFSfVSI2xttwV7HwWTbmYNTrfnNTATmvQ-UVe-OGWWjV6Qqg/exec'>
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
            </form>
        </section>
    )
}

export default Contact;