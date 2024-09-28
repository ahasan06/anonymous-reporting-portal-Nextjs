import { dbConnect } from "@/lib/dbConnect";
import Report from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as necessary
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // // Step 1: Check session
        // const session = await getServerSession(authOptions);
        // if (!session || session.user.role !== 'admin') {
        //     return NextResponse.json({
        //         success: false,
        //         message: "You need to be an admin to reply to reports."
        //     }, { status: 401 });
        // }

        // // Step 2: Connect to the database
        // await dbConnect();

        // Step 3: Parse the incoming request body
        const reqBody = await req.json();
        const { reportId, replyMessage, status } = reqBody;

        // Step 4: Find the report by ID
        const report = await Report.findOne({ anonymousCode: reportId });
        if (!report) {
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

        if (status) {
            report.status = status; // Update status if provided
        }

        // Step 6: Save the updated report
        await report.save();

        // Step 7: Respond with success
        return NextResponse.json({
            success: true,
            message: "Reply sent and report status updated successfully.",
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating report:", error);
        return NextResponse.json({
            success: false,
            message: "There was an error updating the report. Please try again later."
        }, { status: 500 });
    }
}
