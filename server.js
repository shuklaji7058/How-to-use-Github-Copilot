const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "20mb" })); // Increase limit for large images
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { email, image } = req.body;
  console.log("Send email works");

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail or another SMTP service
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password or app password
    },
  });

  // Email options
  // let mailOptions = {
  //   from: "your-email@gmail.com", // Replace with your email
  //   to: email,
  //   subject: "Your Chart Image",
  //   text: "Please find your chart image attached.",
  //   attachments: [
  //     {
  //       filename: "chart.png",
  //       content: image.split("base64,")[1],
  //       encoding: "base64",
  //     },
  //   ],
  // };

  // // Send email
  // try {
  //   await transporter.sendMail(mailOptions);
  //   res.status(200).send("Email sent successfully!");
  // } catch (error) {
  //   console.error("Error sending email:", error);
  //   res.status(500).send("Failed to send email.");
  // }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
