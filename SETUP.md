# Hacky Nation — Setup Guide

## Local Development

```bash
npm install
npm install -g netlify-cli
netlify dev
```

This runs the site at http://localhost:8888 with the serverless function active.

## Stripe Setup

1. Create a free account at https://stripe.com
2. Go to Developers → API Keys
3. Copy your **Secret key** (starts with `sk_test_...` for testing, `sk_live_...` for real payments)

## Netlify Deployment

1. Push this folder to a GitHub repository
2. Log in to https://netlify.com → Add new site → Import from GitHub
3. Build settings: leave blank (static site)
4. **Set environment variable:**
   - Go to Site settings → Environment variables
   - Add: `STRIPE_SECRET_KEY` = your Stripe secret key
5. Deploy

## Testing Payments

Use Stripe test card: `4242 4242 4242 4242` · Any future date · Any CVC

## Email Collection

Emails submitted via the newsletter form appear in:
**Netlify dashboard → Your site → Forms → newsletter**

You can export them as CSV or set up email notifications.
Free tier: 100 submissions/month.

## Going Live

1. Switch Stripe key from `sk_test_...` to `sk_live_...` in Netlify env vars
2. Your site already has HTTPS (Netlify provides it automatically)
3. All security headers are set via the `_headers` file — verify at https://securityheaders.com
