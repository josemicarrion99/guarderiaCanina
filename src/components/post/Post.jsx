import "./post.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { Link } from "react-router-dom";

const Post = ({post}) => {

    //TEMPORARY
    const liked = false;

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePicture} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                           <div><span className="name">{post.name}</span></div>
                           <div><span className="date">1 min ago</span></div>
                            </Link>
                        </div>
                    </div>
                    <MoreHorizIcon/>                
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        12 likes
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineIcon/>
                        2 comments
                    </div>
                    <div className="item">
                        <IosShareIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post