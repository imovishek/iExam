const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = async (to, subject, body) => {
  const msg = {
    from: process.env.SENGRID_SENDER_EMAIL, // Change to your recipient
    to,
    subject,
    text: body,
  };
  sgMail
    .send(msg)
    .then(() => console.log("sent"))
    .catch((err) => console.log({ err, body: err.response.body.errors }));
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
