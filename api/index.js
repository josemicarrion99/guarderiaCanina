import express from "express";
const app = express();
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser"
import cors from "cors"


//middlewares
app.use(express.json())
app.use(cors())
// app.use(cookieParser) //hace que no me funcione la bbdd


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/posts", postRoutes)


app.listen(8800, () =>{
    console.log("API working!!")
});