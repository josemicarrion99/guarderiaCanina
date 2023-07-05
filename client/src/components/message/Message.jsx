import "./message.scss"
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import moment from "moment";
import 'moment/locale/es'  

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

import MessageSender from "../../components/sendMessage/SendMessage"

const Message = ({ message }) => {

    moment.locale('es')

    const [openMessage, setOpenMessage] = useState(false);
    const {currentUser} = useContext(AuthContext);


    const queryClient = useQueryClient();
    const mutation = useMutation((newMessage) => {
      return makeRequest.put("/relationships", newMessage);
    }, {
      onSuccess: () => {//si no ha habido ningun error cerramos la ventan
        queryClient.invalidateQueries(["relationships"]);  
      },
      onError: (error) => {
        console.log(error.response.data);      
      }
    });

    const handleAceptar = () => {
        setOpenMessage(true);
        mutation.mutate({id: message.id, estado: 'Aceptado'});
    }

    const handleRechazar = () => {
        mutation.mutate({id: message.id, estado: 'Rechazado'});
    }

    return (
        <>
        {(message.estado === "Aceptado" && currentUser.type === "Cuidador") ? "" : //si has aceptado el mensaje y eres cuidador no te sale, al cliente si
            (<div className="message">
                <div className="container">
                    <div className="user">
                        <div className="userInfo">
                            <img src={"/upload/" + message.profilePic} alt="" className="profilePic"/>
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
                        <img src={"/upload/" + message.img} alt="" />
                    </div>

                    {(currentUser.type === "Cuidador" && message.estado === "Pendiente")
                    ? (<div className="container">
                        <div className="answer">
                            <button className="button-29-green" onClick={handleAceptar} style={{ width: "80px" }}>Aceptar</button>
                        </div>
                        <div className="answer">
                            <button className="button-29-red" onClick={handleRechazar} style={{ width: "85px" }}>Rechazar</button>
                        </div>
                    </div>) 
                    : ""}
                </div>
                {openMessage && <MessageSender setOpenMessage={setOpenMessage} userToMessage={message.followerUserId} />}
            </div>)}
        </>
    )
}

export default Message;