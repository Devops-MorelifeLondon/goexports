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

function getPackageBadgeHtml(rawPackage?: string): string {
  const pkg = (rawPackage || "Free").toLowerCase();
  if (pkg.includes("enterprise")) {
    return `<span style="display: inline-block; background-color: #f3e8ff; color: #6b21a8; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 9999px; border: 1px solid #d8b4fe;">⚡ Enterprise Tier (£999/mo)</span>`;
  }
  if (pkg.includes("growth") || pkg.includes("premium") || pkg.includes("pro")) {
    return `<span style="display: inline-block; background-color: #fef3c7; color: #92400e; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 9999px; border: 1px solid #fcd34d;">⭐ Verified Growth Pro (£499/mo)</span>`;
  }
  if (pkg.includes("starter")) {
    return `<span style="display: inline-block; background-color: #dbeafe; color: #1e40af; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 9999px; border: 1px solid #93c5fd;">Starter Tier (£249/mo)</span>`;
  }
  return `<span style="display: inline-block; background-color: #f1f5f9; color: #334155; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 9999px; border: 1px solid #cbd5e1;">Free Tier (£0/mo)</span>`;
}

/**
 * Master HTML Container for Goexports Transactional Emails
 */
export function getEmailHtmlTemplate(contentHtml: string): string {
  const currentYear = new Date().getFullYear();
  const senderEmail = process.env.SENDER_EMAIL || "info@goexports.co.uk";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Goexports</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Branded Luxury Header -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 32px 36px 28px; text-align: center; border-bottom: 3px solid #e8b94a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <span style="font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; display: inline-block;">
                      Go<span style="color: #e8b94a;">exports</span>
                    </span>
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #a1a1aa; margin-top: 6px;">
                      Global B2B Exporter Network & Marketplace
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content Area -->
          <tr>
            <td style="padding: 36px 36px 32px; background-color: #ffffff;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px 36px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #64748b;">
                &copy; ${currentYear} Goexports Ltd &bull; Connecting Exporters Worldwide
              </p>
              <p style="margin: 0; color: #94a3b8;">
                Need assistance? Reach our desk at <a href="mailto:${senderEmail}" style="color: #64748b; font-weight: 600; text-decoration: underline;">${senderEmail}</a>
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
  const packageBadge = getPackageBadgeHtml(data.selectedPackage);

  const content = `
    <!-- Status Hero Pill -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-flex; align-items: center; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.75px; padding: 6px 16px; border-radius: 9999px; border: 1px solid #a7f3d0;">
        ✓ Account Created & Storefront Live
      </div>
    </div>

    <!-- Header Greeting -->
    <h1 style="margin: 0 0 12px 0; color: #09090b; font-size: 22px; font-weight: 800; text-align: center; line-height: 1.35; letter-spacing: -0.3px;">
      Welcome to Goexports, ${data.fullName}!
    </h1>
    
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #475569; text-align: center;">
      Your exporter account and dedicated digital storefront for <strong style="color: #09090b;">${data.companyName}</strong> have been created successfully on our global B2B trade network.
    </p>

    <!-- Live Storefront Highlight Card -->
    <div style="background: linear-gradient(180deg, #fffdf8 0%, #faf5e8 100%); border: 1px solid #fde68a; border-radius: 14px; padding: 22px 20px; text-align: center; margin-bottom: 28px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #92400e; margin-bottom: 6px;">
        Your Public Storefront Address:
      </div>
      <div style="font-family: monospace, SFMono-Regular, Consolas; font-size: 14px; font-weight: 700; color: #0a0a0a; word-break: break-all; margin-bottom: 16px; background-color: #ffffff; padding: 8px 12px; border-radius: 8px; border: 1px solid #f0ece1; display: inline-block;">
        ${profileUrl}
      </div>
      <div>
        <a href="${profileUrl}" target="_blank" style="background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 13px 30px; font-size: 14px; font-weight: 700; border-radius: 10px; display: inline-block; box-shadow: 0 4px 14px rgba(10,10,10,0.18);">
          View Your Public Storefront ↗
        </a>
      </div>
    </div>

    <!-- Summary Table -->
    <div style="border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 28px;">
      <div style="background-color: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #334155;">
        📋 Export Profile Registration Details
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #334155;">
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 42%;">Reference ID:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 700; font-family: monospace; color: #09090b;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Selected Package:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9;">${packageBadge}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Company Name:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #09090b;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Primary Category:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #09090b;">${data.productCategory}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Origin Country:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #09090b;">${data.country} (${data.postCode})</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; color: #64748b; font-weight: 600;">Account Email:</td>
          <td style="padding: 11px 18px; font-weight: 600; color: #0284c7;">${data.email}</td>
        </tr>
      </table>
    </div>

    <!-- Next Steps Roadmap -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 22px; margin-bottom: 28px;">
      <h3 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #09090b; margin: 0 0 12px 0;">
        🚀 Next Steps for Your Business
      </h3>
      <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #475569; line-height: 1.75;">
        <li style="margin-bottom: 6px;">Your profile is indexed for international procurement teams searching for <strong>${data.productCategory}</strong>.</li>
        <li style="margin-bottom: 6px;">Direct buyer inquiries & RFQs will be delivered to <strong style="color: #09090b;">${data.email}</strong>.</li>
        <li>Access your exporter dashboard anytime to update capacity, products, and trade leads.</li>
      </ul>
    </div>

    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${loginUrl}" target="_blank" style="display: inline-block; padding: 13px 30px; background-color: #e8b94a; color: #0a0a0a; text-decoration: none; font-size: 14px; font-weight: 800; border-radius: 10px;">
        Sign In to Exporter Dashboard &rarr;
      </a>
    </div>

    <!-- Trust Guarantee Badges -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border: 1px solid #f4f4f5; border-radius: 12px; padding: 14px; text-align: center;">
      <tr>
        <td width="33%" style="font-size: 11px; font-weight: 700; color: #334155; padding: 4px;">
          🛡️ Verified Profile
        </td>
        <td width="33%" style="font-size: 11px; font-weight: 700; color: #334155; padding: 4px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
          🌐 0% Commission
        </td>
        <td width="33%" style="font-size: 11px; font-weight: 700; color: #334155; padding: 4px;">
          ⚡ Direct Trade Inquiries
        </td>
      </tr>
    </table>
  `;

  return getEmailHtmlTemplate(content);
}

