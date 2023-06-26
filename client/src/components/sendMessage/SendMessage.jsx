import "./sendMessage.scss";
import ImageIcon from '@mui/icons-material/Image';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Message = ({ setOpenMessage, userToMessage }) => {

  //objeto imagen y descripcion para crear el post
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const [err, setErr] = useState(null);


  //funcion para subir imagenes
  const upload = async() =>{
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    }catch(err){
      setErr(err.response.data)
    };
  };

  const { currentUser } = useContext(AuthContext);

  //usamos react query para hacer un post y fetchear de nuevo los posts
  const queryClient = useQueryClient();
  const mutation = useMutation((newMessage) => {
    return makeRequest.post("/relationships", newMessage);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["relationships"]);
    },
    onError: (err) => {
      setErr(err.response.data);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if(desc == "" || desc == " ") return;
    let imgUrl = "";
    if(file) imgUrl = await upload();
      mutation.mutate({message: desc, img:imgUrl, followedUserId: userToMessage, estado: 'Pendiente'});
      if(err != null){
        setDesc("");
        setFile(null);
        setOpenMessage({state: false, alreadyMessaged: false})
      }  
  };

  return (
    <div className="sendmessage">
      <div className="container">
        <h3 style={{color:"red", fontSize:"14px", textAlign:"center"}}>{err && err}</h3>
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            {/* <input type="text" onChange={(e) => setDesc(e.target.value)} value={desc}/> */}
            <textarea onChange={(e) => setDesc(e.target.value)} value={desc}/>
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
                <span>Add Image</span>
              </div>
            </label>
            {/* <div className="item">
              <AddLocationAltIcon/>
              <span>Add Place</span>
            </div> */}
            {/* <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div> */}
          </div>
          <div className="right">
            <button className="button-29-purple" onClick={handleClick}>Compartir</button>
          </div>
          <button className="close" onClick={() => setOpenMessage(false)}>&nbsp; X &nbsp; </button>
        </div>
      </div>
    </div>
  );
};

export default Message;