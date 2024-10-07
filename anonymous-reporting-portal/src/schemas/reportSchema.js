// Define the Zod schema for report validation
import { z } from "zod";

export const reportSchema = z.object({

    department: z.enum(['cse', 'eee', 'pharmacy', 'bba', 'english', 'law', 'canteen', 'hostel', 'others'], { required_error: "Department is required." }),
    issueType: z.enum(['bullying', 'harassment', 'discrimination', 'food-quality', 'infrastructure', 'academic-issues', 'other'], { required_error: "Issue type is required." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
    evidence: z.array(z.string().url().optional()).optional(),
});

