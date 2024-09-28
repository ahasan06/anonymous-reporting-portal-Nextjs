import mongoose from "mongoose";

// Message schema
const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Define the schema for the report
const ReportSchema = new mongoose.Schema({
    anonymousCode: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true,
        enum: [
            'cse', 
            'eee', 
            'pharmacy', 
            'bba', 
            'english', 
            'law', 
            'canteen', 
            'hostel',
            'others'
        ], 
    },
    issueType: {
        type: String,
        required: true,
        enum: [
            'bullying', 
            'harassment', 
            'discrimination', 
            'food-quality', 
            'infrastructure', 
            'academic-issues', 
            'other'
        ],
    },
    description: {
        type: String,
        required: true,
    },
    evidence: {
        type: [String], 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'in-progress', 'resolved'],
    },
    isEscalated: {
        type: Boolean,
        default: false,
    },
    messages: [MessageSchema], 
});

ReportSchema.pre('save', function (next) {
    this.lastUpdated = Date.now();
    next();
});

// Export the report model
const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default Report;
