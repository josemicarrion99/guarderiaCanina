import { useContext } from "react";
import "./comments.scss"
import {AuthContext} from "../../context/authContext"

export const Comments = () => {

    const {currentUser} = useContext(AuthContext);

    const comments = [
        {
            id: 1,
            description: "Guauuu me encanta la fotiña",
            name: "Pedro",
            userId: "1",
            profilePicture: "https://cdn.pixabay.com/photo/2023/06/02/14/12/woman-8035772_1280.jpg"
        },
        {
            id: 2,
            description: "aaaaaaa",
            name: "Juana",
            userId: "2",
            profilePicture: "https://cdn.pixabay.com/photo/2023/06/02/14/12/woman-8035772_1280.jpg"
        },
        {
            id: 3,
            description: "uuuuuuuafdijaoifjpaf",
            name: "Tata",
            userId: "3",
            profilePicture: "https://cdn.pixabay.com/photo/2023/06/02/14/12/woman-8035772_1280.jpg"
        },

    ];

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePicture} alt="" />
                <input type="text" placeholder="Write a comment" />
                <button>Send</button>
            </div>
            {comments.map((comment) => (
                <div className="comment">
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.description}</p>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
            ))}
        </div>
    )
}

export default Comments;