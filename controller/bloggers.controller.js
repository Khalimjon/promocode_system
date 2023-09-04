const {extname} = require("path");
const {unlink} = require("fs").promises;
const {knex} = require('../database')
const {add} = require("nodemon/lib/rules");

const find = async(req, res)=>{
    try {
        const bloggers = await knex.select("*").from("bloggers");

        res.json({message: "OK", data: bloggers})
    }catch (error){
        res.status(500).json(error)
    }
};
const findOne = async(req, res)=>{
    try {
        const {id} = req.params;
        const {
            rows: [blogger],
        } = await knex.raw(`select * from bloggers where id = :id`, {id});

        if (!blogger) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", data: blogger });
    }catch (error){
        res.status(500).json(error)
    }
};
const create = async(req, res)=>{
    try {
        const {name} = req.body;

        const [newData] = await knex("bloggers")
            .insert({ name, balance: 0 })
            .returning("*");

        res.status(201).json({message: "Success", data: newData});
    }catch (error){
        res.status(500).json(error)
    }
};
const update = async(req, res)=>{
    try {
        const {name, balance} = req.body;
        const {id} = req.params;

        const [data] = await knex("bloggers")
            .update({name, balance})
            .where({id})
            .returning("*");

        res.json({message: "Success", data});
    }catch (error){
        res.status(500).json({ message: 'Internal Server Error'})
    }
};

const updateBalance = async (id, addingBalance) => {
    try {
        await knex('bloggers')
            .where('id', id)
            .increment('balance', addingBalance)
    }
    catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}
const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await knex("bloggers")
            .where({ id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "Success", data: `blogger with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json(error);
    }
};



module.exports = {
    find,
    findOne,
    create,
    update,
    updateBalance,
    destroy
}
