const router = require("express").Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post("/register", userController.register);
router.post("/login",auth.auth, userController.login);
router.get("/",auth.auth, userController.allUsers);

module.exports = router;
