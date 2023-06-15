import "./posts.scss"
import Post from "../post/Post"

export const Posts = () => {

      //temporary data
  const posts = [
    {
      id:1, 
      name:"Jose1",
      userId:1,
      profilePicture:"https://free-images.com/lg/ec9a/sea_dolphin_blue_in_0.jpg",
      img:"https://free-images.com/lg/c7fd/kiss_dolphin_water_sea_0.jpg",
      description:"guaaaauu me encanta esta foooototootoototoot ototoototootototo",
    },
    {
      id:2, 
      name:"Miriam2",
      userId:2,
      profilePicture:"https://free-images.com/lg/ec9a/sea_dolphin_blue_in_0.jpg",
      img:"https://free-images.com/lg/c7fd/kiss_dolphin_water_sea_0.jpg",
      description:"adfafaw egaghsddd ddddddddddddd ddddddddddddddd ddddddd",
    },
    {
      id:3, 
      name:"Miriam3",
      userId:3,
      profilePicture:"https://free-images.com/lg/ec9a/sea_dolphin_blue_in_0.jpg",
      description:"Ladaruefoiamw fevoipehavnaoivsnb auoseehy fouoasf opifaysdd yfassypuf ",
    },
  ]
      
  return <div className="posts">
      {posts.map(post=>(
        <Post post={post} key={post.id}/>
      ))}
    </div>;
};

export default Posts
