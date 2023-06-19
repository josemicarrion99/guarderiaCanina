import "./leftbar.scss"
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Leftbar = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePic} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <PeopleAltIcon />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <StorefrontIcon />
                        <span>Store</span>
                    </div>
                </div>
                <div className="menu">
                    <hr/>
                    <span>Otros</span>
                    <div className="item">
                        <PeopleAltIcon />
                        <span>Other</span>
                    </div>
                    <div className="item">
                        <StorefrontIcon />
                        <span>Options</span>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Leftbar