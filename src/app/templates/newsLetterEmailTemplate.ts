export const newsletterEmailTemplate = (
  year: number,
  unsubscribeUrl: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription</title>
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
    .content {
      font-size: 16px;
      color: #333333;
    }
    .footer {
      font-size: 12px;
      color: #666666;
      background-color: #F1F1F1;
      padding: 10px;
    }
    .unsubscribe {
      font-size: 14px;
      color: #666666;
      margin-top: 10px;
    }
    .unsubscribe a {
      color: #184e77;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="header">
        <img
          src="https://i.ibb.co/GTpydvR/fitzone-logo.png" 
          alt="Logo"
          class="logo-image"
        />
        <span class="logo">FitZone</span>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Hi there,</p>
        <p>Thank you for subscribing to the <b>FitZone Newsletter</b>! We're excited to have you on board.</p>
        <p>You'll receive the latest updates, tips, and exclusive offers straight to your inbox.</p>
        <p>If you have any questions, feel free to reply to this email or visit our website.</p>
        <p>Thank you for joining us on this journey to fitness and health!</p>
        <p>Stay active,<br>The FitZone Team</p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p>© ${year} FitZone. All rights reserved.</p>
        <p class="unsubscribe">To unsubscribe, <a href="${unsubscribeUrl}">click here</a>.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
