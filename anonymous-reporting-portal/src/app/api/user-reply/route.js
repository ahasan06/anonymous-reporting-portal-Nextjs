import { dbConnect } from "@/lib/dbConnect";
import Report from "@/models/Report";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const reqBody = await req.json();
        const { anonymousCode, replyMessage } = reqBody;

        const report = await Report.findOne({ anonymousCode });

        if (!report) {
            return NextResponse.json({
                success: false,
                message: "Report not found."
            }, { status: 404 });
        }

        // Push the new message to the report's messages array
        report.messages.push({
            sender: 'user',
            content: replyMessage,
            timestamp: new Date()
        });

        await report.save();

        return NextResponse.json({
            success: true,
            message: "Message sent successfully."
        }, { status: 200 });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({
            success: false,
            message: "There was an error sending your message. Please try again later."
        }, { status: 500 });
    }
}
