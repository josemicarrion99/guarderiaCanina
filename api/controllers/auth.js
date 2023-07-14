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

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`, `type`, `phone`) VALUE (?)";

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name, req.body.type, req.body.phone];

        db.query(q, [values], (err, data) => {

            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        })

    })


}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";

    const query = "SELECT r.*, name, profilePic FROM relationships AS r JOIN users as u ON (u.id = r.followerUserId) WHERE followedUserId = ? ";

    db.query(q, [req.body.username], (err, data) => {
        db.query(query, [data[0].id], (errRelationships, dataRelationships) => {
            if (errRelationships) return res.status(500).json(errRelationships);

            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("Usuario no encontrado");

            if (req.body.username === undefined) {
                const refreshToken = jwt.sign(
                    { id: data[0].id, type: data[0].type, city: data[0].city },
                    process.env.REFRESH_TOKEN_KEY,
                    { expiresIn: '1d' });


                res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: 24 * 60 * 60 * 1000 }); // call succeeded. what is the name of cookie?


            } else {
                const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

                if (!checkPassword) return res.status(400).json("Password o username incorrectos");

                // return res.status(200).json(dataRelationships);
                //secretKey es el nombre de nuestro token
                //aqui cambiamos lo que le pasamos por cookie a las otras paginas de la app
                const token = jwt.sign(
                    { id: data[0].id, type: data[0].type, city: data[0].city, numbers: dataRelationships[0] },
                    "secretkey",
                    { expiresIn: '120m' }
                );





                const { password, ...others } = data[0];

                //creamos la cookie para el usuario que inicie sesion
                res.cookie("accessToken", token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json(others);


            }

        })
    });
};



export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out");

}
