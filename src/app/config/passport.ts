/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from ".";
import { User } from "../modules/user/user.model";
import { UserRole } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from 'bcryptjs';

// credential login
passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async(email: string, password:string, done: any) => {
          try {
            const isUserExist = await User.findOne({ email });
            if (!isUserExist) {
                return done(null, false, {message: "User does not exist"})
            }

            const isGoogleAuthenticated = isUserExist.auths.some(providerObject => providerObject.provider === "google")
            if(isGoogleAuthenticated && !isUserExist.password){
                return done(null, false, {message: "You have authenticated with google"})
            }

              const isPasswordMatched =await bcryptjs.compare(password as string, isUserExist.password as string);
            if(!isPasswordMatched){
                return done(null, false, {message: "Password not matched"})
            }

            return done(null, isUserExist)

       } catch (error) {
            done(error)         
          }  
    })
)

passport.use(
    new GoogleStrategy({
        clientID:envVars.CLIENT_ID,
        clientSecret:envVars.CLIENT_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL
    }, async (accessToken:string, refreshToken:string, profile: Profile, done:VerifyCallback) => {

        try {
              const email = profile.emails?.[0].value;

              if(!email){
                return done(null, false, {message: "not email found"});
              }

              let user = await User.findOne({email});
              if(!user){
                   user = await User.create({
                    email, 
                    name: profile.displayName,
                    picture: profile.photos?.[0].value,
                    role: UserRole.USER,
                    isVarified:true,
                    auths: [
                       {
                         provider: "google",
                        providerId: profile.id
                       }
                    ]
                   });

              }

              return  done (null, user)

        } catch (error) {
            console.log("Google Stategy Error", error);
            return done(error);
        }
    })
);


passport.serializeUser((user:any, done:(err:any, id?:unknown) => void) => {
    done(null, user._id);
});

passport.deserializeUser(async (id:string, done:any) => { 
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error)
    }
})