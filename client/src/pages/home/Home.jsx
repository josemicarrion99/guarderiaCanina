import "./home.scss"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
// import AddressSearch from "../../components/map/Map"
// import DistanceCalculator from "../../components/map/DistanceCalculator"
import MapsChatGPT from "../../components/map/MapsChatGPT"


import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Home = () => {
    const { currentUser } = useContext(AuthContext);

    const handlePlaceSelect = (addressObject) => {
        // Handle the selected address object here
        console.log(addressObject);
      };

    return(
        <div className="home">
            {/* <AddressSearch onPlaceSelect={handlePlaceSelect} /> */}
            {/* <DistanceCalculator/> */}
            {/* <MapsChatGPT/> */}
            {currentUser.type === "Cuidador" ? <Share/> : ""}
            <Posts/>
        </div>
    )
}

export default Home;