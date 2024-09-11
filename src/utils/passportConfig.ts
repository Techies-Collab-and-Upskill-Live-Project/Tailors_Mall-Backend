import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';
import mongoose, { Model } from 'mongoose';
import { IUser } from '../files/user/general/general.interface';
import client from '../files/user/clients/client.model';
import designer from '../files/user/designer/designer.model';


export default function passportConfig<T extends Model<IUser>>(
  model: T,
): void {
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `/auth/client/google/callback`,
      },
      async (_accessToken: string, _refreshToken: string, profile: GoogleProfile, done: any) => {
        console.log('google proile', profile)
        console.log(model)
        const newUser = {
          googleId: profile.id,
          // displayName: profile.displayName,
          fullName: `${profile?.name?.givenName} ${profile?.name?.familyName}`,
          image: profile?.photos?.[0].value,
          email: profile?.emails?.[0].value
        }       
        
        try {
          let user = await model.findOne({ googleId: profile.id });
          console.log("user", user)
          // console.log("user", user)
          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await model.create(newUser)
            console.log("new user", user)
            // console.log("user", user)
            done(null, user)
          }
        } catch (error) {
          console.log("error", error)
          done(error, null);
        }
      }
    )
  );

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        callbackURL: '/auth/client/facebook/callback',
        // profileFields: ['id', 'emails', 'name'],
      },
      async (_accessToken: string, _refreshToken: string, profile: FacebookProfile, done: any) => {
        console.log('facebook', profile)
        const newUser = {
          facebookId: profile.id,
          // displayName: profile.displayName,
          fullName: `${profile?.displayName}`,
          // email: profile?.emails?.[0].value
        }
        try {
          let user = await model.findOne({_id: profile.id});
          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            console.log("facebook profile", profile)
            // if user is not preset in our database save user data to database.
            user = await model.create(profile)
            done(null, user)
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user: Partial<IUser>, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await model.findById(id).select('-password');
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}
