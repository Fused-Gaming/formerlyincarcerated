const templates = {
  contactConfirmation: (contactData) => ({
    subject: 'We Received Your Message - Bitcoin Land Bond',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #050505 0%, #111111 100%); padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: #F7931A; margin: 0; font-size: 28px;">Bitcoin Land Bond</h1>
          <p style="color: #E5E5E5; margin: 10px 0 0 0;">Criminal Asset Recovery Initiative</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">Hi ${contactData.name},</p>

          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to Bitcoin Land Bond. We've received your message and appreciate your interest in our mission to provide permanent deed-restricted housing for formerly incarcerated individuals.
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Our team will review your inquiry and get back to you within 2-3 business days. If your matter is urgent, please reach out directly at <strong>hello@formerlyincarcerated.org</strong>.
          </p>

          <div style="background: #F6F1E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold;">Message Summary:</p>
            <p style="margin: 0; color: #666;">${contactData.message}</p>
          </div>
        </div>

        <div style="border-top: 2px solid #F7931A; padding-top: 20px; margin-top: 30px;">
          <p style="font-size: 14px; color: #A3A3A3; margin: 0;">
            © 2026 Bitcoin Land Bond. All rights reserved.
          </p>
          <p style="font-size: 14px; color: #A3A3A3; margin: 10px 0 0 0;">
            <a href="https://formerlyincarcerated.org" style="color: #F7931A; text-decoration: none;">Visit our website</a> |
            <a href="https://formerlyincarcerated.org/contact" style="color: #F7931A; text-decoration: none;">Contact us</a>
          </p>
        </div>
      </div>
    `,
  }),

  adminNotification: (contactData) => ({
    subject: `New Contact Form Submission - ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2>New Contact Form Submission</h2>

        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
          ${contactData.organization ? `<p><strong>Organization:</strong> ${contactData.organization}</p>` : ''}
          ${contactData.type ? `<p><strong>Inquiry Type:</strong> ${contactData.type}</p>` : ''}
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <h3>Message:</h3>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #F7931A; border-radius: 4px;">
          <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">
            <strong>IP Address:</strong> ${contactData.ip || 'Not captured'}<br>
            <strong>User Agent:</strong> ${contactData.userAgent || 'Not captured'}
          </p>
        </div>
      </div>
    `,
  }),

  partnershipInquiry: (contactData) => ({
    subject: 'Partnership Inquiry - Bitcoin Land Bond',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #050505 0%, #111111 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h1 style="color: #F7931A; margin: 0;">Partnership Opportunity</h1>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for your partnership inquiry. We're excited to explore how we can work together to expand housing access for formerly incarcerated individuals.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          Our partnerships span multiple sectors including:
        </p>

        <ul style="font-size: 16px; line-height: 1.8;">
          <li>Financial Institutions & Impact Investors</li>
          <li>Non-Profit Organizations & Foundations</li>
          <li>Real Estate Partners</li>
          <li>Government & Policy Organizations</li>
          <li>Technology & Innovation Partners</li>
        </ul>

        <p style="font-size: 16px; line-height: 1.6;">
          Our team will contact you shortly to discuss potential collaboration opportunities.
        </p>

        <div style="background: #F6F1E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #525252;">
            Learn more about our <a href="https://formerlyincarcerated.org/partners" style="color: #F7931A; text-decoration: none;">partnership tiers and opportunities</a>.
          </p>
        </div>
      </div>
    `,
  }),

  investorInquiry: (contactData) => ({
    subject: 'Investor Inquiry - Bitcoin Land Bond',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #050505 0%, #111111 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h1 style="color: #F7931A; margin: 0;">Investment Opportunity</h1>
          <p style="color: #E5E5E5; margin: 10px 0 0 0;">Criminal Asset Recovery Initiative</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for your interest in investing in Bitcoin Land Bond. We're building a sustainable model for permanent deed-restricted housing powered by transparent, real-world asset bonds.
        </p>

        <h3 style="color: #050505; margin-top: 25px;">Investment Highlights:</h3>
        <ul style="font-size: 15px; line-height: 1.8;">
          <li>Real asset backing with property deed restrictions</li>
          <li>Social impact metrics tracked on blockchain</li>
          <li>Transparent governance and reporting</li>
          <li>Scalable model across multiple cities</li>
        </ul>

        <p style="font-size: 16px; line-height: 1.6;">
          We'll be in touch within 2-3 business days to schedule a detailed discussion about investment opportunities and expected returns.
        </p>

        <div style="background: #F6F1E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #525252;">
            Review our <a href="https://formerlyincarcerated.org/whitepaper" style="color: #F7931A; text-decoration: none;">white paper</a> for detailed information on our model and financial projections.
          </p>
        </div>
      </div>
    `,
  }),

  residentInquiry: (contactData) => ({
    subject: 'Housing Application - Bitcoin Land Bond',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #050505 0%, #111111 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h1 style="color: #F7931A; margin: 0;">Housing Application</h1>
          <p style="color: #E5E5E5; margin: 10px 0 0 0;">Support for Formerly Incarcerated Individuals</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for your interest in Bitcoin Land Bond housing. We're committed to supporting formerly incarcerated individuals in finding stable, dignified housing.
        </p>

        <div style="background: #FFF3E0; padding: 20px; border-radius: 8px; border-left: 4px solid #F7931A; margin: 20px 0;">
          <p style="margin: 0; color: #E65100;">
            <strong>Next Steps:</strong> Our housing coordinator will contact you shortly to discuss your application and available options in your area.
          </p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          In the meantime, you can reach out directly to our support team:
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          <strong>Email:</strong> <a href="mailto:housing@formerlyincarcerated.org" style="color: #F7931A;">housing@formerlyincarcerated.org</a><br>
          <strong>Phone:</strong> Available upon request
        </p>

        <div style="background: #F6F1E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #525252;">
            Learn about <a href="https://formerlyincarcerated.org/impact" style="color: #F7931A; text-decoration: none;">our impact and success stories</a>.
          </p>
        </div>
      </div>
    `,
  }),
};

export default templates;
