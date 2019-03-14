import passport from 'passport';
import usersData from '../data/users';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import passportTwitter from 'passport-twitter';
import passportGoogleOAuth from 'passport-google-oauth2';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
const GoogleStrategy = passportGoogleOAuth.Strategy;

const local = () => {
    passport.use(new LocalStrategy({
            passwordField: 'email'
        },
        (username, password, done) => {
            let user = usersData.find((user) => {
                return user.email === password && user.username === username;
            });
            if (user !== undefined) {
                done(null, user);
            } else {
                done(null, false, 'Bad credentials');
            }
        }));
};

const facebook = () => {
    passport.use(new FacebookStrategy({
            clientID: 'FACEBOOK_APP_ID',
            clientSecret: 'FACEBOOK_APP_SECRET',
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        (accessToken, refreshToken, profile, cb) => {
            User.findOrCreate({facebookId: profile.id}, function (err, user) {
                return cb(err, user);
            });
        }
    ));
};

const twitter = () => {
    passport.use(new TwitterStrategy({
            consumerKey: 'TWITTER_CONSUMER_KEY',
            consumerSecret: 'TWITTER_CONSUMER_SECRET',
            callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
        },
        (token, tokenSecret, profile, cb) => {
            User.findOrCreate({twitterId: profile.id}, function (err, user) {
                return cb(err, user);
            });
        }
    ));
};

const googleOAuth = () => {
    passport.use(new GoogleStrategy({
            clientID: 'GOOGLE_CLIENT_ID',
            clientSecret: 'GOOGLE_CLIENT_SECRET',
            callbackURL: "http://yourdormain:3000/auth/google/callback",
            passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
            User.findOrCreate({googleId: profile.id}, function (err, user) {
                return done(err, user);
            });
        }
    ));
};

module.exports = {
    local: local,
    facebook: facebook,
    twitter: twitter,
    googleOAuth: googleOAuth
};
