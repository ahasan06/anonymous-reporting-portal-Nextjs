import { dbConnect } from "@/lib/dbConnect";
import ReportModel from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

// Handle GET request to retrieve reports with pagination
export async function GET(request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access or user not authenticated" },
                { status: 401 }
            );
        }

        // Parse the query parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 5; 
        const skip = (page - 1) * limit;

        // Fetch reports with pagination
        const reports = await ReportModel.find()
            .select("anonymousCode createdAt department occurrenceDate issueType status description messages")
            .skip(skip)
            .limit(limit);

        const totalReports = await ReportModel.countDocuments(); // Get total report count

        if (!reports || reports.length === 0) {
            return NextResponse.json(
                { success: false, message: "No reports found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: reports, totalReports, totalPages: Math.ceil(totalReports / limit), currentPage: page },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error retrieving reports:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
