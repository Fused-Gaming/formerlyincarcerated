#!/bin/bash

# Email Service Configuration Setup Script
# This script helps configure SMTP settings for the contact form

echo "================================"
echo "Email Service Configuration"
echo "================================"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✓ Found existing .env.local file"
    read -p "Do you want to overwrite it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing configuration"
        exit 0
    fi
fi

echo ""
echo "Select SMTP Provider:"
echo "1. Gmail"
echo "2. SendGrid"
echo "3. Mailgun"
echo "4. AWS SES"
echo "5. Custom SMTP Server"
echo ""
read -p "Enter choice (1-5): " provider

case $provider in
    1)
        echo ""
        echo "Gmail Setup Instructions:"
        echo "1. Enable 2-Factor Authentication on your Google account"
        echo "2. Generate an App-Specific Password:"
        echo "   https://myaccount.google.com/apppasswords"
        echo "3. Copy the 16-character password below"
        echo ""
        SMTP_HOST="smtp.gmail.com"
        SMTP_PORT="587"
        SMTP_SECURE="false"
        read -p "Enter Gmail address: " SMTP_USER
        read -s -p "Enter App-Specific Password: " SMTP_PASSWORD
        echo ""
        ;;
    2)
        echo ""
        read -p "Enter SendGrid API Key: " SMTP_PASSWORD
        SMTP_HOST="smtp.sendgrid.net"
        SMTP_PORT="587"
        SMTP_USER="apikey"
        SMTP_SECURE="false"
        ;;
    3)
        echo ""
        read -p "Enter Mailgun SMTP Host (e.g., smtp.mailgun.org): " SMTP_HOST
        read -p "Enter Mailgun Username: " SMTP_USER
        read -s -p "Enter Mailgun Password: " SMTP_PASSWORD
        echo ""
        SMTP_PORT="587"
        SMTP_SECURE="false"
        ;;
    4)
        echo ""
        echo "AWS SES Setup:"
        read -p "Enter AWS Region (e.g., us-east-1): " AWS_REGION
        SMTP_HOST="email-smtp.$AWS_REGION.amazonaws.com"
        SMTP_PORT="587"
        SMTP_SECURE="false"
        read -p "Enter AWS SMTP Username: " SMTP_USER
        read -s -p "Enter AWS SMTP Password: " SMTP_PASSWORD
        echo ""
        ;;
    5)
        echo ""
        read -p "Enter SMTP Host: " SMTP_HOST
        read -p "Enter SMTP Port (default 587): " SMTP_PORT
        SMTP_PORT=${SMTP_PORT:-587}
        read -p "Enter SMTP Username: " SMTP_USER
        read -s -p "Enter SMTP Password: " SMTP_PASSWORD
        echo ""
        read -p "Use TLS/Secure (true/false, default false): " SMTP_SECURE
        SMTP_SECURE=${SMTP_SECURE:-false}
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
read -p "Enter sender email address (default: noreply@formerlyincarcerated.org): " SMTP_FROM_EMAIL
SMTP_FROM_EMAIL=${SMTP_FROM_EMAIL:-noreply@formerlyincarcerated.org}

echo ""
read -p "Enter admin email address (default: hello@formerlyincarcerated.org): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-hello@formerlyincarcerated.org}

# Create .env.local
cat > .env.local << EOF
# Email Service Configuration
# Generated: $(date)

SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_USER=$SMTP_USER
SMTP_PASSWORD=$SMTP_PASSWORD
SMTP_SECURE=$SMTP_SECURE
SMTP_FROM_EMAIL=$SMTP_FROM_EMAIL
ADMIN_EMAIL=$ADMIN_EMAIL
EOF

echo ""
echo "✓ Configuration saved to .env.local"
echo ""
echo "Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Submit a test message via contact form"
echo "3. Check your email for confirmation"
echo ""
echo "For production (Vercel):"
echo "1. Go to Vercel Project Settings > Environment Variables"
echo "2. Add the same variables for Production environment"
echo "3. Redeploy your project"
echo ""
echo "⚠️  Never commit .env.local - it's in .gitignore"
echo ""
