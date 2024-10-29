import { dbConnect } from "@/lib/dbConnect";
import Report from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Step 1: Check session
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            console.log("Unauthorized access attempt"); // Log unauthorized access
            return NextResponse.json({
                success: false,
                message: "You need to be an admin to reply to reports."
            }, { status: 401 });
        }

        // Step 2: Connect to the database
        await dbConnect();

        // Step 3: Parse the incoming request body
        const reqBody = await req.json();
        console.log("Request body received:", reqBody); // Log the request body for verification
        const { reportId, replyMessage, status } = reqBody;

        // Step 4: Find the report by anonymous code (reportId)
        const report = await Report.findOne({ anonymousCode: reportId });
        if (!report) {
            console.log("Report not found for ID:", reportId); // Log if report is not found
            return NextResponse.json({
                success: false,
                message: "Report not found."
            }, { status: 404 });
        }

        // Step 5: Update the report with the admin's reply and status
        report.messages.push({
            sender: 'admin',
            content: replyMessage,
            timestamp: new Date()
        });
        console.log("Message pushed to report:", replyMessage); // Log message added to the report

        if (status) {
            report.status = status; // Update status if provided
            console.log("Report status updated:", status); // Log status update
        }

        // Step 6: Save the updated report
        await report.save();
        console.log("Report updated successfully");

        // Step 7: Respond with success
        return NextResponse.json({
            success: true,
            message: "Reply sent and report status updated successfully.",
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating report:", error); // Log error details
        return NextResponse.json({
            success: false,
            message: "There was an error updating the report. Please try again later."
        }, { status: 500 });
    }
}
