import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/models/User';

export const authOptions = {
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account", 
                },
            },
            async profile(profile) {
                // console.log("profile",profile);
                // const emailDomain = profile.email.split('@')[1];
                // if (emailDomain !== 'uap-bd.edu') {
                //     throw new Error('Only university email addresses are allowed.');
                // }
        
                await dbConnect();
        
                const existingUser = await UserModel.findOne({ email: profile.email });
        
                if (existingUser) {
                    // Update image if not already set
                    if (!existingUser.image) {
                        existingUser.image = profile.picture;
                        await existingUser.save();
                    }
        
                    return {
                        id: existingUser._id.toString(),
                        username: existingUser.username,
                        email: existingUser.email,
                        isVerified: existingUser.isVerified,
                        role: existingUser.role,
                        image: existingUser.image,
                    };
                }
        
                // Handle role assignment (e.g., 'admin' or 'moderator')
                let userRole = 'user'; // Default role
        
                if (profile.email === '21101006@uap-bd.edu') {  // Replace with actual logic
                    userRole = 'admin'; // Assign admin role
                }
        
                const newUser = new UserModel({
                    username: profile.email.split('@')[0],
                    email: profile.email,
                    isVerified: true,
                    role: userRole,
                    image: profile.picture,
                    isGoogleAccount: true,
                });
        
                await newUser.save();
        
                return {
                    id: newUser._id.toString(),
                    username: newUser.username,
                    email: newUser.email,
                    isVerified: newUser.isVerified,
                    role: newUser.role,
                    image: newUser.image,
                };
            },
        }),
        

        // Credentials Provider
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await dbConnect();

                const user = await UserModel.findOne({
                    $or: [
                        { email: credentials.identifier },
                        { username: credentials.identifier }
                    ]
                });

                if (!user) {
                    throw new Error("No user found with this email or username");
                }
                if (!user.isVerified) {
                    throw new Error("Please verify your account before login");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (isPasswordCorrect) {
                    return {
                        id: user._id.toString(),
                        username: user.username,
                        email: user.email,
                        isVerified: user.isVerified,
                        role: user.role,
                        image: user.image,
                    };
                } else {
                    throw new Error("Incorrect password");
                }
            }
        })
    ],
    callbacks: {

        // async signIn({ account, profile }) {
        //     const emailDomain = profile.email.split('@')[1];
        //     if (emailDomain !== 'uap-bd.edu') {
        //         return `/sign-in`;
        //     }
        //     return true;
        // },

        async signIn({ user, account }) {
            if (account.provider === 'google') {
                return true; 
            }
            return true;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.role = token.role;
                session.user.image = token.image;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id;
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.role = user.role;
                token.image = user.image;
            }
            return token;
        }
    },
    pages: {
        signIn: '/dashboard',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key",
};

export default NextAuth(authOptions);
