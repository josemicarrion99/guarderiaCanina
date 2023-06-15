import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Posts from "../../components/posts/Posts"

const Profile = () => {
    return(
        <div className="profile">
            <div className="images">
                <img src="https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg" alt="" className="cover"/>
                <img src="https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg" alt="" className="profilePicture" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <FacebookIcon/>
                        </a>
                        <a href="http://instagram.com">
                            <InstagramIcon/>
                        </a>
                        <a href="http://twitter.com">
                            <TwitterIcon/>
                        </a>
                    </div>
                    <div className="center">
                        <span>Jane Doe</span>
                        <div className="info">
                            <div className="item">
                                <MapIcon/>
                                <span>España</span>
                            </div>
                            <div className="item">
                                <LanguageIcon/>
                                <span>Español, English</span>
                            </div>
                        </div>
                        <button>Follow</button>
                    </div>
                    <div className="right">
                        <WhatsAppIcon/>
                        <MoreVertIcon/>
                    </div>
                </div>
                <Posts/>
            </div>
        </div>
    )
}

export default Profile