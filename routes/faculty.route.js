const {Router} = require('express');
const {find, findOne, create, update, destroy} = require("../controller/faculty.controller");
const router = Router();


router.get("/faculties", find);
router.get("/faculties/:id", findOne);
router.post("/faculties", create);
router.put("/faculties/:id", update);
router.delete("/faculties/:id", destroy);

module.exports = router;