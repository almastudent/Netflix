import express from "express";
import Register, { login, logout } from "../controller/user.js"


const router=express.Router()


router.route("/register").post(Register);

router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;