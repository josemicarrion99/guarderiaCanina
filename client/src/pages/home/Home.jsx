import "./home.scss"
import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Login = () => {
    const { currentUser } = useContext(AuthContext);

    return(
        <div className="home">
            {/* <Stories/> */}
            {currentUser.type == "Cuidador" ? <Share/> : ""}
            <Posts/>
        </div>
    )
}

export default Login