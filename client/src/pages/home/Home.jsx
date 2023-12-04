import "./home.scss"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"


import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";


const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation((userId) => {
      return makeRequest.get("/users/" + userId);
    }, {
      onSuccess: (dataUser) => {
        if(dataUser.data.length === 1) navigate("/profile/" + dataUser.data[0].id)
      },
    });


    const handleClick = async (e) => {
        e.preventDefault();
        if(desc === " ") return;
        mutation.mutate(desc);
        setDesc("");
      };    

    return (
        <div className="home">
            {currentUser.type !== "Administrador" ?
                <>
                    {currentUser.type === "Cuidador" ? <Share /> : ""}
                    <Posts />
                </>
                :
                (<div className="share">
                    <div className="container">
                        <div className="top">
                                <input type="text" onChange={(e) => setDesc(e.target.value)} value={desc} 
                                style={{width:"200px"}}/>
                        </div>
                        <div className="bottom" style={{paddingTop:"15px"}}>
                            <div className="right">
                                <button className="button-29-purple" onClick={handleClick}>Buscar usuario</button>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Home;