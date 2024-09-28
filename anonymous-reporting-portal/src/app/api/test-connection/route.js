import { dbConnect } from "@/lib/dbConnect";
export async function GET() {
    console.log("GET request received");
    await dbConnect(); // Call the dbConnect function
    return new Response("Database connection tested!", { status: 200 });
}
