import { dbConnect } from "@/lib/dbConnect";
import Report from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { nanoid } from 'nanoid'; // To generate a unique report ID
import { NextResponse } from "next/server"; // Use NextResponse from next/server

export async function POST(req) {
    try {
        // Step 1: Check session (use getServerSession for App Router)
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: "You need to log in to submit a report."
            }, { status: 401 });
        }

        // Step 2: Connect to the database
        await dbConnect();

        // Step 3: Parse incoming report data
        const reqBody = await req.json();
        const { department, issueType, description, evidence, occurrenceDate } = reqBody;

       
        const parsedDate = new Date(occurrenceDate);
        if (isNaN(parsedDate.getTime())) {
            return NextResponse.json({
                success: false,
                message: "Invalid date format for occurrence date."
            }, { status: 400 });
        }
        
        // Step 4: Generate a unique anonymous code
        const anonymousCode = nanoid(8); // Example unique code generation

        // Step 5: Create the report in the database
        const newReport = new Report({
            anonymousCode,
            department,
            issueType,
            description,
            occurrenceDate: parsedDate, 
            evidence: evidence || [], 
            status: "new",
            isEscalated: false,
            messages: []
        });

        // Step 6: Save the report
        const savedReport = await newReport.save();

        // Step 7: Respond with success and return the unique code
        return NextResponse.json({
            success: true,
            message: "Report submitted successfully.",
            anonymousCode: anonymousCode,
            reportId: savedReport._id
        }, { status: 201 });
    } catch (error) {
        console.error("Error submitting report:", error);
        return NextResponse.json({
            success: false,
            message: "There was an error submitting your report. Please try again later."
        }, { status: 500 });
    }
}
