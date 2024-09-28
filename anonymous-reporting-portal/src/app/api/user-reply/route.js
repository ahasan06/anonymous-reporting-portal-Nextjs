import { dbConnect } from "@/lib/dbConnect";
import Report from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // const session = await getServerSession(authOptions)
        // if (!session) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "You need to be logged in to send a message."
        //     }, { status: 401 });
        // }
        await dbConnect()
        const reqBody = await req.json();
        const { reportId, message } = reqBody;
        const report = await Report.findOne({ anonymousCode: reportId });

        if (!report) {
            return NextResponse.json({
                success: false,
                message: "Report not found."
            }, { status: 404 });
        }

        report.messages.push({
            sender: 'user',
            content: message,
            timestamp: new Date()
        })
        await report.save();

        return NextResponse.json({
            success: true,
            message: "Message sent successfully.",
        }, { status: 200 });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({
            success: false,
            message: "There was an error sending your message. Please try again later."
        }, { status: 500 });
    }
}

