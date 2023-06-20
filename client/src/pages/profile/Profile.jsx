import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Posts from "../../components/posts/Posts"

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    const {currentUser} = useContext(AuthContext);

    //cogemos el tercer elemento de la url para saber la id el perfil de usuario
    //http://localhost:3000/profile/7
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const handleFollow = () => {

  };



  
    return (
        <div className="profile">
             {isLoading ? (
        "loading"
      ) : (
        <>
            <div className="images">
                <img src={data.coverPic} alt="" className="cover" />
                <img src={data.profilePic} alt="" className="profilePic" />
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
                        {userId === currentUser.id 
                        ? (<button>Update</button>) 
                        : (<button onClick={handleFollow}>Follow</button>)}
                    </div>
                    <div className="right">
                        <WhatsAppIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                <Posts />
            </div>
        </>
      )}
        </div>
    );
}

export default Profile