import { useContext, useState } from "react";
import "./comments.scss"
import { AuthContext } from "../../context/authContext"
import moment from "moment"
import 'moment/locale/es'  
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Comments = ({ postId }) => {

  moment.locale('es')

  const { currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState("");
  const [commenting, setCommenting] = useState(currentUser.type === "Cuidador" ? "none" : "")


  const { isLoading, error, data } = useQuery(["comment"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();
  const mutation = useMutation((newComment) => {
    return makeRequest.post("/comments", newComment);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write" >
        <img src={"/upload/" + currentUser.profilePic} style={{ display: commenting }} alt="" />
        <input type="text" style={{ display: commenting }} placeholder="Write a comment"
          value={desc} onChange={e => setDesc(e.target.value)} />
        <button className="button-29-purple" onClick={handleClick} style={{ display: commenting }}>Send</button>
      </div>
      {error
        ? "Algo ha ido mal"
        : (isLoading
          ? "Cargando..."
          : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
          )))}
    </div>
  )
}

export default Comments;