========================================================================
CLARITY INFOTECH - CONFIGURATION & DATABASE GUIDE
========================================================================

The files in this folder are copies of your live configuration and database files, placed here for quick access and backup.

1. ENV FILE:
   * File: .env.local
   * Live Location: c:\scrach\clarityinfotech-main\.env.local
   * Purpose: Stores SMTP email credentials used to relay contact page forms via Nodemailer.

2. ADMIN CREDENTIALS DATABASE:
   * File: auth_settings.json
   * Live Location: c:\scrach\clarityinfotech-main\src\app\api\admin\auth_settings.json
   * Purpose: Stores the encrypted username and password used to authenticate console actions and panel logins.

3. WEB CONTENT DATABASE:
   * File: content_db.json
   * Live Location: c:\scrach\clarityinfotech-main\src\app\api\content_db.json
   * Purpose: Stores all site content (Header, Footer, Projects, Services, FAQ entries, SEO metadata tags, and incoming Contact Inbox inquiries) synchronized from your live edits in the Admin Console.

NOTE:
To edit live configurations, please modify the files at their "Live Location" paths. The running Next.js application reads from those specific paths.
========================================================================
