const {extname} = require("path");
const {unlink} = require("fs").promises;
const {knex} = require('../database')

const find = async(req, res)=>{
    try {
        const promocodes = await knex.select("*").from("promocodes");

        res.json({message: "OK", data: promocodes})
    }catch (error){
        res.status(500).json(error)
    }
};
const findOne = async(req, res)=>{
    try {
        const {id} = req.params;
        const {
            rows: [promocode],
        } = await knex.raw(`select * from promocodes where id = :id`, {id});

        if (!promocode) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", data: promocode });
    }catch (error){
        res.status(500).json(error)
    }
};
const create = async(req, res)=>{
    try {
        const { percentage, code, blogger_id} = req.body;

        const bloggerExists = await knex("bloggers")
            .where({ id: blogger_id })
            .first();

        if (!bloggerExists) {
            return res.status(404).json({ message: "Blogger not found" });
        }
        const [newData] = await knex("promocodes")
            .insert({ percentage, code, blogger_id })
            .returning("*");

        res.status(201).json({message: "Success", data: newData});
    }catch (error){
        res.status(500).json({
            error: error
        })
    }
};
const update = async(req, res)=>{
    try {
        const {percentage, code} = req.body;
        const {id} = req.params;

        const [data] = await knex("promocodes")
            .update({percentage, code})
            .where({id})
            .returning("*");

        res.json({message: "Success", data});
    }catch (error){
        res.status(500).json({ message: 'Internal Server Error'})
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await knex("promocodes")
            .where({ id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "Success", data: `promocode with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json(error);
    }
};



module.exports = {
    find,
    findOne,
    create,
    update,
    destroy
}
