import mysql from "mysql2"

export const db = mysql.createConnection({
    host: "192.168.56.1",
    user:"root",
    password:"root",
    database:"guarderia",
})