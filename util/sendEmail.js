const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const sendEmail = async (option) => {
  const { protocol, email } = option;

  const oauth2Client = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URL,
  });

  try {
    const { tokens } = await oauth2Client.refreshToken(
      process.env.REFRESFH_TOKEN
    );
    const AccessToken = tokens.access_token;
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESF_TOKEN,
        accessToken: AccessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const resetURL = `${protocol}://localhost:3000/resetPassword/${AccessToken}`;
    const mailOptions = {
      from: "qscasd7073@gmail.com",
      to: email,
      subject: "密碼重置",
      text: `如果沒有忘記密碼，請無視這封信件`,
      html: `<a href=${resetURL}>點擊這裡重設密碼</a></br>
            <h2>請在10分鐘內重設密碼</h2>`,
    };
    await transport.sendMail(mailOptions);

    return AccessToken;
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendEmail;
