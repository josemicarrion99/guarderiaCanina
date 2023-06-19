import {db} from "../connect.js";

export const getPosts = (req, res) =>{

    const q = `SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId)`;

    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}