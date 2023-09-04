// const authRouter = require('./auth.route');
const facultyRoute = require("./faculty.route");
const bloggerRoute = require("./bloggers.route");
const promocodeRoute = require("./promocode.route")
const studentRoute = require("./student.route")

module.exports = [facultyRoute, bloggerRoute, promocodeRoute, studentRoute];

