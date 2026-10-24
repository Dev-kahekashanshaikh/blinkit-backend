import "dotenv/config";
import nodemailer from "nodemailer";


export let sendEmail = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body; 



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ==============================



// ==============================================

 const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: to,

      subject: subject,

      html: html,
      text :text
    
    }




const result = await transporter.sendMail(mailOptions);

    console.log("Email sent:", result.messageId);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: result.messageId,
    });


  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};