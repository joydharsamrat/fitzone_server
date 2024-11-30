export const resetPassEmailTemplate = (url: string, year: number) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Notification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #F7F7F7; /* Neutral 100 */
    }
    table {
      max-width: 600px;
      margin: 20px auto;
      background-color: #FFFFFF; /* Background 100 */
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
    }
    td {
      padding: 20px;
      text-align: center;
    }
    .header {
      background-color: #184e77; /* Primary 700 */
      color: #FFFFFF;
      padding: 20px;
    }
    .logo {
      font-size: 24px;
      margin: 0;
      display: inline-block;
      vertical-align: middle;
      color: #FFFFFF;
    }
    .logo-image {
      height: 40px;
      width: 40px;
      vertical-align: middle;
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="header">
        <img
          src="https://i.ibb.co.com/GTpydvR/fitzone-logo.png" 
          alt="Logo"
          class="logo-image"
        />
        <span class="logo">AutoShine</span>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Hello,</p>
        <p>We received a request to <b>Reset Password</b> of your account. Please click the button below to proceed.</p>
        <a href="${url}" class="button">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,<br>The AutoShine Team</p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        © ${year} AutoShine. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;
