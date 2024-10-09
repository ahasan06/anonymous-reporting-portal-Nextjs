import { z } from "zod";

// Define the schema for tracking report
export const trackingReportSchema = z.object({
  anonymousCode: z.string().min(5, "Anonymous code must be at least 5 characters long"),
});
