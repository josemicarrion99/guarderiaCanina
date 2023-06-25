import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getRelationships = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(relationship => relationship.followerUserId));
  });
}

export const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");


  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //comprobamos si se ha mandado un mensaje en los ultimos dos dias
    const checkingQuery = "SELECT count(*) as messagesSent FROM relationships WHERE followerUserId = ? AND followedUserId = ? AND date(createdAt) > CURDATE() - INTERVAL 2 DAY";

    var messagesSent = 0;
    
    db.query(checkingQuery, [userInfo.id, req.body.followedUserId], (err, result) => {
      messagesSent = result[0].messagesSent;
    });


    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`, `createdAt`,`message`,`estado`, `img`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.followedUserId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.message,
      req.body.estado,
      req.body.img
    ];

    db.query(q, [values], (err, data) => {
      if(messagesSent != 0) return res.status(500).json("Has enviado el mensaje hace menos de dos dias.");

      if (err) return res.status(500).json(err);
      return res.status(200).json("Error.");
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