export function getExporterUnderReviewEmailTemplate(data: ExporterSubmissionEmailData): string {
  const content = `
    <!-- Status Hero Pill -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-flex; align-items: center; background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.75px; padding: 6px 16px; border-radius: 9999px; border: 1px solid #fde68a;">
        ⏳ Application Under Verification
      </div>
    </div>

    <h1 style="margin: 0 0 12px 0; color: #09090b; font-size: 22px; font-weight: 800; text-align: center; line-height: 1.35;">
      Application Received, ${data.fullName}!
    </h1>
    
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #475569; text-align: center;">
      Your exporter profile registration for <strong style="color: #09090b;">${data.companyName}</strong> has been submitted and is currently being verified by our compliance team.
    </p>

    <div style="background-color: #fffdf8; border: 1px solid #fde68a; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #92400e; margin-bottom: 6px;">
        Verification Timeline:
      </div>
      <p style="margin: 0; font-size: 13.5px; color: #78350f; line-height: 1.6;">
        Our team reviews company details, product categories, and certifications. Reviews typically conclude within <strong>2–4 business hours</strong>. You will receive an immediate confirmation email once your profile is live.
      </p>
    </div>

    <div style="border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #334155;">
        📋 Submitted Profile Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #334155;">
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 42%;">Reference ID:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 700; font-family: monospace; color: #09090b;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Company Name:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #09090b;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Category:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #09090b;">${data.productCategory}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; color: #64748b; font-weight: 600;">Country & Origin:</td>
          <td style="padding: 11px 18px; color: #09090b;">${data.country} (${data.postCode})</td>
        </tr>
      </table>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getExporterApprovedEmailTemplate(data: ExporterSubmissionEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL || "https://www.goexports.co.uk";
  const profileUrl = `${baseUrl}/${data.slug || data.id}`;
  const loginUrl = `${baseUrl}/exporter/login`;
  const packageBadge = getPackageBadgeHtml(data.selectedPackage);

  const content = `
    <!-- Status Hero Pill -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-flex; align-items: center; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.75px; padding: 6px 16px; border-radius: 9999px; border: 1px solid #a7f3d0;">
        ✓ Verified & Approved
      </div>
    </div>

    <h1 style="margin: 0 0 12px 0; color: #09090b; font-size: 22px; font-weight: 800; text-align: center; line-height: 1.35;">
      Congratulations, ${data.companyName} is Live!
    </h1>
    
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #475569; text-align: center;">
      Your exporter profile has passed quality verification and is now published live on the global marketplace.
    </p>

    <!-- Storefront Card -->
    <div style="background: linear-gradient(180deg, #fffdf8 0%, #faf5e8 100%); border: 1px solid #fde68a; border-radius: 14px; padding: 22px 20px; text-align: center; margin-bottom: 28px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #92400e; margin-bottom: 6px;">
        Active Public Storefront Link:
      </div>
      <div style="font-family: monospace, SFMono-Regular, Consolas; font-size: 14px; font-weight: 700; color: #0a0a0a; word-break: break-all; margin-bottom: 16px; background-color: #ffffff; padding: 8px 12px; border-radius: 8px; border: 1px solid #f0ece1; display: inline-block;">
        ${profileUrl}
      </div>
      <div>
        <a href="${profileUrl}" target="_blank" style="background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 13px 30px; font-size: 14px; font-weight: 700; border-radius: 10px; display: inline-block;">
          Open Storefront ↗
        </a>
      </div>
    </div>

    <div style="border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #334155;">
        <tr>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 42%;">Reference ID:</td>
          <td style="padding: 11px 18px; border-bottom: 1px solid #f1f5f9; font-weight: 700; font-family: monospace; color: #09090b;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 11px 18px; color: #64748b; font-weight: 600;">Selected Package:</td>
          <td style="padding: 11px 18px;">${packageBadge}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center;">
      <a href="${loginUrl}" target="_blank" style="display: inline-block; padding: 13px 30px; background-color: #e8b94a; color: #0a0a0a; text-decoration: none; font-size: 14px; font-weight: 800; border-radius: 10px;">
        Sign In to Portal &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getExporterRejectedEmailTemplate(data: ExporterSubmissionEmailData, reason?: string): string {
  const content = `
    <!-- Status Hero Pill -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-flex; align-items: center; background-color: #fff1f2; color: #be123c; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.75px; padding: 6px 16px; border-radius: 9999px; border: 1px solid #fecdd3;">
        Application Status Notice
      </div>
    </div>

    <h1 style="margin: 0 0 12px 0; color: #09090b; font-size: 20px; font-weight: 800; line-height: 1.4;">
      Update regarding your Goexports Application
    </h1>
    
    <p style="margin: 0 0 18px 0; font-size: 14.5px; line-height: 1.65; color: #475569;">
      Regarding the application for <strong style="color: #09090b;">${data.companyName}</strong> (Ref: <code style="font-family: monospace; font-weight: 700;">${data.id}</code>):
    </p>

    <div style="background-color: #fff5f5; border: 1px solid #fecaca; border-left: 4px solid #ef4444; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #991b1b; margin-bottom: 6px;">
        Review Feedback:
      </div>
      <div style="font-size: 13.5px; color: #7f1d1d; line-height: 1.6; font-weight: 500;">
        ${reason || "Your export profile could not be approved at this time. Please verify that your business information, contact details, and certifications meet our onboarding criteria."}
      </div>
    </div>

    <div style="text-align: center;">
      <a href="https://www.goexports.co.uk/create-export-profile" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13.5px; font-weight: 700; border-radius: 8px;">
        Submit Updated Application &rarr;
      </a>
    </div>
  `;

  return getEmailHtmlTemplate(content);
}

export function getAdminNewExporterAlertTemplate(data: ExporterSubmissionEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL || "https://www.goexports.co.uk";
  const profileUrl = `${baseUrl}/${data.slug || data.id}`;
  const packageBadge = getPackageBadgeHtml(data.selectedPackage);

  const content = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; background-color: #e8b94a; color: #0a0a0a; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px;">
        New Exporter Registration Alert
      </div>
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #0a0a0a;">
        ${data.companyName} registered as an Exporter
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b; line-height: 1.5;">
        A new exporter profile has been registered on Goexports and recorded in MongoDB.
      </p>
    </div>

    <!-- Table -->
    <div style="border: 1px solid #e4e4e7; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0a0a0a;">
        Exporter Details & Specifications
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 38%; font-weight: 600;">Profile Reference:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 700; font-family: monospace; color: #0a0a0a;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Selected Package:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5;">${packageBadge}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Company Name:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 700; color: #0a0a0a;">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Contact Person:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Country & Postcode:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.country} (${data.postCode})</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Category:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        ${data.website ? `
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Website:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="${data.website}" target="_blank" style="color: #0284c7; text-decoration: none;">${data.website}</a></td>
        </tr>` : ''}
        ${data.targetMarkets && data.targetMarkets.length > 0 ? `
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Target Markets:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.targetMarkets.join(', ')}</td>
        </tr>` : ''}
        ${data.certifications && data.certifications.length > 0 ? `
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Certifications:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.certifications.join(', ')}</td>
        </tr>` : ''}
      </table>
    </div>

    <div style="text-align: center;">
      <a href="${profileUrl}" target="_blank" style="display: inline-block; padding: 13px 30px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 13.5px; font-weight: 700; border-radius: 10px;">
        Review Exporter Storefront &rarr;
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
      <h1 style="margin: 0 0 6px; font-size: 20px; font-weight: 800; color: #0a0a0a;">
        Thank You, ${data.fullName}!
      </h1>
      <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.5;">
        We have received your trade consultation request for <strong>${data.company || "your business"}</strong>.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
      <div style="background-color: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 800; color: #0a0a0a; text-transform: uppercase;">
        Inquiry Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 40%; font-weight: 600;">Product Category:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 700; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Company:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.company || "N/A"}</td>
        </tr>
        ${data.country ? `
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Target Country:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.country}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 18px; color: #71717a; font-weight: 600;">Phone:</td>
          <td style="padding: 10px 18px; color: #0a0a0a;">${data.phone}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13.5px; color: #52525b; line-height: 1.6; margin: 0 0 24px; text-align: center;">
      Our international trade specialists will connect with you within <strong>1 business day</strong> with verified buyer matches and export guidance.
    </p>

    <div style="text-align: center;">
      <a href="https://www.goexports.co.uk/create-export-profile" target="_blank" style="display: inline-block; padding: 13px 30px; background-color: #e8b94a; color: #0a0a0a; text-decoration: none; font-size: 14px; font-weight: 800; border-radius: 10px;">
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
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #0a0a0a;">
        ${data.fullName} submitted an Export Consultation Request
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #52525b;">
        New trade consultation lead received from Goexports landing page.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 38%; font-weight: 600;">Contact Name:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 700; color: #0a0a0a;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Phone Number:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Company:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.company || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Product Category:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 600; color: #0a0a0a;">${data.productCategory}</td>
        </tr>
        ${data.country ? `
        <tr>
          <td style="padding: 10px 18px; color: #71717a; font-weight: 600;">Destination Country:</td>
          <td style="padding: 10px 18px; color: #0a0a0a;">${data.country}</td>
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
        ⚡ New Buyer RFQ / Trade Inquiry
      </div>
      <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #0a0a0a;">
        New Inquiry for ${data.sellerCompanyName}
      </h1>
      <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.5;">
        A global buyer has submitted a direct procurement inquiry through your Goexports storefront.
      </p>
    </div>

    <div style="border: 1px solid #e4e4e7; border-radius: 14px; overflow: hidden; margin-bottom: 20px;">
      <div style="background-color: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e4e4e7; font-size: 12px; font-weight: 800; color: #0a0a0a; text-transform: uppercase;">
        Buyer Contact & Order Specifications
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #3f3f46;">
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; width: 38%; font-weight: 600;">Buyer Name:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; font-weight: 700; color: #0a0a0a;">${data.buyerName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Buyer Email:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;"><a href="mailto:${data.buyerEmail}" style="color: #0284c7; font-weight: 600; text-decoration: none;">${data.buyerEmail}</a></td>
        </tr>
        ${data.buyerPhone ? `
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Phone / WhatsApp:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.buyerPhone}</td>
        </tr>` : ''}
        ${data.buyerCountry ? `
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Buyer Location:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.buyerCountry}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #71717a; font-weight: 600;">Inquiry Type:</td>
          <td style="padding: 10px 18px; border-bottom: 1px solid #f4f4f5; color: #0a0a0a;">${data.inquiryType || "Bulk Order / RFQ"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 18px; color: #71717a; font-weight: 600;">Estimated Quantity:</td>
          <td style="padding: 10px 18px; font-weight: 700; color: #0a0a0a;">${data.quantity || "Not specified"}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
        Inquiry Message:
      </div>
      <p style="margin: 0; font-size: 13.5px; color: #18181b; line-height: 1.6; white-space: pre-line;">
        ${data.message}
      </p>
    </div>

    <div style="text-align: center;">
      <a href="mailto:${data.buyerEmail}?subject=Re: Trade Inquiry for ${encodeURIComponent(data.sellerCompanyName)}" style="display: inline-block; padding: 13px 30px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; border-radius: 10px;">
        Reply to Buyer (${data.buyerEmail}) &rarr;
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
      <h1 style="margin: 0 0 6px; font-size: 20px; font-weight: 800; color: #0a0a0a;">
        Inquiry Sent to ${data.sellerCompanyName}
      </h1>
      <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.5;">
        Your RFQ has been successfully delivered to the export sales team at <strong>${data.sellerCompanyName}</strong>.
      </p>
    </div>

    <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
        Your Requirement Copy:
      </div>
      <p style="margin: 0; font-size: 13.5px; color: #3f3f46; line-height: 1.6; white-space: pre-line;">
        ${data.message}
      </p>
    </div>

    <p style="font-size: 13px; color: #52525b; line-height: 1.6; margin: 0; text-align: center;">
      ${data.sellerCompanyName} typically responds within 24–48 hours with quotations and export terms.
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