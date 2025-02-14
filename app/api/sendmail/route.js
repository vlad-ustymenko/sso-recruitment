import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, phone } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Нова заявка від ${name} ${email}`,
      html: `
				<html>
					<body>
						<div style="font-family: Arial, sans-serif;">
							<h1 style="color: #4CAF50;">Нова заявка на вступ до ССО</h1>
							<p><strong>Кандидат</strong></p>
							<p><strong>Ім'я:</strong> ${name}</p>
							<p><strong>Email:</strong> ${email}</p>
							<p><strong>Телефон:</strong> ${phone}</p>
						</div>
					</body>
				</html>
			`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Лист надіслано!" });
  } catch (error) {
    console.error("Помилка надсилання:", error);
    return NextResponse.json(
      { message: "Не вдалося надіслати лист" },
      { status: 500 }
    );
  }
}
