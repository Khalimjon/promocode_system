const {Router} = require('express');
const {find, findOne, create, update, destroy} = require("../controller/bloggers.controller");
const router = Router();


router.get("/bloggers", find);
router.get("/bloggers/:id", findOne);
router.post("/bloggers", create);
router.put("/bloggers/:id", update);
router.delete("/bloggers/:id", destroy);

module.exports = router;