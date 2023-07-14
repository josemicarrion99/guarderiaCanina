import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getRelationships = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT r.*, name, profilePic FROM relationships AS r JOIN users as u ON (u.id = r.followerUserId) WHERE followedUserId = ? AND r.estado != 'Rechazado'";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}

export const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");


  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //comprobamos si se ha mandado un mensaje en los ultimos dos dias
    const checkingQuery = "SELECT count(*) as messagesSent FROM relationships WHERE followerUserId = ? AND followedUserId = ? AND (date(createdAt) > (CURDATE() - INTERVAL 2 DAY));";

    var estado;
    userInfo.type == "Cuidador" ? estado = 'Aceptado' : estado = 'Pendiente';

    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`, `createdAt`,`message`,`estado`, `img`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.followedUserId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.message,
      estado,
      req.body.img
    ];

    db.query(checkingQuery, [userInfo.id, req.body.followedUserId], (err, result) => {
      if(result[0].messagesSent == 0) {
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Mensaje enviado!!");
        });
      }else{
        return res.status(500).json("Has contactado con este cuidador hace menos de dos días.");
      }
    });
  });
};

export const deleteRelationships = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";


    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow.");
    });
  });
};

export const updateRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE relationships SET `estado`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.estado,
        req.body.id
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

export const findRelationship = (req, respon) => {
  const q = "SELECT * FROM guarderia.relationships WHERE followerUserId = ? AND followedUserId = ? AND estado = 'ACEPTADO';";
  db.query(q, [req.query.userId, req.query.currentUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return respon.status(200).json(data);
  });
};
