import { dbConnect } from "@/lib/dbConnect";
import ReportModel from "@/models/Report";
import { NextResponse } from "next/server";

// Handle GET request to retrieve a report based on anonymousCode
export async function GET(request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const anonymousCode = searchParams.get('anonymousCode');
        
        if (!anonymousCode) {
            return NextResponse.json(
                { success: false, message: "Anonymous code is required" },
                { status: 400 }
            );
        }

        const report = await ReportModel.findOne({ anonymousCode }).select("anonymousCode createdAt department occurrenceDate issueType status description messages");
        
        if (!report) {
            return NextResponse.json(
                { success: false, message: "No report found with the provided anonymous code" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: report },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error retrieving report:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
