import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./model";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";


export const{
  handlers:{GET,POST},
  auth,
  signIn,
  signOut,
}=NextAuth({
    ...authConfig,
    providers:[
        GitHub({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
              try {
                const user = await login(credentials);
                return user;
              } catch (err) {
                return null;
              }
            },
          }),
    ],
    callbacks: {
        async signIn({account, profile }) {
          if (account.provider === "github") {
            connectToDb();
            try {
              const user = await User.findOne({ email: profile.email });
    
              if (!user) {
                const newUser = new User({
                  username: profile.login,
                  email: profile.email,
                  image: profile.avatar_url,
                });
    
                await newUser.save();
              }
            } catch (err) {
              console.log(err);
              return false;
            }
          }
          return true;
        },
        ...authConfig.callbacks,
      },

});

const login =async(credentials)=>{
    try{
        connectToDb();
        const user=await User.findOne({username:credentials.username});
        if(!user) throw new Error("Wrong Credentials!");
         const isPasswordCorrect=await bcrypt.compare(
            credentials.password,
            user.password
         );
         if(!isPasswordCorrect) throw new  Error("Wrong Credentials!");
         return user;
    }catch(err){
        console.log(err);
        throw new Error("Failed to Login");
    }
};