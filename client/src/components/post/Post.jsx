import "./post.scss"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PushPinIcon from '@mui/icons-material/PushPin';

import { Link } from "react-router-dom";
import Comments from "../comments/Comments"
import { useState, useContext } from "react";
import moment from "moment";
import 'moment/locale/es'  

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";


const Post = ({ post }) => {

    moment.locale('es')

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

    const pinMutation = useMutation(
        (postId) => {
            return makeRequest.put("/posts/" + postId);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );



    const handleLike = () => {
        if(currentUser.type === 'Cliente') mutation.mutate(data.includes(currentUser.id));


    };

    const handleDelete = () => {
        deleteMutation.mutate(post.id);

    };

    const handlePin = () => {
        pinMutation.mutate(post.id);

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
                                <img src={"/upload/" + post.profilePic} alt="" />
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
                            {post.pinned === 1 ? <PushPinIcon style={{paddingRight:"10px"}}/> : currentUser.id === post.userId ? <button className="button-29-grey" onClick={handlePin}>Pinnear</button> : <></>}
                        </div>
                        <div className="content">
                            <p>{post.desc}</p>
                            <img src={"/upload/" + post.img} alt="" />
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
                            {/* </div>
                            <div className="item" > */}
                                <ChatBubbleOutlineIcon onClick={() => setCommentOpen(!commentOpen)} style={{paddingLeft: "20px"}}/>
                            </div>
                            <div className="item">
                                {(post.userId === currentUser.id || currentUser.type === 'Administrador') ? <button className="button-29-red" onClick={handleDelete}>Borrar</button> : ""}
                            </div>
                        </div>
                        {commentOpen && <Comments postId={post.id} />}
                    </div>)
                    )}
        </div>
    )
}

export default Post