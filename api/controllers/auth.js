import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Usuario ya existe");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`, `type`) VALUE (?)";

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name, req.body.type];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        })

    })

    // const {username, password} = req.body;
    // const hash = await bcrypt.hash(password, 13);

    // users.push({
    //     username, 
    //     password: hash
    // })

    // res.send('ok');

}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Usuario no encontrado");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if (!checkPassword) return res.status(400).json("Password o username incorrectos");

        //secretKey es el nombre de nuestro token
        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        //creamos la cookie para el usuario que inicie sesion
        res.cookie("accessToken", token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out");

}