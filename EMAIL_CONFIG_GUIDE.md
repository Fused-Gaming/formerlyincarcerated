# Email Service Configuration Guide

## Overview

The contact form uses nodemailer for email delivery. The system gracefully falls back to logging-only mode when SMTP is not configured.

## Configuration Methods

### 1. Local Development (.env.local)

Create a `.env.local` file in the project root with your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@formerlyincarcerated.org
ADMIN_EMAIL=hello@formerlyincarcerated.org
```

**For Gmail:**
1. Enable 2-Factor Authentication on your Google account
2. Generate an [App-Specific Password](https://myaccount.google.com/apppasswords)
3. Use the generated password as `SMTP_PASSWORD`

**For Other Providers:**
- Gmail: `smtp.gmail.com:587`
- SendGrid: `smtp.sendgrid.net:587` (use `apikey` as username)
- Mailgun: `smtp.mailgun.org:587`
- AWS SES: `email-smtp.[region].amazonaws.com:587`

### 2. Vercel Production Deployment

Set environment variables in Vercel Dashboard:

1. Go to your Vercel project settings
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

| Variable | Value | Required |
|----------|-------|----------|
| `SMTP_HOST` | Your SMTP server | Yes |
| `SMTP_USER` | Your SMTP username | Yes |
| `SMTP_PASSWORD` | Your SMTP password | Yes |
| `SMTP_PORT` | 587 (default) or 465 | No |
| `SMTP_SECURE` | true/false (default: false) | No |
| `SMTP_FROM_EMAIL` | noreply@formerlyincarcerated.org | No |
| `ADMIN_EMAIL` | hello@formerlyincarcerated.org | No |

4. Make sure variables are set for both **Production** and **Preview** environments

### 3. Development Environment Variables

For CI/CD testing without real SMTP:
- Leave `SMTP_HOST` and `SMTP_USER` unset
- System will log submissions instead of sending emails
- Response will be 202 (Accepted) with data logged

## Testing the Configuration

### Local Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "organization": "Test Org",
    "message": "This is a test message"
  }'
```

**With SMTP Configured:** Returns 200 with `submissionId`
**Without SMTP:** Returns 202 with data object

### Production Test

After deploying to Vercel with SMTP configured:
1. Visit the contact form on your deployed site
2. Submit a test message
3. Check your email inbox for:
   - Confirmation email to the submitter
   - Admin notification with inquiry type routing

## Email Templates

Five templates are available based on inquiry type detection:

1. **General Inquiry** - Default template
2. **Partnership** - For partnership keywords (partnership, collaborate)
3. **Investor** - For investment keywords (invest, investor)
4. **Resident** - For housing keywords (housing, resident)
5. **User Confirmation** - Sent to every submitter

## Troubleshooting

### Emails Not Sending

1. **Check environment variables are set:**
   ```bash
   echo $SMTP_HOST
   ```

2. **Verify SMTP credentials:**
   - Test credentials with: `npm run test` for email-service tests

3. **Check Vercel logs:**
   - Vercel Dashboard > Deployments > [Your Deployment] > Functions

4. **Check local logs:**
   ```bash
   npm run dev
   # Look for "✅ Contact submission processed" or "❌ Failed to send email"
   ```

### 202 Response (Emails Not Configured)

This is expected behavior. To enable real email delivery:
- Set `SMTP_HOST` and `SMTP_USER` environment variables
- Restart your application/deployment

### 500 Error

Check server logs for specific error. Common causes:
- Invalid SMTP credentials
- SMTP server rejecting connection
- Email address validation failing

## Security Best Practices

1. **Never commit credentials** - Use `.env.local` (in .gitignore)
2. **Use app-specific passwords** - Not your actual account password
3. **Enable 2FA** on email accounts with SMTP access
4. **Rotate passwords regularly** - Update in Vercel when changed
5. **Use SMTP_SECURE** - Set to true (port 465) when possible
6. **Restrict sender address** - Configure SMTP to verify email ownership

## Next Steps

1. Choose your SMTP provider
2. Generate/obtain SMTP credentials
3. Set environment variables locally (`.env.local`)
4. Test with: `npm run dev`
5. Deploy to Vercel
6. Set same environment variables in Vercel dashboard
7. Verify email delivery in production

## Support

For detailed Next.js environment variable docs:
- https://nextjs.org/docs/basic-features/environment-variables

For nodemailer configuration:
- https://nodemailer.com/smtp/
