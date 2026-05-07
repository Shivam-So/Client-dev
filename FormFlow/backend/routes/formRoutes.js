const router = require("express").Router();
const { submitForm } = require("../controllers/formcontroller");
const auth = require("../middleware/auth");

router.post("/", auth, submitForm);

module.exports = router;