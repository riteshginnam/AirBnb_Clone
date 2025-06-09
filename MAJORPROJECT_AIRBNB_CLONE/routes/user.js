const express=require("express");
const { route } = require("./listing");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const User=require("../models/user.js");
const passport = require("passport");
const {saveredirectUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");

router.get("/signUp",userController.renderSignUpForm);

router.post("/signUp", wrapAsync(userController.signUp));


router.get("/login",userController.renderLoginForm);

router.post("/login",saveredirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(userController.login));

router.get("/logout",userController.logout);

module.exports=router;