const Joi=require("joi")
const headerSchema = Joi.object({
    authorization: Joi.string().trim().optional().label('Access token')
})

module.exports = {
    headerSchema
}