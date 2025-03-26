const { TokenService } = require('../../../services')
const AdminMessages = require('../../../db/messages/user.messages');
const bcryptjs = require('bcryptjs');
const db = require("../../../db");

module.exports = {
    signup: async (req, res, next) => {
        try {
            const body = req.body;
            const { email, password } = body;
            let isUserCreated = await db("users").where({ email }).first();
            if (isUserCreated) {
                return res.json({ message: "User already exists", status: false });
            }

            // Hash the password before saving
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Insert the new user
            let [userCreated] = await db("users")
                .insert({ ...body, password: hashedPassword })
                .returning("*");

            if (userCreated) {
                return res.json({
                    message: AdminMessages.ADD,
                    data: userCreated,
                    status: true,
                    token: await TokenService.create({ _id: userCreated.id }, {})
                });
            } else {
                return res.json({ message: "Something went wrong!", status: false });
            }
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            let {email,password}=req.body
            let user = await db("users").where({ email }).first();
            if(user == null) throw badReqErr({message:AdminMessages.INVALID_CREDENTIAL});
            if(!await bcryptjs.compare(password,user.password)) throw badReqErr({message:AdminMessages.INVALID_CREDENTIAL});
            user = JSON.parse(JSON.stringify(user)); 
            delete user.password
            delete req.user;
            return res.json({ message: AdminMessages.AUTH_LOGIN, status:true,data: user,token:await TokenService.create({_id:user.id},{}) });
        } catch (err) {
            next(err);
        }
    }
}