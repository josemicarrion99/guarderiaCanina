import "./leftbar.scss"
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';



const Leftbar = () => {
    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                        <span>Jose</span>
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