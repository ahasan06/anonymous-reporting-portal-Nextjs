import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";
await dbConnect()
export async function POST(request) {
    try {

        const reqBody = await request.json()
        console.log("Post request for signup", reqBody);
        const { username, email, password, role, invitationCode } = reqBody;

        //1. Validate the email domain for manual signup (only university emails allowed)
        // const emailDomain = email.split('@')[1];
        // if (emailDomain !== 'uap-bd.edu') {
        //     return NextResponse.json({
        //         success: false,
        //         message: "You must use your university email address (@uap-bd.edu).",
        //     },
        //         { status: 400 })
        // }

        //2. Validate the username to match the university ID (e.g., 2110100...)
        // const emailIdAsUsername = email.split('@')[0];
        // if (emailIdAsUsername !== username) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "You must use your university ID as username (e.g., 2110100...).",
        //     },
        //         { status: 400 })
        // }

        //3. Check if the username is already taken by a verified user
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return NextResponse.json({
                success: false,
                message: "Username is already taken!",
            }, { status: 400 });
        }

        // 5. Check if the email is already in use
        const existingUserByEmail = await UserModel.findOne({ email })
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "A user with this email already exists. Try with another email.",
                }, { status: 400 });
            }
            // If email exists but user is not verified
            else {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt)
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1)

                existingUserByEmail.password = hashPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = expiryDate
                await existingUserByEmail.save();
            }
        }

        else {
            // 6. Role Assignment Logic based on role and invitation code
            let userRole = 'user'

            if (role === 'admin') {
                if (invitationCode == process.env.ADMIN_SIGNUP_CODE) {
                    userRole = 'admin';
                }
                else {
                    return NextResponse.json({
                        success: false,
                        message: "Invalid invitation code for Admin.",
                    }, { status: 400 });
                }
            }

            else if (role === 'moderator') {
                if (invitationCode === process.env.MODERATOR_SIGNUP_CODE) {
                    userRole = 'moderator';
                } else {
                    return NextResponse.json({
                        success: false,
                        message: "Invalid invitation code for Moderator.",
                    }, { status: 400 });
                }
            }
            
            // 4. Generate verification code
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("Generated 6-digit verify code:", verifyCode);

            // 7. Create a new user if email and username are not already used
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,  // Not verified yet
                isAcceptingMessages: true,
                role: userRole,  // Set the role (user/admin/moderator)
            });

            const savedUser = await newUser.save();
            console.log("New user created:", savedUser);

            //8. Send verification email 
            const emailResponse = await sendVerificationEmail(email, username, verifyCode)
            console.log("Email response:", emailResponse);
            if (!emailResponse.success) {
                return NextResponse.json({
                    success: false,
                    message: emailResponse.message,
                }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                message: "User registered successfully! Please verify your email.",
            }, { status: 200 });
        }
    } catch (error) {
        console.error("Error registering user", error);
        return NextResponse.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 })
    }
}