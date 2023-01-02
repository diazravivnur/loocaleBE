const nodemailer = require("nodemailer");

// Public Function
exports.sendEmail = (email, otp) => {
  const dataEmail = {
    from: "loocale.id@gmail.com",
    to: email,
    subject: "Verifikasi OTP",
    html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600using Loocale App</a>
        </div>
        <p style="font-size:1.1em">Hi, ${email}</p>
        <p>Thank you for using Loocale App. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br using Loocale App</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p Loocale Indonesia</p>
          <p>Jl. H Sidin 1 No 23</p>
          <p>Duren Sawit, Jakarta Timur</p>
          <p>+62 811 1722 233</p>
        </div>
      </div>
    </div>`,
  };
  emailToUser(dataEmail);
};


exports.sendForgotPassToEmail = (email, linkReset) => {
  const dataEmail = {
    from: "loocale.id@gmail.com",
    to: email,
    subject: "Link Reset Password Loocale",
    html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600using Loocale App</a>
        </div>
        <p style="font-size:1.1em">Hi, ${email}</p>
        <p>Thank you for using Loocale App. Use the following Link Below to reset your password</p>
        <a href=${linkReset}>Click Here</a>
        <p style="font-size:0.9em;">Regards,<br using Loocale App</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p Loocale Indonesia</p>
          <p>Jl. H Sidin 1 No 23</p>
          <p>Duren Sawit, Jakarta Timur</p>
          <p>+62 811 1722 233</p>
        </div>
      </div>
    </div>`,
  };
  emailToUser(dataEmail);
};

// Local Function
const emailToUser = (dataEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "loocale.id@gmail.com",
      pass: "ibyohxpysxomqofc",
    },
  });
  transporter
    .sendMail(dataEmail)
    .then((info) => console.log(`Email Telah Terkirim ${dataEmail.to} : `))
    .catch((err) => console.log(`Terjadi kesalahan ${err}`));
};
