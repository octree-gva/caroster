export const getHTML = ({ htmlContent, htmlFooter, carosterLink }) => `
<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F5F5F5;color:#262626;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div
                style="padding:16px 24px 16px 24px;background-color:#FFEB3B;text-align:center"
              >
                <a
                  href="${carosterLink}"
                  style="text-decoration:none"
                  target="_blank"
                  ><img
                    alt="Caroster link"
                    src="https://app.caroster.io/uploads/Caroster_logo1_cddd3057fc.png?updated_at=2022-09-12T08:11:11.735Z"
                    height="32"
                    style="height:32px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                /></a>
              </div>
              <div style="font-weight:normal;padding:16px 24px 16px 24px">
                ${htmlContent}
              </div>
              <div style="background-color:#E5E5E5;padding:16px 8px 16px 8px">
                <div
                  style="font-size:14px;font-weight:normal;padding:16px 24px 16px 24px"
                >
                  ${htmlFooter}
                </div>
                <div style="padding:0px 0px 0px 12px">
                  <a
                    href="https://opencollective.com/caroster"
                    style="color:#171717;font-size:14px;font-weight:normal;background-color:#E5E5E5;border-radius:64px;display:inline-block;padding:8px 12px;text-decoration:none"
                    target="_blank"
                    ><span
                      ><!--[if mso
                        ]><i
                          style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18"
                          hidden
                          >&nbsp;</i
                        ><!
                      [endif]--></span
                    ><span>👉 Open collective</span
                    ><span
                      ><!--[if mso
                        ]><i
                          style="letter-spacing: 12px;mso-font-width:-100%"
                          hidden
                          >&nbsp;</i
                        ><!
                      [endif]--></span
                    ></a
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;
