const {Router} = require('express');
const {find, findOne, create, update, destroy} = require("../controller/promocode.controller");
const router = Router();


router.get("/promocodes", find);
router.get("/promocodes/:id", findOne);
router.post("/promocodes", create);
router.put("/promocodes/:id", update);
router.delete("/promocodes/:id", destroy);

module.exports = router;