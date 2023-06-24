import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// function isAuthenticated() {
//     const token = localStorage.getItem('token');
//     const refreshToken = localStorage.getItem('refreshToken');
//     try {
//       decode(token);
//       const { exp } = decode(refreshToken);
//       if (exp < (new Date().getTime() + 1) / 1000) {
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//     return true;
//   }

export const getPosts = (req, res) => {

    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    let verificado = false;


    if (!token) return res.status(401).json("Not logged in!");

    // if(!isAuthenticated){console.log("Ha caducado!")}

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        verificado = true;
        // const q =
        //     (userId !== "undefined"
        //         ? `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) WHERE p.userId = ?`
        //         : `SELECT DISTINCT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId)
        // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        // ORDER BY p.createdAt DESC`);

        const q =
            (userInfo.type !== "Cuidador"
                ? `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) ` //recibir los posts para los clientes, todos -- La SEGUNDA es 
                : `SELECT DISTINCT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) 
                    ORDER BY p.createdAt DESC`);

        const values =
            userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });

    if(!verificado) return "Token caducado";

};

export const addPost = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("El post se ha creado correctamente");
        });
    });
};


export const deletePost = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";


        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("El post se ha eliminado correctamente");
            return res.status(403).json("You can only delete your own post")
        });
    });
};
