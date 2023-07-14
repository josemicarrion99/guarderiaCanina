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

        const query = "SELECT * FROM users WHERE id=?";

        db.query(query, [userInfo.id], (err, fetchedUser) => {
            if (err) return res.status(500).json(err);

            // 1 => cuidadores home lo que han subido con el pineado arriba
            // 2 => clientes home que salgan posts de su ciudad
            // 3 => clientes profile de cuidador sale lo que han subido con el pineado arriba 
            const q =
                userInfo.type === "Cuidador"
                    ? "SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC"
                    : (userId === "undefined"
                        ? `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId AND u.city = ?) ORDER BY p.createdAt DESC`
                            : `SELECT DISTINCT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId)  WHERE p.userId = ? ORDER BY p.pinned DESC, p.createdAt DESC`);


            const values =
                userInfo.type === "Cuidador"
                    ? [userInfo.id]
                    : (userId === "undefined"
                        ? [fetchedUser[0].city]
                        : [userId]);

            db.query(q, values, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
            });
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
            return res.status(200).json(data);
        });
    });
};


export const deletePost = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = userInfo.type === 'Administrador' 
        ? "DELETE FROM posts WHERE `id` = ?"
        : "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

        const values =  userInfo.type === 'Administrador'  
        ? [req.params.id]
        : [req.params.id, userInfo.id]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("El post se ha eliminado correctamente");
            return res.status(403).json("You can only delete your own post")
        });
    });
};

export const updatePinPost = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE posts p1 JOIN posts p2 ON p1.userId = ? AND p2.userId = ? AND p2.id = ? SET p1.pinned = 0, p2.pinned = 1"; 

        const values =  [userInfo.id, userInfo.id, req.params.id]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("El post ha sido pinneado correctamente");
            return res.status(403).json("You can only delete your own post")
        });
    });


}