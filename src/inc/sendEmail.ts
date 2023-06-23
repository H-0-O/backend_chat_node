import { env } from "process";
import { UserInfo } from "../interfaces/userInterface";
import nodemailer from "nodemailer";
import axios from "axios";
async function sendEmailValidation(
  validationToken: String,
  userInfo: UserInfo
): Promise<object> {
  const port = parseInt(env.HTTP_PORT ?? "25");
  const transporter = nodemailer.createTransport({
    port, // Postfix uses port 25
    host: "localhost",
    tls: {
      rejectUnauthorized: false,
    },
  });
  const url = `${env.APP_BASE_URL}:${env.HTTP_PORT}/user/email_validation/${validationToken}`;
  const message = {
    from: "noreply@domain.com",
    to: userInfo.email,
    subject: "Confirm Email",
    text: "Please confirm your email",
    html: `<a href='${url}'>Please confirm your email</a>`,
  };

  const result = async () => {
    return await transporter.sendMail(message);
  };
  console.log(await result());
  return {
    status: true,
  };
}

export async function sendEmailValidationTemp(
  emailValidationToken: string,
  userInfo: UserInfo
): Promise<boolean> {
  const url = `${env.APP_BASE_URL}/user/email_validation/${emailValidationToken}`;
  const headers = [
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=iso-8859-1",
  ];
  const message = `
    <html>
    <head>
      <title>Birthday Reminders for August</title>
    </head>
    <body>
         <div>
            <h1>To Active Your Account Click Link Blow</h1>
            <a href='${url}' > Email Verification </a>
        </div>
    </body>
    </html>`;
  const res = await axios.post("https://my-tect-test.see5.net/test_email.php", {
    to: userInfo.email,
    subject: "email Validation",
    message,
    headers,
  });
  return res.data.status;
}
