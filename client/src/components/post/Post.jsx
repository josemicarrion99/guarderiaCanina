import "./post.scss"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { Link } from "react-router-dom";
import Comments from "../comments/Comments"
import { useState, useContext } from "react";
import moment from "moment";

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";


const Post = ({ post }) => {

    const [commentOpen, setCommentOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => {
            return res.data;
        })



    );

    //uso mutacion para hacer post en la bbdd y hacer fetch de nuevo
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postId=" + post.id);
            return makeRequest.post("/likes", { postId: post.id });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["likes"]);
            },
        }
    );

    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id));


    };

    const handleDelete = () => {
        deleteMutation.mutate(post.id);

    };



    return (
        <div className="post">
            {error
                ? "Algo ha ido mal"
                : (isLoading
                    ? "Cargando..."
                    : (<div className="container">
                        <div className="user">
                            <div className="userInfo">
                                <img src={"./upload/" + post.profilePic} alt="" />
                                <div className="details">
                                    <Link
                                        to={`/profile/${post.userId}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <span className="name">{post.name}</span>
                                    </Link>
                                    <span className="date">{moment(post.createdAt).fromNow()}</span>
                                </div>
                            </div>
                            {(post.userId === currentUser.id) ? <button className="button-29-red" onClick={handleDelete}>Borrar</button> : ""}
                        </div>
                        <div className="content">
                            <p>{post.desc}</p>
                            <img src={"./upload/" + post.img} alt="" />
                        </div>
                        <div className="info">
                            <div className="item">
                                {isLoading ? (
                                    "loading"
                                ) : data.includes(currentUser.id) ? (
                                    <FavoriteIcon
                                        style={{ color: "red" }}
                                        onClick={handleLike}
                                    />
                                ) : (
                                    <FavoriteBorderIcon onClick={handleLike} />
                                )}
                                {data?.length} likes
                            </div>
                            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                                <ChatBubbleOutlineIcon />
                            </div>
                            <div className="item">
                                <IosShareIcon />
                            </div>
                        </div>
                        {commentOpen && <Comments postId={post.id} />}
                    </div>))}
        </div>
    )
}

export default Post