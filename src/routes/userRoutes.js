const router = require("express").Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validator = require('../middleware/validation')

router.post("/register",validator.valUserRegister,userController.register);
router.post("/login",auth.auth,validator.valUserLogin,userController.login);
router.get("/",auth.auth, userController.allUsers);

module.exports = router;
