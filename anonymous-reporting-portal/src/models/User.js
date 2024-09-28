import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email'],
    },
    password: {
        type: String,
        required: function () {
            // Password is required for non-Google sign-ins
            return !this.isGoogleAccount;
        },
    },
    verifyCode: {
        type: String,
        required: function () {
            // Verification code is required for manual sign-ups
            return !this.isGoogleAccount;
        },
    },
    verifyCodeExpiry: {
        type: Date,
        required: function () {
            // Verification code expiry is required for manual sign-ups
            return !this.isGoogleAccount;
        },
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
    },
    image: {
        type: String,
        required:false
    },
    isAcceptingReport: {
        type: Boolean,
        default: true,
        required: function () {
            return this.role === 'admin';
        },
    },
    isGoogleAccount: {
        type: Boolean,
        default: false, // True for Google accounts, false for others
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default UserModel;
