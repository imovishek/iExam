const nodemailer = require("nodemailer");
exports.sendMail = async (to, subject, body) => {
  // sending email is currently off
  // until we get a better solution
  return;
  // let testAccount = await nodemailer.createTestAccount();

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.GMAIL_ACCOUNT, // generated ethereal user
  //     pass: process.env.GMAIL_PASSWORD, // generated ethereal password
  //     //user: testAccount.user, // generated ethereal user
  //     //pass: testAccount.pass, // generated ethereal password
  //   },
  // });
  // console.log(
  //   process.env.GMAIL_ACCOUNT,
  //   process.env.GMAIL_PASSWORD,
  //   testAccount
  // );
  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: process.env.GMAIL_ACCOUNT, // sender address
  //   to, // list of receivers
  //   subject, // Subject line
  //   html: body, // html body
  // });

  // console.log("Message sent: %s", info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

exports.generateRegisterEmailBody = (name, password) => `
<div style="display: flex; justify-content: center; ">
  <div style="width: 480px; height: 400px; border: 1px solid #bbbbbb; border-radius: 10px; box-shadow: 1px 1px 5px #dddddd;">
    <div style="padding: 20px;">
      <h1 style="display: flex; justify-content: center;"> Congratulations! &#127881;      </h1>
      <p>Dear, ${name}</p>
      <p>You got registered in Online Examination System of SUST!</p>
      <p>Please login with your credentials</p>
      <div>
        <strong style="display: flex; justify-content: center;">Password:</strong>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <div style="width: fit-content; padding: 10px; background-color: antiquewhite;">
          ${password}
        </div>
      </div>
      <p>Regards,</p>
      <a href="${process.env.APP_URL || '"/"'}">Exam Management System</a>
      <p>Shahjalal University of Science and Technology</p>
    </div>
    
  </div>
</div>
`;

exports.generateForgotPassEmailBody = (name, password) => `
  <div style="display: flex; justify-content: center; ">
    <div style="width: 480px; height: 400px; border: 1px solid #bbbbbb; border-radius: 10px; box-shadow: 1px 1px 5px #dddddd;">
      <div style="padding: 20px;">
        <h1 style="display: flex; justify-content: center;"> Password Reset      </h1>
        <p>Dear, ${name}</p>
        <p>Your password has been successfully reset!</p>
        <p>Please login with your credentials</p>
        <div>
          <strong style="display: flex; justify-content: center;">Password:</strong>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 10px;">
          <div style="width: fit-content; padding: 10px; background-color: antiquewhite;">
            ${password}
          </div>
        </div>
        <p>Regards,</p>
        <a href="${process.env.APP_URL || '"/"'}">Exam Management System</a>
        <p>Shahjalal University of Science and Technology</p>
      </div>
      
    </div>
  </div>
`;

exports.generateResetPassEmailBody = (name, password) => `
  <div style="display: flex; justify-content: center; ">
    <div style="width: 480px; height: 400px; border: 1px solid #bbbbbb; border-radius: 10px; box-shadow: 1px 1px 5px #dddddd;">
      <div style="padding: 20px;">
        <h1 style="display: flex; justify-content: center;"> Password Reset      </h1>
        <p>Dear, ${name}</p>
        <p>Your password has been successfully reset by admin!</p>
        <p>Please login with your credentials</p>
        <div>
          <strong style="display: flex; justify-content: center;">Password:</strong>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 10px;">
          <div style="width: fit-content; padding: 10px; background-color: antiquewhite;">
            ${password}
          </div>
        </div>
        <p>Regards,</p>
        <a href="${process.env.APP_URL || '"/"'}">Exam Management System</a>
        <p>Shahjalal University of Science and Technology</p>
      </div>
      
    </div>
  </div>
`;
// this.emailHandler('ovishek.paul@gmail.com');
