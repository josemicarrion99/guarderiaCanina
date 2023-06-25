import "./navbar.scss"
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {

    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Guarderia canina</span>
                </Link>
                <Link to={"/profile/" + currentUser.id}  >
                    <PersonIcon />
                </Link>
                {darkMode ? (
                    <WbSunnyIcon onClick={toggle} style={{ cursor: "pointer" }} />
                ) : (
                    <DarkModeIcon onClick={toggle} style={{ cursor: "pointer" }} />
                )}
                {/* <GridViewIcon /> */}
                {/* <div className="search">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div> */}
                <Link to={"/login"} >
                    <LogoutIcon />
                </Link>
            </div>
            <div className="right"> 

                {/* <Link to={"/login"} >
                    <PersonIcon />
                </Link> */}

                <div className="user">
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar