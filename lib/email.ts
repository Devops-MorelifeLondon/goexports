export interface EmailData {
  to_email: { email: string; name?: string } | { email: string; name?: string }[];
  cc_email?: { email: string; name?: string }[];
  email_subject: string;
  htmlContent: string;
  send_at?: string;
  reply_to?: { email: string; name?: string };
}

export interface ExporterSubmissionEmailData {
  id: string;
  slug: string;
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  country: string;
  productCategory: string;
  website?: string;
  postCode: string;
  companyProfile: string;
  targetMarkets?: string[];
  yearEstablished?: string;
  exportCapacity?: string;
  certifications?: string[];
  createdAt?: string;
  status?: string;
  selectedPackage?: string;
}

export interface ConsultationLeadEmailData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  country?: string;
  productCategory: string;
}

export interface SellerInquiryEmailData {
  sellerId: string;
  sellerCompanyName: string;
  sellerEmail: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  buyerCountry?: string;
  inquiryType?: string;
  quantity?: string;
  message: string;
}

/**
 * Base Master HTML Template for Goexports
 */
export function getEmailHtmlTemplate(contentHtml: string): string {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Goexports</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);border:1px solid #e4e4e7;">
          <!-- Header with Goexports Branding -->
          <tr>
            <td style="background-color:#0a0a0a;padding:28px 40px;text-align:center;">
              <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Go<span style="color: #e8b94a;">exports</span>
              </span>
              <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; margin-top: 4px;">
                Global B2B Trade & Exporter Network
              </div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 32px;background-color:#ffffff;">
              ${contentHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa;padding:24px 40px;text-align:center;border-top:1px solid #f4f4f5;">
              <p style="margin:0 0 8px;font-size:12px;color:#71717a;line-height:1.5;">
                Connecting Verified Exporters with Global Importers & Procurement Teams Worldwide.
              </p>
              <p style="margin:0;font-size:11px;color:#a1a1aa;line-height:1.5;">
                &copy; ${currentYear} Goexports &bull; <a href="https://www.goexports.co.uk" style="color:#e8b94a;text-decoration:none;font-weight:600;">goexports.co.uk</a> &bull; 0% Commission on Deals
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// 1. EXPORTER PROFILE EMAILS
// ─────────────────────────────────────────────────────────────

export function getExporterWelcomeEmailTemplate(data: ExporterSubmissionEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL || "https://www.goexports.co.uk";
  const profileUrl = `${baseUrl}/${data.slug || data.id}`;
  const loginUrl = `${baseUrl}/exporter/login`;

  const content = `
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #f0fdf4; border: 2px solid #86efac; color: #16a34a; font-size: 28px; margin-bottom: 16px;">
        &#10003;
      </div>
      <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #0a0a0a; line-height: 1.3;">
        Welcome to Goexports, ${data.fullName}!
      </h1>
      <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.5;">
        Your verified exporter profile for <strong style="color: #0a0a0a;">${data.companyName}</strong> is now live on our global network.
      </p>
    </div>

    <!-- Storefront Link Box -->
    <div style="background-color: #fffaf0; border: 1px solid #fde68a; border-radius: 12px; padding: 18px; margin-bottom: 28px; text-align: center;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #92400e; margin-bottom: 6px;">
        Your Live Public Exporter Storefront:
      </div>
      <div style="font-family: monospace; font-size: 14px; font-weight: 600; color: #0a0a0a; word-break: break-all; margin-bottom: 12px;">
        ${profileUrl}
      </div>
      <a href="${profileUrl}" target="_blank" style="display: inline-block; padding: 10px 24px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 8px; margin-top: 4px;">
        View Your Public Storefront &rarr;
      </a>
    </div>

    <!-- Details Table -->
    <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; margin-bottom: 28px;">
      <div style="background-color: #fafafa; padding: 12px 16px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 0.5px;">
        Registered Export Profile Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 40%;">Reference ID:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; font-family: monospace; color: #0a0a0a;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Company Name:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Product Category:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Origin Location:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.country} (${data.postCode})</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Registered Email:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; color: #71717a;">Phone / WhatsApp:</td>
          <td style="padding: 10px 16px; color: #0a0a0a;">${data.phone}</td>
        </tr>
      </table>
    </div>

    <!-- What Happens Next -->
    <div style="background-color: #fafafa; border-radius: 12px; padding: 18px; margin-bottom: 28px; border: 1px solid #f4f4f5;">
      <h3 style="margin: 0 0 10px; font-size: 13px; font-weight: 700; color: #0a0a0a;">
        What Happens Next?
      </h3>
      <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: #52525b; line-height: 1.6;">
        <li style="margin-bottom: 6px;">Your profile is indexed for international procurement teams searching for <strong>${data.productCategory}</strong>.</li>
        <li style="margin-bottom: 6px;">Direct buyer inquiries & RFQs matching your products will be sent directly to your registered email & phone.</li>
        <li>You can sign in to your exporter account anytime at <a href="${loginUrl}" style="color: #0a0a0a; font-weight: 600;">${loginUrl}</a>.</li>
      </ul>
    </div>

    <div style="text-align: center;">
      <a href="${loginUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #e8b94a; color: #0a0a0a; text-decoration: none; font-size: 14px; font-weight: 700; border-radius: 8px;">
        Sign In to Exporter Portal &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getExporterUnderReviewEmailTemplate(data: ExporterSubmissionEmailData): string {
  const content = `
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #fef3c7; border: 2px solid #fde68a; color: #b45309; font-size: 24px; margin-bottom: 16px;">
        &#9203;
      </div>
      <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #0a0a0a; line-height: 1.3;">
        Application Received, ${data.fullName}!
      </h1>
      <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.5;">
        Your exporter registration for <strong style="color: #0a0a0a;">${data.companyName}</strong> has been received and is currently <span style="color: #b45309; font-weight: 700;">Under Verification</span>.
      </p>
    </div>

    <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #92400e; margin-bottom: 6px;">
        Verification & Approval Status:
      </div>
      <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.6;">
        Our trade compliance team is reviewing your business details and certifications. Once approved, your public storefront will go live on Goexports, and you will receive an instant approval notification with your active link.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #fafafa; padding: 12px 16px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase;">
        Submitted Application Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 40%;">Reference ID:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; font-family: monospace; color: #0a0a0a;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Company Name:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Category:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; color: #71717a;">Country & Origin:</td>
          <td style="padding: 10px 16px; color: #0a0a0a;">${data.country} (${data.postCode})</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; color: #71717a; text-align: center; margin: 0;">
      Reviews typically complete within <strong>2–4 business hours</strong>. Thank you for choosing Goexports.
    </p>
  `;

  return getEmailHtmlTemplate(content);
}

export function getExporterApprovedEmailTemplate(data: ExporterSubmissionEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL || "https://www.goexports.co.uk";
  const profileUrl = `${baseUrl}/${data.slug || data.id}`;
  const loginUrl = `${baseUrl}/exporter/login`;

  const content = `
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 50%; background-color: #f0fdf4; border: 2px solid #86efac; color: #16a34a; font-size: 28px; margin-bottom: 16px;">
        &#10003;
      </div>
      <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #0a0a0a; line-height: 1.3;">
        Congratulations, ${data.companyName} is Live!
      </h1>
      <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.5;">
        Your exporter profile has been <strong style="color: #16a34a;">Approved & Verified</strong> by our administrative team.
      </p>
    </div>

    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-bottom: 28px; text-align: center;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #15803d; margin-bottom: 6px;">
        Your Active Live Storefront URL:
      </div>
      <div style="font-family: monospace; font-size: 14px; font-weight: 600; color: #0a0a0a; word-break: break-all; margin-bottom: 12px;">
        ${profileUrl}
      </div>
      <a href="${profileUrl}" target="_blank" style="display: inline-block; padding: 10px 24px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 8px;">
        Open Your Live Storefront &rarr;
      </a>
    </div>

    <div style="text-align: center;">
      <a href="${loginUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #e8b94a; color: #0a0a0a; text-decoration: none; font-size: 14px; font-weight: 700; border-radius: 8px;">
        Sign In to Exporter Portal &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getExporterRejectedEmailTemplate(data: ExporterSubmissionEmailData, reason?: string): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #0a0a0a;">
        Update on Your Goexports Profile
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b;">
        Regarding your export profile submission for <strong style="color: #0a0a0a;">${data.companyName}</strong> (Ref: ${data.id}).
      </p>
    </div>

    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 13px; color: #991b1b; line-height: 1.6;">
        ${reason || "Your export profile could not be approved at this time. Please verify that your business information, contact details, and certifications are up to date."}
      </p>
    </div>

    <div style="text-align: center;">
      <a href="https://www.goexports.co.uk/create-export-profile" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 8px;">
        Submit Updated Profile &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getAdminNewExporterAlertTemplate(data: ExporterSubmissionEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL || "https://www.goexports.co.uk";
  const profileUrl = `${baseUrl}/${data.slug || data.id}`;

  const content = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; background-color: #e8b94a; color: #0a0a0a; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px;">
        New Exporter Registration Alert
      </div>
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #0a0a0a;">
        ${data.companyName} registered as an Exporter
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b; line-height: 1.5;">
        A new exporter profile has been registered on Goexports and published to the public directory.
      </p>
    </div>

    <!-- Table -->
    <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #fafafa; padding: 12px 16px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase;">
        Exporter Details & Specifications
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 38%;">Profile Reference:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; font-family: monospace; color: #0a0a0a;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Company Name:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 700; color: #0a0a0a;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Contact Person:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Email Address:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Phone / WhatsApp:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Country & ZIP:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.country} (${data.postCode})</td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Selected Package:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 700; color: #b45309;">${data.selectedPackage || "Verified Growth Pro"}</td>
        </tr>
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Category:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        ${data.website ? `
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Website:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="${data.website}" target="_blank" style="color: #0284c7; text-decoration: none;">${data.website}</a></td>
        </tr>` : ''}
        ${data.yearEstablished ? `
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Year Established:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.yearEstablished}</td>
        </tr>` : ''}
        ${data.exportCapacity ? `
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Monthly Capacity:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.exportCapacity}</td>
        </tr>` : ''}
        ${data.targetMarkets && data.targetMarkets.length > 0 ? `
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Target Markets:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.targetMarkets.join(', ')}</td>
        </tr>` : ''}
        ${data.certifications && data.certifications.length > 0 ? `
        <tr>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Certifications:</td>
          <td style="padding: 9px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.certifications.join(', ')}</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- Bio -->
    <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
        Company Bio:
      </div>
      <p style="margin: 0; font-size: 13px; color: #3f3f46; line-height: 1.5; white-space: pre-line;">
        ${data.companyProfile}
      </p>
    </div>

    <div style="text-align: center;">
      <a href="${profileUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13.5px; font-weight: 600; border-radius: 8px;">
        Review Live Exporter Storefront &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export async function sendExporterWelcomeEmail(data: ExporterSubmissionEmailData) {
  try {
    const html = getExporterWelcomeEmailTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.email,
        name: data.fullName || data.companyName,
      },
      email_subject: `Welcome to Goexports! Your Export Profile for ${data.companyName} is Live`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Exporter welcome email failed for ${data.email}:`, error.message);
  }
}

export async function sendExporterUnderReviewEmail(data: ExporterSubmissionEmailData) {
  try {
    const html = getExporterUnderReviewEmailTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.email,
        name: data.fullName || data.companyName,
      },
      email_subject: `Application Received: ${data.companyName} Export Profile Under Review`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Exporter review email failed for ${data.email}:`, error.message);
  }
}

export async function sendExporterApprovedEmail(data: ExporterSubmissionEmailData) {
  try {
    const html = getExporterApprovedEmailTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.email,
        name: data.fullName || data.companyName,
      },
      email_subject: `🎉 Congratulations! Your Export Profile for ${data.companyName} is Approved & Live`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Exporter approved email failed for ${data.email}:`, error.message);
  }
}

export async function sendExporterRejectedEmail(data: ExporterSubmissionEmailData, reason?: string) {
  try {
    const html = getExporterRejectedEmailTemplate(data, reason);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.email,
        name: data.fullName || data.companyName,
      },
      email_subject: `Update regarding your Goexports Profile for ${data.companyName}`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Exporter rejected email failed for ${data.email}:`, error.message);
  }
}

export async function sendAdminNewExporterNotification(data: ExporterSubmissionEmailData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "info@goexports.co.uk";
    const html = getAdminNewExporterAlertTemplate(data);

    return await sendBrevoEmailApi({
      to_email: {
        email: adminEmail,
        name: "Goexports Admin",
      },
      email_subject: `[New Exporter Registration] ${data.companyName} (${data.country})`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Admin exporter alert email failed:`, error.message);
  }
}

// ─────────────────────────────────────────────────────────────
// 2. CONSULTATION / GENERAL INQUIRY EMAILS (app/api/jotform)
// ─────────────────────────────────────────────────────────────

export function getConsultationLeadConfirmationTemplate(data: ConsultationLeadEmailData): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; background-color: #f0fdf4; border: 2px solid #86efac; color: #16a34a; font-size: 24px; margin-bottom: 12px;">
        &#10003;
      </div>
      <h1 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #0a0a0a;">
        Thank You, ${data.fullName}!
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b; line-height: 1.5;">
        We have received your trade consultation request for <strong>${data.company || "your business"}</strong>.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #fafafa; padding: 12px 16px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase;">
        Inquiry Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 40%;">Product Category:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Company:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.company || "N/A"}</td>
        </tr>
        ${data.country ? `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Target Country:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.country}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 16px; color: #71717a;">Phone:</td>
          <td style="padding: 10px 16px; color: #0a0a0a;">${data.phone}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; color: #52525b; line-height: 1.6; margin: 0 0 20px;">
      Our international trade specialists are reviewing your requirements and will connect with you within <strong>1 business day</strong> with verified buyer matches and export trade guidance.
    </p>

    <div style="text-align: center;">
      <a href="https://www.goexports.co.uk/create-export-profile" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #e8b94a; color: #0a0a0a; text-decoration: none; font-size: 13.5px; font-weight: 700; border-radius: 8px;">
        Register as a Verified Exporter &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getAdminConsultationAlertTemplate(data: ConsultationLeadEmailData): string {
  const content = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; background-color: #38bdf8; color: #082f49; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px;">
        New Trade Consultation Request
      </div>
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #0a0a0a;">
        ${data.fullName} submitted an Export Consultation Request
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b;">
        New trade consultation lead received from Goexports landing page.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 38%;">Contact Name:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Email Address:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="mailto:${data.email}" style="color: #0284c7;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Phone Number:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Company:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.company || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Product Category:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        ${data.country ? `
        <tr>
          <td style="padding: 10px 16px; color: #71717a;">Destination Country:</td>
          <td style="padding: 10px 16px; color: #0a0a0a;">${data.country}</td>
        </tr>` : ''}
      </table>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export async function sendConsultationLeadConfirmationEmail(data: ConsultationLeadEmailData) {
  if (!data.email) return;
  try {
    const html = getConsultationLeadConfirmationTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.email,
        name: data.fullName,
      },
      email_subject: `We have received your Trade Consultation Request - Goexports`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Lead confirmation email failed for ${data.email}:`, error.message);
  }
}

export async function sendAdminConsultationAlertEmail(data: ConsultationLeadEmailData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "info@goexports.co.uk";
    const html = getAdminConsultationAlertTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: adminEmail,
        name: "Goexports Leads",
      },
      email_subject: `[Lead Alert] New Trade Consultation: ${data.fullName} (${data.productCategory})`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Admin lead alert email failed:`, error.message);
  }
}

// ─────────────────────────────────────────────────────────────
// 3. DIRECT BUYER RFQ / STOREFRONT INQUIRY EMAILS (app/api/seller-inquiry)
// ─────────────────────────────────────────────────────────────

export function getSellerInquiryAlertTemplate(data: SellerInquiryEmailData): string {
  const content = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; background-color: #e8b94a; color: #0a0a0a; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px;">
        New Buyer RFQ / Direct Trade Inquiry
      </div>
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #0a0a0a;">
        New Inquiry for ${data.sellerCompanyName}
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b; line-height: 1.5;">
        A global buyer has submitted a direct procurement inquiry through your Goexports storefront.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
      <div style="background-color: #fafafa; padding: 12px 16px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase;">
        Buyer Contact & Order Specifications
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 38%;">Buyer Name:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.buyerName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Buyer Email:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="mailto:${data.buyerEmail}" style="color: #0284c7; font-weight: 600; text-decoration: none;">${data.buyerEmail}</a></td>
        </tr>
        ${data.buyerPhone ? `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Phone / WhatsApp:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.buyerPhone}</td>
        </tr>` : ''}
        ${data.buyerCountry ? `
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Buyer Location:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.buyerCountry}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #71717a;">Inquiry Type:</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.inquiryType || "Bulk Order / RFQ"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; color: #71717a;">Estimated Quantity:</td>
          <td style="padding: 10px 16px; font-weight: 600; color: #0a0a0a;">${data.quantity || "Not specified"}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
        Inquiry Message:
      </div>
      <p style="margin: 0; font-size: 13px; color: #18181b; line-height: 1.6; white-space: pre-line;">
        ${data.message}
      </p>
    </div>

    <div style="text-align: center;">
      <a href="mailto:${data.buyerEmail}?subject=Re: Trade Inquiry for ${encodeURIComponent(data.sellerCompanyName)}" style="display: inline-block; padding: 12px 28px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13.5px; font-weight: 600; border-radius: 8px;">
        Reply to Buyer Directly (${data.buyerEmail}) &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getBuyerInquiryConfirmationTemplate(data: SellerInquiryEmailData): string {
  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; background-color: #f0fdf4; border: 2px solid #86efac; color: #16a34a; font-size: 24px; margin-bottom: 12px;">
        &#10003;
      </div>
      <h1 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #0a0a0a;">
        Inquiry Sent to ${data.sellerCompanyName}
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b; line-height: 1.5;">
        Your RFQ has been successfully delivered to the export sales team at <strong>${data.sellerCompanyName}</strong>.
      </p>
    </div>

    <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
        Your Requirement Copy:
      </div>
      <p style="margin: 0; font-size: 13px; color: #3f3f46; line-height: 1.5; white-space: pre-line;">
        ${data.message}
      </p>
    </div>

    <p style="font-size: 13px; color: #52525b; line-height: 1.6; margin: 0 0 20px; text-align: center;">
      ${data.sellerCompanyName} typically responds within 24–48 hours with quotations and trade terms.
    </p>
  `;

  return getEmailHtmlTemplate(content);
}

export async function sendSellerInquiryAlertToExporter(data: SellerInquiryEmailData) {
  if (!data.sellerEmail) return;
  try {
    const html = getSellerInquiryAlertTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.sellerEmail,
        name: data.sellerCompanyName,
      },
      email_subject: `[New Buyer RFQ] Direct Inquiry from ${data.buyerName} - Goexports`,
      htmlContent: html,
      reply_to: {
        email: data.buyerEmail,
        name: data.buyerName,
      },
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Exporter RFQ alert failed for ${data.sellerEmail}:`, error.message);
  }
}

export async function sendBuyerInquiryConfirmation(data: SellerInquiryEmailData) {
  if (!data.buyerEmail) return;
  try {
    const html = getBuyerInquiryConfirmationTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: data.buyerEmail,
        name: data.buyerName,
      },
      email_subject: `Inquiry Confirmation: Sent to ${data.sellerCompanyName} - Goexports`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Buyer RFQ confirmation failed for ${data.buyerEmail}:`, error.message);
  }
}

export async function sendAdminSellerInquiryNotification(data: SellerInquiryEmailData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "info@goexports.co.uk";
    const html = getSellerInquiryAlertTemplate(data);
    return await sendBrevoEmailApi({
      to_email: {
        email: adminEmail,
        name: "Goexports Trade Desk",
      },
      email_subject: `[RFQ Copy] Buyer ${data.buyerName} -> Exporter ${data.sellerCompanyName}`,
      htmlContent: html,
    });
  } catch (error: any) {
    console.error(`[EmailNotice] Admin RFQ copy email failed:`, error.message);
  }
}

// ─────────────────────────────────────────────────────────────
// 4. BREVO SMTP DISPATCHER
// ─────────────────────────────────────────────────────────────

export async function sendBrevoEmailApi(data: EmailData) {
  const primaryRecipient = Array.isArray(data.to_email)
    ? data.to_email[0]?.email
    : data.to_email.email;

  console.log(`[EmailLog] sending | To: ${primaryRecipient} | Subject: "${data.email_subject}"`);

  try {
    const message: any = {
      sender: {
        name: process.env.SENDER_NAME || 'Goexports',
        email: process.env.SENDER_EMAIL || 'info@goexports.co.uk',
      },
      to: Array.isArray(data.to_email) ? data.to_email : [data.to_email],
      subject: data.email_subject,
      htmlContent: data.htmlContent,
    };

    if (data.reply_to) {
      message.replyTo = data.reply_to;
    } else {
      message.replyTo = {
        email: process.env.SENDER_EMAIL || 'info@goexports.co.uk',
        name: process.env.SENDER_NAME || 'Goexports',
      };
    }

    if (data.cc_email && data.cc_email.length > 0 && data.cc_email[0].email) {
      message.cc = data.cc_email;
    }

    if (data.send_at) {
      message.sendAt = data.send_at;
    }

    const apiKey = process.env.BREVO_API_KEY || '';
    if (!apiKey) {
      console.warn('[EmailNotice] BREVO_API_KEY is not set. Email dispatch simulated.');
      return { messageId: "SIMULATED_NO_API_KEY" };
    }

    const headers = {
      accept: 'application/json',
      'api-key': apiKey,
      'Content-Type': 'application/json',
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers,
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Brevo API Error Response:', errorText);
      throw new Error(`Brevo API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`[EmailLog] sent | To: ${primaryRecipient} | Subject: "${data.email_subject}" | MessageId: ${result.messageId || "N/A"}`);
    return result;
  } catch (error: any) {
    console.error(`[EmailLog] failed | To: ${primaryRecipient} | Subject: "${data.email_subject}" | Error: ${error.message}`);
    throw error;
  }
}