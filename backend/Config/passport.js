import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../Models/user.model.js";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.NODE_ENV === "production"
    ? `${process.env.BACKEND_URL}/api/auth/google/callback`
    : "http://localhost:5000/api/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                // check if a user already exists with this email
                const existingUser = await User.findOne({ email: profile.emails[0].value });
                if (existingUser) {
                    // link googleId and update name/avatar if missing
                    existingUser.googleId = profile.id;
                    existingUser.isLoggedIn = true;
                    existingUser.name = existingUser.name || profile.displayName;
                    existingUser.avatar = existingUser.avatar || profile.photos[0]?.value;
                    await existingUser.save();
                    return cb(null, existingUser);
                }
                user = await User.create({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0]?.value,
                    avatar: profile.photos[0]?.value,
                    isVerified: true
                })
            }
            else {
                user.lastLogin = new Date(); 
                user.name = user.name || profile.displayName;
                user.avatar = user.avatar || profile.photos[0]?.value;
                await user.save();
            }
            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));