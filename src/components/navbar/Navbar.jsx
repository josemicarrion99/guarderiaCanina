import "./navbar.scss"
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {

    const { toggle, darkMode } = useContext(DarkModeContext);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Guarderia canina</span>
                </Link>
                <HomeIcon />
                {darkMode ? (
                    <WbSunnyIcon onClick={toggle} style={{cursor: "pointer"}}/>
                ) : ( 
                    <DarkModeIcon onClick={toggle} style={{cursor: "pointer"}}/> 
                )}
                <GridViewIcon />
                <div className="search">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="right">
                <PersonIcon />
                <div className="user">
                    <img src="https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247_1280.jpg" alt="" />
                    <span>Jose</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar