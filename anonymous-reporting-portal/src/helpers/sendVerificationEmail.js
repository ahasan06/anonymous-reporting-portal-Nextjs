import transporter from "./nodemailerTransporter";
import { generateVerificationEmail } from "./emailTemplate";
export async function sendVerificationEmail(email, username, verifyCode) {
    try {
        const emailContent = generateVerificationEmail(username, verifyCode);
        // Send email using the transporter
        const info = await transporter.sendMail({
            from: 'ahasanhabibnahid23@gmail.com', // Sender address
            to: email, // Receiver's email
            subject: 'Verify Your Email address for using secure anonymous portal', // Subject line
            html:emailContent, // The rendered HTML content as a string
        });

        console.log("Email send result:", info);

        if (info.messageId) {
            return {
                success: true,
                message: 'Verification email sent successfully!',
            };
        } else {
            return {
                success: false,
                message: 'Failed to send verification email.',
            };
        }
    } catch (error) {
        console.error("Error occurred while sending verification email:", error.message);
        return {
            success: false,
            message: `An error occurred while sending verification: ${error.message}`,
        };
    }
}
