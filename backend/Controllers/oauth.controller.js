import { generateTokenAndSetCookie } from "../Utils/generateTokenAndSetCookie.js";

export const googleLogin = async (req, res) => {
    try {
        const user = req.user;
        generateTokenAndSetCookie(res, user._id);
        res.redirect(`${process.env.CLIENT_URL}`);
    } catch (error) {
        console.log("Error in googleLogin", error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
    }
};
