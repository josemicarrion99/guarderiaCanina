import "./posts.scss"
import Post from "../post/Post"
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";


export const Posts = ({userId}) => {

  
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      console.log(res.data)
      return res.data;
    })
  );



  return (<div className="posts">
    {error ? "Algo ha ido mal" : (isLoading
      ? "Cargando..."
      : data.map((post) => 
      <Post post={post} key={post.id} />))}
  </div>
  );
};

export default Posts
