const {Router} = require('express');
const {find, findOne, create, update, destroy} = require("../controller/student.controller");
const router = Router();


router.get("/students", find);
router.get("/students/:id", findOne);
router.post("/students", create);
router.put("/students/:id", update);
router.delete("/students/:id", destroy);

module.exports = router;