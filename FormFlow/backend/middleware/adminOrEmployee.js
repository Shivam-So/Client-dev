module.exports = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "employee") {
        return res.status(403).json({ msg: "Access denied" });
    }
    next();
};