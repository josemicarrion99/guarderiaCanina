import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const getOwnUser = (req, res) => {

  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];

    return res.status(200).json(info);
  });
};

export const getUser = (req, res) => {

  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE email=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};



export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

      const q = "UPDATE users SET `email`=?, `username`=?,`city`=?,`language`=?,`profilePic`=?,`coverPic`=?, `phone`=? WHERE id=? "

      const values = [req.body.email, req.body.username, req.body.city, req.body.language, req.body.profilePic, req.body.coverPic, req.body.phone, userInfo.id];


      db.query(
        q,values,
        (err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
  });
};


export const updatePasswordUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");


      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password[0], salt);


      const q = "UPDATE users SET `email`=?, `username`=?,`city`=?,`language`=?,`profilePic`=?,`coverPic`=?, `password`=?, `phone`=? WHERE id=? "
      const values = [req.body.email, req.body.username, req.body.city, req.body.language, req.body.profilePic, req.body.coverPic, [hashedPassword], req.body.phone, userInfo.id];

      db.query(
        q,values,
        (err, data) => {
          if (err) res.status(500).json(err);
          if (data.affectedRows > 0) return res.json("Updated!");
          return res.status(403).json("You can update only your post!");
        }
      );
  });
};


export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");


  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM users WHERE id = ? ";

    const values = req.params.userId === undefined ? [userInfo.id] : [req.params.userId];

    db.query(q, values,
      (err, data) => {
        if (err) res.status(500).json(err);
        if(userInfo.type !== 'Administrador'){
          res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
          })
        }
        return res.status(200).json("El usuario ha sido eliminado");

      }
    );
  });
};

