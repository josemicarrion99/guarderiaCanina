import "./stories.scss"
import { useContext } from "react";
import {AuthContext} from "../../context/authContext"

export const Stories = () => {

    const { currentUser } = useContext(AuthContext);

    //temporary data
    const stories = [
        {
            id:1, 
            name:"Jose1", 
            img:"https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247_1280.jpg"
        },
        {
            id:2,
            name:"Jose2", 
            img:"https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247_1280.jpg"
        },
        {
            id:3, 
            name:"Jose3", 
            img:"https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247_1280.jpg"
        },

    ]
  return (
    <div className="stories">
        <div className="story">
            <img src={currentUser.profilePicture} alt=""/>
            <span>{currentUser.name}</span>
            <button>+</button>
        </div>
        {stories.map(story=>(
            <div className="story" key={story.id}>
                <img src={story.img} alt=""/>
                <span>{story.name}</span>
            </div>
        ) )}
    </div>
  )
}

export default Stories
