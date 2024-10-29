import { dbConnect } from "@/lib/dbConnect";
import ReportModel from "@/models/Report";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server"


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

        const totalReports = await ReportModel.countDocuments();
        const newReports = await ReportModel.countDocuments({ status: "new" });
        const inProgressReports = await ReportModel.countDocuments({ status: "in-progress" });
        const solvedReports = await ReportModel.countDocuments({ status: "solved" });

        return NextResponse.json({
            success: true,
            totals: {
                totalReports,
                newReports,
                inProgressReports,
                solvedReports,
            },
            
        }, { status: 200 })




    } catch (error) {
        console.error("Error retrieving report statistics:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }

}