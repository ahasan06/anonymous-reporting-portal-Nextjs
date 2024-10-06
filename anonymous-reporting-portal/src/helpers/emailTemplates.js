// This function generates the email content for verification
export function generateVerificationEmail(username, verifyCode) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
            <h2 style="text-align: center; color: #333;">Email Verification</h2>
            <p style="font-size: 16px; color: #555;">Hello <strong>${username}</strong>,</p>
            <p style="font-size: 16px; color: #555;">
                Thank you for registering! Please use the following OTP code to verify your email address:
            </p>
            <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; color: #333;">
                ${verifyCode}
            </div>
            <p style="font-size: 16px; color: #555; text-align: center;">
                If you did not request this, please ignore this email.
            </p>
            <footer style="font-size: 12px; color: #aaa; text-align: center; margin-top: 20px;">
                This is an automated email from the secure anonymous portal.
            </footer>
        </div>
    `;
}
