const router = require("express").Router();
const { saveProfile } = require("../controllers/profileController");
const auth = require("../middleware/auth");

router.post("/", auth, saveProfile);

module.exports = router;