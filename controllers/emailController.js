import "dotenv/config";
import nodemailer from "nodemailer";



export let sendEmail = async (req, res) => {


  try {
      const {
  user,
  orderItems,
  itemsTotal,
  finalDeliveryCharge,
  handlingCharge,
  donationAmount,
  grandTotal,
} = req.body;


 
const to = process.env.ADMIN_EMAIL; // Replace with the recipient's email address

const subject = "New E-commerce Order";

const text = `
New Order Received

Customer: ${user.name}
Email: ${user.email}

Order Items:
${orderItems.map(item =>
  `${item.productName} x ${item.quantity} - ₹${item.totalPrice}`
).join("\n")}

Items Total: ₹${itemsTotal}
Delivery Charge: ₹${finalDeliveryCharge}
Handling Charge: ₹${handlingCharge}
Donation: ₹${donationAmount}

Grand Total: ₹${grandTotal}
`;

const html = `
<h2>New Order Received</h2>

<h3>Customer Details</h3>
<p>Name: ${user.name}</p>
<p>Email: ${user.email}</p>

<h3>Order Items</h3>
<table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th>Product</th>
    <th>Quantity</th>
    <th>Total</th>
  </tr>

  ${orderItems.map(item => `
    <tr>
      <td>${item.productName}</td>
      <td>${item.quantity}</td>
      <td>₹${item.totalPrice}</td>
    </tr>
  `).join("")}
</table>

<h3>Bill Details</h3>
<p>Items Total: ₹${itemsTotal}</p>
<p>Delivery Charge: ₹${finalDeliveryCharge}</p>
<p>Handling Charge: ₹${handlingCharge}</p>
<p>Donation: ₹${donationAmount}</p>

<h2>Grand Total: ₹${grandTotal}</h2>
`;




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