// Define the Zod schema for report validation
export const reportSchema = z.object({
    anonymousCode: z.string().min(1, { message: "Anonymous code is required." }).uuid({ message: "Anonymous code must be a valid UUID." }),
    department: z.enum(['cse', 'eee', 'pharmacy', 'bba', 'english', 'law', 'canteen', 'hostel', 'others'], { required_error: "Department is required." }),
    issueType: z.enum(['bullying', 'harassment', 'discrimination', 'food-quality', 'infrastructure', 'academic-issues', 'other'], { required_error: "Issue type is required." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
    evidence: z.array(z.string().url().optional()).optional(), // Evidence is an array of optional URLs
    status: z.enum(['new', 'in-progress', 'resolved']).optional(), // Optional, defaults to 'new' in the mongoose schema
    isEscalated: z.boolean().optional(), // Optional, defaults to false in the mongoose schema
    messages: z.array(messageSchema).optional() // Optional array of messages
});

// Example usage for report creation
export const createReportSchema = reportSchema.pick({
    anonymousCode: true,
    department: true,
    issueType: true,
    description: true,
    evidence: true,
});

// Example usage for updating a report
export const updateReportSchema = reportSchema.partial();