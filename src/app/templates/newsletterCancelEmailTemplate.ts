export const cancellationEmailTemplate = (year: number) => {
  return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cancel Newsletter Subscription</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f7f7f7; /* Light grey background */
            }
            table {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff; /* White background */
              border-radius: 8px;
              overflow: hidden;
              border-collapse: collapse;
            }
            td {
              padding: 20px;
              text-align: center;
            }
            .header {
              background-color: #184e77; /* FitZone brand color */
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .logo {
              font-size: 24px;
              color: #ffffff;
              font-weight: bold;
              margin: 0;
              display: inline-block;
              vertical-align: middle;
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
              line-height: 1.5;
              margin-bottom: 20px;
            }
            .footer {
              font-size: 12px;
              color: #666666;
              background-color: #f1f1f1; /* Light grey footer */
              padding: 10px;
              text-align: center;
            }
            @media only screen and (max-width: 600px) {
              .content {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <td class="header">
                <img
                  src="https://i.ibb.co/GTpydvR/fitzone-logo.png"
                  alt="FitZone Logo"
                  class="logo-image"
                />
                <span class="logo">FitZone</span>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Your subscription has been canceled</h1>
                <p class="content">
                  We're sorry to see you go. Your subscription to FitZone's newsletter has been canceled.
                </p>
              </td>
            </tr>
            <tr>
              <td class="footer">
                <p>FitZone ${year}</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
};
