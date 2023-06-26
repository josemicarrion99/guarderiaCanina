import "./messages.scss"
import Message from "../message/Message"
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";


const Messages = () => {
  
  const { isLoading, error, data } = useQuery(["relationships"], () =>
    makeRequest.get("/relationships").then((res) => {
      return res.data;
    })
  );



  return (<div className="messages">
    {error 
    ? "Algo ha ido mal" 
    : (isLoading
      ? "Cargando..."
      : data.map((message) => 
      <Message message={message} key={message.id} />))}
  </div>
  );
};

export default Messages
