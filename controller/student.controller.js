const {extname} = require("path");
const {unlink} = require("fs").promises;
const {knex} = require('../database')
const {login} = require("./auth.controller");
const {updateBalance} = require("./bloggers.controller");

const find = async(req, res)=>{
    try {
        const students = await knex.select("*").from("students");

        res.json({message: "OK", data: students})
    }catch (error){
        res.status(500).json(error)
    }
};
const findOne = async(req, res)=>{
    try {
        const {id} = req.params;
        const {
            rows: [student],
        } = await knex.raw(`select * from students where id = :id`, {id});

        if (!student) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", data: student });
    }catch (error){
        res.status(500).json(error)
    }
};
const create = async(req, res)=>{
    try {
        console.log('Keldim: ')
        const { name, promocode, faculty } = req.body;
        const [promocodeData] = await knex('promocodes').where('code', promocode);
        console.log('Promocode: ', promocodeData);
        if(!promocodeData) {
            throw new Error('Promocode not found');
        }

        const [facultyInfo] = await knex('faculties').where('name', faculty);
        console.log('Faculty info: ', facultyInfo);

        if(!facultyInfo) {
            throw new Error('Faculty not found');
        }
        const [newData] = await knex("students")
            .insert({ name, amount: facultyInfo.price, promocode_id: promocodeData.id, faculty_id: facultyInfo.id })
            .returning("*");
        const addingBalance = Number(facultyInfo.price * promocodeData.percentage) / 100;
        console.log('Adding balance: ', addingBalance);
        await updateBalance(promocodeData.id, addingBalance);

        res.status(201).json({message: "Success", data: newData});
    }catch (error){
        console.error('Error occurred: ', error);
        res.json({
            success: false,
            message: error.message
        })
    }
};
const update = async(req, res)=>{
    try {
        const {name, amount} = req.body;
        const {id} = req.params;

        const [data] = await knex("students")
            .update({name, amount})
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

        const deletedRows = await knex("students")
            .where({ id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "Success", data: `student with ID ${id} has been deleted` });
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
