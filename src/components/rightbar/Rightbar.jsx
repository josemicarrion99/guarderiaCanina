import "./rightbar.scss"
import "bootstrap/dist/css/bootstrap.min.css"

const Rightbar = () => {
    return(
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Recomendaciones</span>
                    <div className="user" >
                        <div className="userInfo">
                            <img src="https://cdn.pixabay.com/photo/2023/05/20/19/58/woman-8007247_1280.jpg" alt="" />
                            <span>Jose</span>
                        </div>
                            <div className="buttons">
                                {/* <button class="btn btn-primary rounded-pill px-3">Follow</button>
                                <button class="btn btn-danger rounded-pill px-3">Dismiss</button>   */}
                                <button>Follow</button>
                                <button>Dismiss</button> 
                            </div>
                        </div>
                    <div className="item">
                        <span>Latest activities:</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightbar