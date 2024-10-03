import { dbConnect } from "@/lib/dbConnect";
import ReportModel from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

// Handle GET request to retrieve all reports with their statuses
export async function GET(request) {
    try {
        await dbConnect()
        // const session = await getServerSession(authOptions)
        // if (!session || !session.user || ['admin','moderator'].includes(session.user.role)) {
        //     return NextResponse.json(
        //         { success: false, message: "Unauthorized access or user not authenticated" },
        //         { status: 401 }
        //     )
        // }
        const reports = await ReportModel.find().select("anonymousCode createdAt department issueType status description messages")
        if (!reports || reports.length === 0) {
            return NextResponse.json(
                { success: false, message: "No reports found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: reports},
            { status: 200 }
        )
        
    } catch (error) {
        console.error("Error retrieving reports:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}