import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Privacy.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Perfect Swing</title>
        <meta
          name="description"
          content="Perfect Swing Privacy Policy - Learn how we collect, use, and protect your personal information."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Privacy Policy - Perfect Swing" />
        <meta
          property="og:description"
          content="Perfect Swing Privacy Policy - Learn how we collect, use, and protect your personal information."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://perfectswing.vercel.app/privacy" />
      </Head>

      <div className={`${styles.container} ${inter.className}`}>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <a href="/" className={styles.logo}>
              Perfect Swing
            </a>
            <nav className={styles.nav}>
              <a href="/" className={styles.navLink}>
                Home
              </a>
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last updated: January 2025</p>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Introduction</h2>
              <p>
                Perfect Swing ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our AI tennis coaching service.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
              
              <h3 className={styles.subsectionTitle}>2.1 Personal Information</h3>
              <ul>
                <li><strong>Email Address:</strong> When you join our waitlist, we collect your email address to notify you about our service launch.</li>
                <li><strong>Account Information:</strong> If you create an account, we may collect your name and other profile information.</li>
              </ul>

              <h3 className={styles.subsectionTitle}>2.2 Tennis Swing Videos</h3>
              <ul>
                <li><strong>Uploaded Videos:</strong> When you use our service, you may upload tennis swing videos for AI analysis.</li>
                <li><strong>Analysis Results:</strong> Our AI generates analysis reports based on your uploaded videos.</li>
              </ul>

              <h3 className={styles.subsectionTitle}>2.3 Usage Information</h3>
              <ul>
                <li><strong>Service Usage:</strong> We collect information about how you use our service, including features accessed and time spent.</li>
                <li><strong>Device Information:</strong> We may collect device type, operating system, and browser information.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>Provide and maintain our AI tennis coaching service</li>
                <li>Analyze your tennis swing videos using AI technology</li>
                <li>Generate personalized improvement recommendations</li>
                <li>Send you notifications about service updates and launches</li>
                <li>Improve our service and develop new features</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Ensure the security and integrity of our service</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Data Security and Privacy</h2>
              
              <h3 className={styles.subsectionTitle}>4.1 Video Privacy</h3>
              <p>
                <strong>100% Private:</strong> Your uploaded tennis swing videos and analysis results are only visible to you. 
                We never share your personal videos with anyone else.
              </p>

              <h3 className={styles.subsectionTitle}>4.2 Data Protection</h3>
              <ul>
                <li>All data is encrypted in transit and at rest</li>
                <li>Access to your data is strictly limited to authorized personnel</li>
                <li>We implement industry-standard security measures</li>
                <li>Regular security audits and updates are performed</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Data Sharing and Disclosure</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
              <ul>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in operating our service (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Data Retention</h2>
              <ul>
                <li><strong>Account Data:</strong> Retained as long as your account is active</li>
                <li><strong>Videos:</strong> Stored until you delete them or close your account</li>
                <li><strong>Analysis Results:</strong> Kept for your reference until you choose to delete them</li>
                <li><strong>Waitlist Information:</strong> Retained until you unsubscribe or our service launches</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Your Rights</h2>
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Cookies and Tracking</h2>
              <p>
                We use essential cookies to provide our service functionality. We do not use 
                tracking cookies for advertising purposes. You can control cookie settings 
                through your browser preferences.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If you are a 
                parent or guardian and believe your child has provided us with personal 
                information, please contact us.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than 
                your own. We ensure appropriate safeguards are in place to protect your 
                information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of 
                any material changes by posting the new policy on this page and updating the 
                "Last updated" date.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className={styles.contactInfo}>
                <p><strong>Email:</strong> privacy@perfectswing.com</p>
                <p><strong>Address:</strong> [Your Company Address]</p>
              </div>
            </section>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <p className={styles.footerText}>
              © 2025 Perfect Swing. All rights reserved.
            </p>
            <div className={styles.footerLinks}>
              <a href="/privacy" className={styles.footerLink}>
                Privacy Policy
              </a>
              <a href="/terms" className={styles.footerLink}>
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
