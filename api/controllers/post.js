import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

//cliente => Home donde mostramos todos los de su ciudad
//Cuidador => Home sus propios posts teniendo uno pineado arriba (igual que si alguien se mete en su perfil)
export const getPosts = (req, res) => {

    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        
        // 1 => cuidadores home lo que han subido con el pineado arriba
        // 2 => clientes home que salgan posts de su ciudad
        // 3 => clientes profile de cuidador sale lo que han subido con el pineado arriba 
        const q =
            userInfo.type === "Cuidador"
            ? "SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) WHERE p.userId = ?"
            : (userId === "undefined"
                ? `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId AND u.city = ?)`  
                : `SELECT DISTINCT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId)  WHERE p.userId = ? ORDER BY p.createdAt DESC`);

        const values =
            userInfo.type === "Cuidador"
            ? [userInfo.id]
            : (userId === "undefined" 
                ? [userInfo.city] 
                : [userId]);


        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });


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
