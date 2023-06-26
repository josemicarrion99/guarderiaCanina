import "./message.scss"
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import moment from "moment";

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

import MessageSender from "../../components/sendMessage/SendMessage"



const Message = ({ message }) => {

    const [openMessage, setOpenMessage] = useState(false);


const handleAceptar = () => {
    setOpenMessage(true);
}

const handleRechazar = () => {
    
}



    return (
        <div className="message">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={"./upload" + message.profilePic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${message.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name">{message.name}</span>
                            </Link>
                            <span className="date">{moment(message.createdAt).fromNow()}</span>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>{message.message}</p>
                    <img src={"./upload/" + message.img} alt="" />
                </div>
                <div className="container">
                    <div className="answer">
                        <button className="button-29-green" onClick={handleAceptar} style={{width:"80px"}} >Aceptar</button>
                    </div>
                    <div className="answer">
                        <button className="button-29-red" onClick={handleRechazar} style={{width:"85px"}}>Rechazar</button>
                    </div>
                </div>
            </div>
            {openMessage && <MessageSender setOpenMessage = {setOpenMessage} userToMessage={message.userId}/>}
        </div>
    )
}

export default Message