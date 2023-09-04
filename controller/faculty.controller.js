const {extname} = require("path");
const {unlink} = require("fs").promises;
const {knex} = require('../database')

const find = async(req, res)=>{
    try {
        const faculties = await knex.select("*").from("faculties");

        res.json({message: "OK", data: faculties})
    }catch (error){
        res.status(500).json(error)
    }
};
const findOne = async(req, res)=>{
    try {
        const {id} = req.params;
        const {
            rows: [faculty],
        } = await knex.raw(`select * from faculties where id = :id`, {id});

        if (!faculty) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", data: faculty });
    }catch (error){
        res.status(500).json(error)
    }
};
const create = async(req, res)=>{
    try {
        const {name, price} = req.body;
        const [newData] = await knex("faculties")
            .insert({name, price})
            .returning("*");

        res.status(201).json({message: "Success", data: newData});
    }catch (error){
        res.status(500).json(error)
    }
};
const update = async(req, res)=>{
    try {
        const {name, price} = req.body;
        const {id} = req.params;

        const facultyExists = await knex("faculties")
            .where({ id })
            .first();

        if (!facultyExists) {
            return res.status(404).json({ message: "Faculty not found" });
        }


        const [data] = await knex("faculties")
            .update({name, price})
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

        const deletedRows = await knex("faculties")
            .where({ id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "Success", data: `Faculty with ID ${id} has been deleted` });
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
