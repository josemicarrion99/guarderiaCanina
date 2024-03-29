import express from "express";
const app = express();
import fs from 'fs';
import https from 'https';
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/posts.js"
import relationshipRoutes from "./routes/relationships.js"

import cookieParser from "cookie-parser"
import cors from "cors"
import multer from "multer"

//alt+shift+f para formatear

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "https://localhost:3000",
}));
app.use(cookieParser()) //permite la lectura de la cookie de mi cliente

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) =>{
    const file = req.file;
    res.status(200).json(file.filename);
})

// Load SSL certificate and private key from the base directory
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/relationships", relationshipRoutes)




const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3001, () => {
    console.log("HTTPS Server running on port 3001");
});