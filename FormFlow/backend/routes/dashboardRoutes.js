const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
    res.json({ message: "Welcome to Dashboard 🚀" });
});

module.exports = router;