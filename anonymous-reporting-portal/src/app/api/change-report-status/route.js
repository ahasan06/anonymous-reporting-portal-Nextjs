import { dbConnect } from "@/lib/dbConnect";
import Report from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect();

        // const session = await getServerSession(authOptions);

        // if (!session || session.user.role !== 'admin') {
        //     return NextResponse.json(
        //         { success: false, message: "Unauthorized access" },
        //         { status: 403 }
        //     );
        // }

        const { reportId, status } = await request.json();

        if (!reportId || !status) {
            return NextResponse.json(
                { success: false, message: 'Report ID and status are required.' },
                { status: 400 }
            );
        }


        // Validate status
        const validStatuses = ['new', 'in-progress', 'resolved'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        // Find and update the report
        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            { status },
            { new: true }
        );

        if (!updatedReport) {
            return NextResponse.json(
                { success: false, message: "Report not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Report status updated", data: updatedReport },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating report status:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
