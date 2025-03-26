const jwt = require('jsonwebtoken');
const { env } = require('../db/constant')
const db = require("../db")
module.exports = () => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).send({ success:false,errors: "Access Token not provided" });
        }
        const { _id } = jwt.verify(token, env.JWT_SECRET);

        if(!_id){
            return res.status(400).send({ success:false,errors: "Invalid request" });
        }

        let user = await db("users").where({ id:_id }).first();

        if(!user){
            return res.status(400).send({ success:false,errors: "User not found" });
        }

        req.user = JSON.parse(JSON.stringify(user));
        next();
    } catch (error) {
        res.status(401).json({
            message: "Auth Failed!"
        })
    }
}