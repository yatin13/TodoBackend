const AdminMessages = require('../../../db/messages/user.messages');
const db=require("../../../db")

module.exports = {
    add: async (req, res, next) => {
        try {
            const body = req.body;
            const userId=req?.user?.id;
            body['userid']=userId
            let addTodo=await db("todoitems").insert(body).returning("*");
            if(addTodo){
                return res.json({ message: AdminMessages.ADD, data: addTodo,status:true });
            }else{
                return res.json({ message: "Something went wrong!",status:false });
            }
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            let {id}=req.params
            let body=req.body;
            let updatedTodo = await db("todoitems").where({id:id}).update(body);
            if(updatedTodo){
                return res.json({ message: AdminMessages.UPDATE, status:true });
            }else{
                return res.json({ message: "Something went wrong", status:false });
            }
           
        } catch (err) {
            next(err);
        }
    },
    get: async (req, res, next) => {
        try {
            const userId=req?.user?.id
            const todos=await db("todoitems")
            .where({ isdeleted: false ,userid:userId})
            .select()
            .orderBy("created_at", "desc"); 

            if(todos && todos.length>0){
                return res.json({ message: AdminMessages.GET, status:true,data: {todos:todos,count:todos.length}})
            }else{
                return res.json({message:"No todos",status:true,data:{todos:[]}});
            }
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            let {id}=req.params;
          
            let deleteTodo=await db("todoitems").where({id}).update({isdeleted:true}).returning("*")
            if(deleteTodo){
                return res.json({ message: AdminMessages.DELETE, status:true });
            }else{
                return res.json({ message: "Something went wrong!", status:false });
            }
        } catch (err) {
            next(err);
        }
    },
}