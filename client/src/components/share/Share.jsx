import "./share.scss";
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Share = () => {

  //objeto imagen y descripcion para crear el post
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  //funcion para subir imagenes
  const upload = async() =>{
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    }catch(err){
      console.log(err);
    };
  };

  const { currentUser } = useContext(AuthContext);

  //usamos react query para hacer un post y fetchear de nuevo los posts
  const queryClient = useQueryClient();
  const mutation = useMutation((newPost) => {
    return makeRequest.post("/posts", newPost);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if(file === "" || desc === " ") return;
    let imgUrl = "";
    if(file) imgUrl = await upload();
    mutation.mutate({desc, img:imgUrl});
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input type="text" placeholder="¿Qué tienes en mente?" onChange={(e) => setDesc(e.target.value)} value={desc}/>
          </div>
          <div className="right">
            {/* si añadimos una foto creamos un link falso para ver la imagen de manera previa */}
            {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <ImageIcon/>
                <span>Añadir imagen</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button className="button-29-purple" onClick={handleClick}>Compartir</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;