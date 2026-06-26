import { sendEmail } from '../../lib/email-service';
import templates from '../../lib/email-templates';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 1000);
};

const getInquiryType = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('partnership') || lowerMessage.includes('collaborate')) return 'partnership';
  if (lowerMessage.includes('invest') || lowerMessage.includes('investor')) return 'investor';
  if (lowerMessage.includes('housing') || lowerMessage.includes('resident')) return 'resident';
  return 'general';
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { name, email, organization, message } = req.body;

    // Validation - check existence
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message',
      });
    }

    // Sanitize inputs first
    const sanitizedData = {
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      organization: sanitizeInput(organization || ''),
      message: sanitizeInput(message),
      type: getInquiryType(message),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'] || '',
      timestamp: new Date().toISOString(),
    };

    // Validate email after sanitization
    if (!validateEmail(sanitizedData.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check SMTP configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.warn('⚠️ Email service not configured. Contact data logged but not sent.');
      console.log('Contact submission:', sanitizedData);

      return res.status(202).json({
        success: true,
        message: 'Contact form received. Email service is being configured.',
        data: sanitizedData,
      });
    }

    // Send confirmation email to user
    await sendEmail({
      to: sanitizedData.email,
      subject: templates.contactConfirmation(sanitizedData).subject,
      html: templates.contactConfirmation(sanitizedData).html,
    });

    // Send notification to admin with appropriate template based on inquiry type
    const templateKey = {
      partnership: 'partnershipInquiry',
      investor: 'investorInquiry',
      resident: 'residentInquiry',
    }[sanitizedData.type] || 'adminNotification';

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'hello@formerlyincarcerated.org',
      subject: templates[templateKey](sanitizedData).subject,
      html: templates[templateKey](sanitizedData).html,
    });

    // Log submission for analytics/CRM
    console.log('✅ Contact submission processed:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      type: sanitizedData.type,
      timestamp: sanitizedData.timestamp,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      submissionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);

    // Don't expose internal error details to client
    return res.status(500).json({
      error: 'An error occurred while processing your request. Please try again later.',
      timestamp: new Date().toISOString(),
    });
  }
}
