import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import Posts from "../../components/posts/Posts"
import Messages from "../../components/messages/Messages"
import Update from "../../components/update/Update"
import MessageSender from "../../components/sendMessage/SendMessage"
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Location from "../../components/location/Location";

import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [openVetHelp, setOpenVetHelp] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);

    const { currentUser } = useContext(AuthContext);

    //cogemos el tercer elemento de la url para saber la id el perfil de usuario
    //http://localhost:3000/profile/7
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
            if(error) console.log(error);
            return res.data;
        },)
    );

    // const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    //     ["relationship"], () =>
    //     makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
    //         return res.data;
    //     })
    // );

    const contactar = () => {
        setOpenMessage(true);
    }

    const showVetContact = () => {
        setOpenVetHelp(true);
    }

    const enterLocation = () => {
        setOpenLocation(true);
    }

    return (
        <div className="profile">
            {isLoading ? (
                "loading"
            ) : (
                <>
                    <div className="images">
                        <img src={"/upload/" + data.coverPic} alt="" className="cover" />
                        <img src={"/upload/" + data.profilePic} alt="" className="profilePic" />
                    </div>
                    <div className="profileContainer">
                        <div className="uInfo">
                            <div className="left">
                                <a href="http://facebook.com">
                                    <FacebookIcon />
                                </a>
                                <a href="http://instagram.com">
                                    <InstagramIcon />
                                </a>
                                <a href="http://twitter.com">
                                    <TwitterIcon />
                                </a>
                                {(currentUser.id === userId && currentUser.type === "Cuidador") 
                                ? (<MedicalServicesIcon style={{cursor:"pointer", color:"red"}} onClick={showVetContact}/>)
                                : ""}
                            </div>
                            <div className="center">
                                <span>{data.name}</span>
                                <div className="info">
                                    <div className="item">
                                        <MapIcon onClick={enterLocation} style={{cursor:'pointer', color:'lightgreen'}}/>
                                        <span>{data.city}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>{data.language}</span>
                                    </div>
                                </div>
                                {userId === currentUser.id
                                    ? (<button onClick={() => setOpenUpdate(true)} className="button-29-purple" >Modificar</button>)
                                    : (<button onClick={contactar} className="button-29-purple" >Contactar</button>)
                                }
                            </div>
                            <div className="right">
                                <WhatsAppIcon />
                                <span>{data.phone}</span>
                            </div>
                        </div>
                        {/* Si es tu propio perfil no muestra posts porque hay que mostrar mensajes */}
                        {data.id === userId ? <Messages/> : <Posts userId={userId} />}
                    </div>
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
            {openMessage && <MessageSender setOpenMessage={setOpenMessage} userToMessage={userId} />}
            {openVetHelp && (
                <div className="vetHelp">
                    <div className="container">
                        <span>El veterinari@ Marina Pérez está disponible</span>
                        <h5>601 98 76 45</h5>
                    </div>
                    <button className="close" onClick={() => setOpenVetHelp(false)}>&nbsp; X &nbsp; </button>
                </div>
            )}
            {openLocation && <Location setOpenLocation={setOpenLocation} user={data}/>}
        </div>
    );
}

export default Profile