import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Posts from "../../components/posts/Posts"
import Update from "../../components/update/Update"
import Message from "../../components/message/Message"

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openMessage, setOpenMessage] = useState({state: false, alreadyMessaged: false});

    // const [reload, setReload] = useState([true]);

    
    const { currentUser } = useContext(AuthContext);

    //cogemos el tercer elemento de la url para saber la id el perfil de usuario
    //http://localhost:3000/profile/7
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    // console.log("AHORA ES " + reload + userId);


    // useEffect(() => {
    //     console.log("HE ENTRADO")
    //     if(userId == currentUser.id && reload){
    //         console.log("antes de cambio" + reload);
    //         window.location.reload(true);
    //         setReload(false);

    //         console.log("despues de cambio" + reload);

    //     }
    // }, []);


    // const previousUserId = 0;

    // const checkingChange = () => {
    //     console.log("checkingChange");
    //     if(userId != previousUserId){
    //         previousUserId = userId;
    //         window.location.reload(false);
    //     }
    // }

    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userId).then((res) => {
            return res.data;
        })
    );

    const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
        ["relationship"], () =>
        makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
            return res.data;
        })
    );

    // const queryClient = useQueryClient();
    // const mutation = useMutation(
    //     (following) => {
    //         if (following) return makeRequest.delete("/relationships?userId=" + userId);
    //         return makeRequest.post("/relationships", { userId });
    //     },
    //     {
    //         onSuccess: () => {
    //             // Invalidate and refetch
    //             queryClient.invalidateQueries(["relationship"]);
    //         },
    //     }
    // );

    // const handleMessage = () => {
    //     // mutation.mutate(relationshipData.includes(currentUser.id));


    // };



    const contactadoRecientemente = () => {
        setOpenMessage({state: true, alreadyMessaged: true});
    }

    const contactar = () => {
        setOpenMessage({state: true, alreadyMessaged: false});
    }

    return (
        <div className="profile">
            {isLoading ? (
                "loading"
            ) : (
                <>
                    <div className="images">
                        <img src={"/upload/" + data.coverPic} alt="" className="cover" />
                        <img src={"/upload/" +data.profilePic} alt="" className="profilePic" />
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
                            </div>
                            <div className="center">
                                <span>{data.name}</span>
                                <div className="info">
                                    <div className="item">
                                        <MapIcon />
                                        <span>{data.city}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>{data.website}</span>
                                    </div>
                                </div>
                                {/* {relationshipIsLoading  
                                    ? "loading"
                                    : userId === currentUser.id
                                        ? (<button onClick={() => setOpenUpdate(true)}>Update</button>)
                                        : currentUser.type == 'Cliente' 
                                            ? (<button onClick={() => setOpenMessage(true)}>
                                            {relationshipData.includes(currentUser.id)
                                                ? "Contactado recientemente"
                                                : "Contactar"}</button>) 
                                            : "" 
                                } */}
                                {relationshipIsLoading
                                    ? "loading"
                                    : userId === currentUser.id
                                        ? (<button onClick={() => setOpenUpdate(true)}>Update</button>)
                                        : currentUser.type == 'Cliente' 
                                            ? (<button onClick={relationshipData.includes(currentUser.id)
                                                ? contactadoRecientemente
                                                : contactar}>Contactar</button>) 
                                            : "" 
                                }
                            </div>
                            <div className="right">
                                <WhatsAppIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        {/* Si es tu propio perfil no muestra posts porque hay que mostrar mensajes */}
                        <Posts userId={currentUser.id === userId ? null : userId} />
                    </div>
                </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
            {openMessage.state && <Message setOpenMessage = {setOpenMessage} cuidador={userId} alreadyMessaged={openMessage.alreadyMessaged}/>}
        </div>
    );
}

export default Profile