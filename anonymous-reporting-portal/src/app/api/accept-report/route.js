import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        await dbConnect();
        console.log("Database connected for POST request.");
        const session = await getServerSession(authOptions)
        console.log("Session retrieved:", session);

        if (!session || session.user.role !== 'admin') {
            console.log("Unauthorized access or no user session found.");
            return NextResponse.json(
                {
                    success: false,
                    message: "Only admin users can update this statuss.",
                },
                { status: 403 }
            );
        }

         // Extract data from the request body
         const { acceptReport } = await request.json();
         console.log("Request to set all admins' report acceptance status to:", acceptReport);

         const UpdateUserAdmin = await UserModel.updateMany(
            {role:'admin'},
            {isAcceptingReport:acceptReport},
            {new:true}
         )

         console.log(`${result.nModified} admins updated.`);
         if (!UpdateUserAdmin) {
            console.log("No admins found or failed to update.");
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to update report acceptance status for admins.",
                },
                { status: 404 }
            );
         }


    } catch (error) {
        console.error("Error updating admin status:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update admins' report acceptance status.",
                error: error.message,
            },
            { status: 500 }
        );
    }


}

export async function GET(request) {

    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        // Check if session exists
        if (!session || !session.user || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: "Unauthorized access or user not authenticated" },
                { status: 401 }
            );
        }
         // Find the first admin (or the current admin) and retrieve `isAcceptingReport` field
         const admin = await UserModel.findOne({ role: 'admin' }).select("isAcceptingReport");
         if (!admin) {
            return NextResponse.json(
                { success: false, message: "Admin not found" },
                { status: 404 }
            );
        }


           // Return success response with the current state of `isAcceptingReport`
           return NextResponse.json(
            { success: true, isAcceptingReport: admin.isAcceptingReport },
            { status: 200 }
        );


        
    } catch (error) {
        console.error("Error fetching report acceptance status:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }

}