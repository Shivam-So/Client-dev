const router = require("express").Router();
const { submitForm } = require("../controllers/formController");
const auth = require("../middleware/auth");

router.post("/", auth, submitForm);

module.exports = router;