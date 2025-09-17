import express from "express";
import passport from "passport";
import { verifyToken } from "../Middleware/verifyToken.js";
import { googleLogin } from "../Controllers/oauth.controller.js";
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth, editProfile } from "../Controllers/auth.controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.patch("/edit-profile",verifyToken,editProfile);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//Redirect to Google Login
router.get("/google",passport.authenticate("google",{scope:["profile","email"],prompt:"select_account"}));
router.get("/google/callback",passport.authenticate("google",{session:false}),googleLogin);

export default router;