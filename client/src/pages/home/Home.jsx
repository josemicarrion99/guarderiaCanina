import "./home.scss"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
// import Map from "../../components/map/Map"


import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Home = () => {
    const { currentUser } = useContext(AuthContext);


    return(
        <div className="home">
            {/* <Map enterLocation={false}/> */}
            {currentUser.type === "Cuidador" ? <Share/> : ""}
            <Posts/>
        </div>
    )
}

export default Home;