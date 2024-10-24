import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  auth: {
    // type: "login",
    user: "trainupmern@gmail.com",
    pass: "lwgj nhtb byru cwft",
  },
});

export const send2FACode = async (email, code) => {
  const mailOptions = {
    from: "trainupmern@gmail.com",
    to: email,
    subject: "Tu código de verificación",
    text: `Tu código de verificación es ${code}`,
  };
  console.log(email, " ", code, " ");

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};
