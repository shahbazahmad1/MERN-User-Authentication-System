import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error("error sending verification email", error);
        throw new Error(`Error sending verification email:${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "387669f4-0b6d-4637-8f2f-e166d1ea39d2",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name
            }
        });
        console.log(" Welcome Email sent successfully", response);
    } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
    } catch (error) {
        console.log(`Error sending password reset email`, error);
        throw new Error("Error sending password reset email");
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            to: recipient,
            from: sender,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Successful"
        });
        console.log("Reset successful email sent", response);
    } catch (error) {
        console.log('Error sending reset success email', error);
        throw new Error('Error sending reset success email');
    }
};