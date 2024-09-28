import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        await dbConnect()
        console.log("Received POST request for user verification");
        const {username,code} = await request.json()
        const decodeUsername = decodeURIComponent(username)
        console.log("Decoded username:", decodeUsername);

        const user = await UserModel.findOne({username:decodeUsername})
        console.log("Lookup result for user:", user);

        if (!user) {
            console.log("User not found for username:", decodeUsername);
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found!",
                },
                {
                    status:500
                }
            )
        }
        const isCodevalid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
        console.log("Code validation status:", { isCodevalid, isCodeNotExpired });

        if (isCodevalid && isCodeNotExpired) {
            console.log("User verified and updated in database:", user);
            user.isVerified = true
            await user.save()
            
            return NextResponse.json(
                {
                    success: true,
                    message: "account verified successfully",
                },
                {
                    status:200
                }
            )
        }
        else if(!isCodeNotExpired) {
            console.log("Verification code expired for user:", decodeUsername);
            return NextResponse.json(
                {
                    success: false,
                    message: "verification code expired! please signup again to get a new code",
                },
                {
                    status:400
                }
            )
         }
         else{
            console.log("Incorrect verification code provided for user:", decodeUsername);
            return NextResponse.json(
                {
                    success: false,
                    message: "incorrect verification code",
                },
                {
                    status:400
                }
            )
         }


    } catch (error) {
        console.error("Error occurred during user verification:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Error occurred during user verification",
            },
            {
                status:500
            }
        )
    }
}   