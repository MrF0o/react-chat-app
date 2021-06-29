import React from 'react';

import './Message.css';

const Message = ({text, isincoming, sender}) => {
    return (
        <div className="message">
                <div className={isincoming ? "greyMessage" : "blueMessage"}> <p>{text}</p> </div>
                <div className="owner" style={isincoming ? {} : {display: 'none'}}>{sender}</div>
        </div>
    )
}

export default Message;
