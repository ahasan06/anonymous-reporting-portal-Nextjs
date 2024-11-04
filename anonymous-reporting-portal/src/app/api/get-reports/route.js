import { dbConnect } from "@/lib/dbConnect";
import ReportModel from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

// Handle GET request to retrieve reports with pagination and filtering
export async function GET(request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        // Check if the user is authenticated
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

        // Prepare filter object
        const filters = {};
        const status = searchParams.get("status");
        const department = searchParams.get("department");
        const issueType = searchParams.get("issueType");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        if (status) {
            filters.status = status; // Filter by status
        }
        if (department) {
            filters.department = department; // Filter by department
        }
        if (issueType) {
            filters.issueType = issueType; // Filter by issue type
        }

        // Date filtering logic
        if (startDate || endDate) {
            filters.createdAt = {}; // Assuming createdAt is the field for report date
            if (startDate) {
                filters.createdAt.$gte = new Date(startDate); // Greater than or equal to startDate
            }
            if (endDate) {
                filters.createdAt.$lte = new Date(endDate); // Less than or equal to endDate
            }
        }

        // Fetch reports with pagination and filtering
        const reports = await ReportModel.find(filters)
            .select("anonymousCode createdAt department occurrenceDate issueType status description messages")
            .skip(skip)
            .limit(limit);

        const totalReports = await ReportModel.countDocuments(filters); // Get total report count with filters

        // Handle case where no reports are found
        if (!reports || reports.length === 0) {
            return NextResponse.json(
                { success: false, message: "No reports found" },
                { status: 404 }
            );
        }

        // Respond with the reports and pagination data
        return NextResponse.json(
            { 
                success: true, 
                message: reports, 
                totalReports, 
                totalPages: Math.ceil(totalReports / limit), 
                currentPage: page 
            },
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
