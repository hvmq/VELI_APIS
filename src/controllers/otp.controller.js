import dotenv from "dotenv";
import Otp from "../models/otp.js";
import rateLimit from "express-rate-limit";

import { TransporterService } from "../services/transporter.js";
dotenv.config();

// Create a limiter that allows 5 requests per minute per IP

export const OtpController = {
    sendOtpByEmail:
        async (req, res) => {
            try {
                const email = req.body.email;
                await Otp.findOneAndDelete({ email: email });
                const otp = Math.floor(Math.random() * 90000) + 10000;
                const data = new Otp({ otp: otp, email: email });
                const mailOptions = {
                    from: "VELI <hvmq1333@gmail.com>",
                    to: email,
                    subject: "VELI - Xác minh địa chỉ email",
                    html: `
          <!DOCTYPE html>
                <html>
                <head>
             <style>
         body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
            padding: 30px;
         }
        .container {
            background-color: #fff;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            max-width: 600px;
        }
        h1 {
            color: #0056b3;
        }
        .otp {
            font-size: 24px;
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #ddd;
            display: inline-block;
            color: #0056b3;
            background-color: #f9f9f9;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Xác minh địa chỉ email của bạn</h1>
        <p>Chào mừng bạn đến với VELI!</p>
        <p>Mã OTP của bạn là:</p>
        <div class="otp">${otp}</div>
        <p>Vui lòng nhập mã này vào trang xác minh để hoàn tất quá trình đăng ký.</p>
        <div class="footer">
            Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
        </div>
    </div>
</body>
</html>

          `,
                };
                TransporterService.transporter.sendMail(
                    mailOptions,
                    async (error, info) => {
                        if (error) {
                            return res.status(400).json({
                                success: false,
                                message: error.message,
                            });
                        } else {
                            await data.save();
                            return res.status(200).json({
                                success: true,
                                message: "OTP sent",
                            });
                        }
                    }
                );
            } catch (e) {
                return res.status(500).json({
                    success: false,
                    message: error,
                });
            }
        },

    verifyOtp: async (req, res) => {
        try {
            const { email, phoneNumber, otp } = req.body;
            if (phoneNumber) {
                //Do not change var to const
                var otpDocument = await Otp.findOne({ phoneNumber: phoneNumber });
            } else if (email) {
                var otpDocument = await Otp.findOne({ email: email });
            }
            if (otpDocument.otp == otp) {
                await Otp.deleteOne(otpDocument);
                return res.status(200).json({
                    success: true,
                    message: "OTP verified",
                });
            }
            return res.status(500).json({
                success: false,
                message: "OTP not match",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "wtf",
            });
        }
    },
};
