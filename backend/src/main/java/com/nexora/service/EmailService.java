package com.nexora.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendVerificationEmail(String toEmail, String recipientName, String verificationUrl) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail, "Nexora");
        helper.setTo(toEmail);
        helper.setSubject("Welcome to Nexora - Verify Your Email");

        String htmlContent = String.format(
                "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <title>Verify Your Nexora Account</title>\n" +
                        "    <style>\n" +
                        "        .btn-hover:hover {\n" +
                        "            transform: translateY(-2px);\n" +
                        "            filter: brightness(1.1);\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body style=\"margin: 0; padding: 0; background-color: #080710; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;\">\n"
                        +
                        "    <div style=\"background-color: #080710; padding: 50px 20px; text-align: center;\">\n" +
                        "        <div style=\"max-width: 520px; margin: 0 auto; background-color: #121324; border-radius: 24px; border: 1px solid #232248; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); text-align: center;\">\n"
                        +
                        "            <div style=\"height: 5px; background: #7c3aed; background: linear-gradient(90deg, #7c3aed 0%%, #db2777 50%%, #06b6d4 100%%);\"></div>\n"
                        +
                        "            <div style=\"padding: 44px 36px;\">\n" +
                        "                <div style=\"margin-bottom: 32px;\">\n" +
                        "                    <span style=\"font-size: 34px; font-weight: 800; letter-spacing: -0.5px; color: #db2777; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">Nexora</span>\n"
                        +
                        "                </div>\n" +
                        "                <h2 style=\"color: #ffffff; margin-top: 0; margin-bottom: 18px; font-size: 26px; font-weight: 700; line-height: 1.25; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">\n"
                        +
                        "                    Welcome to Nexora, %s!\n" +
                        "                </h2>\n" +
                        "                <p style=\"color: #b4b6d4; font-size: 15.5px; line-height: 1.65; margin-bottom: 36px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">\n"
                        +
                        "                    Thank you for registering. To activate your account and set up your password, click the verification button below:\n"
                        +
                        "                </p>\n" +
                        "                <div style=\"margin: 40px 0;\">\n" +
                        "                    <a class=\"btn-hover\" href=\"%s\" style=\"background-color: #7c3aed; background-image: linear-gradient(135deg, #7c3aed 0%%, #db2777 100%%); color: #ffffff !important; text-decoration: none; padding: 16px 40px; border-radius: 14px; font-size: 16px; font-weight: 700; display: inline-block; box-shadow: 0 10px 20px -3px rgba(124, 58, 237, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; transition: all 0.3s ease;\">\n"
                        +
                        "                        Verify Email & Set Password\n" +
                        "                    </a>\n" +
                        "                </div>\n" +
                        "                <p style=\"color: #6f729e; font-size: 13.5px; line-height: 1.6; margin-bottom: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">\n"
                        +
                        "                    If you didn't request this email, you can safely ignore it.\n" +
                        "                </p>\n" +
                        "                <div style=\"margin-top: 40px; margin-bottom: 26px; border-top: 1px solid #232248;\"></div>\n"
                        +
                        "                <div style=\"font-size: 12px; color: #474973; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; letter-spacing: 0.5px;\">\n"
                        +
                        "                    &copy; 2026 NEXORA. Crafted with passion. All rights reserved.\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "</html>",
                recipientName, verificationUrl);

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }

    public void sendResetPasswordEmail(String toEmail, String recipientName, String resetUrl) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail, "Nexora");
        helper.setTo(toEmail);
        helper.setSubject("Reset Your Nexora Password");

        String htmlContent = String.format(
                "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <title>Reset Your Nexora Password</title>\n" +
                        "    <style>\n" +
                        "        .btn-hover:hover {\n" +
                        "            transform: translateY(-2px);\n" +
                        "            filter: brightness(1.1);\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body style=\"margin: 0; padding: 0; background-color: #080710; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;\">\n"
                        +
                        "    <div style=\"background-color: #080710; padding: 50px 20px; text-align: center;\">\n" +
                        "        <div style=\"max-width: 520px; margin: 0 auto; background-color: #121324; border-radius: 24px; border: 1px solid #232248; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); text-align: center;\">\n"
                        +
                        "            <div style=\"height: 5px; background: #7c3aed; background: linear-gradient(90deg, #7c3aed 0%%, #db2777 50%%, #06b6d4 100%%);\"></div>\n"
                        +
                        "            <div style=\"padding: 44px 36px;\">\n" +
                        "                <div style=\"margin-bottom: 32px;\">\n" +
                        "                    <span style=\"font-size: 34px; font-weight: 800; letter-spacing: -0.5px; color: #db2777; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">Nexora</span>\n"
                        +
                        "                </div>\n" +
                        "                <h2 style=\"color: #ffffff; margin-top: 0; margin-bottom: 18px; font-size: 26px; font-weight: 700; line-height: 1.25; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">\n"
                        +
                        "                    Hello, %s!\n" +
                        "                </h2>\n" +
                        "                <p style=\"color: #b4b6d4; font-size: 15.5px; line-height: 1.65; margin-bottom: 36px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">\n"
                        +
                        "                    You have requested to reset your password. Click the button below to set a new password for your account:\n"
                        +
                        "                </p>\n" +
                        "                <div style=\"margin: 40px 0;\">\n" +
                        "                    <a class=\"btn-hover\" href=\"%s\" style=\"background-color: #7c3aed; background-image: linear-gradient(135deg, #7c3aed 0%%, #db2777 100%%); color: #ffffff !important; text-decoration: none; padding: 16px 40px; border-radius: 14px; font-size: 16px; font-weight: 700; display: inline-block; box-shadow: 0 10px 20px -3px rgba(124, 58, 237, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; transition: all 0.3s ease;\">\n"
                        +
                        "                        Reset Password\n" +
                        "                    </a>\n" +
                        "                </div>\n" +
                        "                <p style=\"color: #6f729e; font-size: 13.5px; line-height: 1.6; margin-bottom: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">\n"
                        +
                        "                    If you did not request this, you can safely ignore this email.\n" +
                        "                </p>\n" +
                        "                <div style=\"margin-top: 40px; margin-bottom: 26px; border-top: 1px solid #232248;\"></div>\n"
                        +
                        "                <div style=\"font-size: 12px; color: #474973; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; letter-spacing: 0.5px;\">\n"
                        +
                        "                    &copy; 2026 NEXORA. Crafted with passion. All rights reserved.\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "</html>",
                recipientName, resetUrl);

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}
