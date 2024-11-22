// Define the Zod schema for report validation
import { z } from "zod";

export const reportSchema = z.object({

    department: z.enum(['cse', 'eee', 'pharmacy', 'bba', 'english', 'law', 'canteen', 'hostel','library', 'others'], { required_error: "Department is required." }),
    issueType: z.enum(['bullying', 'harassment', 'discrimination', 'food-quality', 'infrastructure', 'academic-issues', 'other'], { required_error: "Issue type is required." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
    occurrenceDate: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Occurrence date is required and must be a valid date."
    }),

});

