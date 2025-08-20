import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [topEmail, setTopEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");
  const [topIsSubmitting, setTopIsSubmitting] = useState(false);
  const [bottomIsSubmitting, setBottomIsSubmitting] = useState(false);
  const [topMessage, setTopMessage] = useState({ text: "", type: "" });
  const [bottomMessage, setBottomMessage] = useState({ text: "", type: "" });
  const [statsCount, setStatsCount] = useState(500);
  const [showTopShareButton, setShowTopShareButton] = useState(false);
  const [showBottomShareButton, setShowBottomShareButton] = useState(false);
  const [topShareCopied, setTopShareCopied] = useState(false);
  const [bottomShareCopied, setBottomShareCopied] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Button enable states
  const topIsButtonEnabled = validateEmail(topEmail);
  const bottomIsButtonEnabled = validateEmail(bottomEmail);

  // Show top message
  const showTopMessage = (text, type) => {
    setTopMessage({ text, type });
    setTimeout(() => {
      setTopMessage({ text: "", type: "" });
    }, 5000);
  };

  // Show bottom message
  const showBottomMessage = (text, type) => {
    setBottomMessage({ text, type });
    setTimeout(() => {
      setBottomMessage({ text: "", type: "" });
    }, 5000);
  };

  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      return false;
    }
  };

  // Top share link copy
  const handleTopShare = async () => {
    const shareUrl = window.location.origin;
    const success = await copyToClipboard(shareUrl);

    if (success) {
      setTopShareCopied(true);
      setTimeout(() => setTopShareCopied(false), 2000);
    }
  };

  // Bottom share link copy
  const handleBottomShare = async () => {
    const shareUrl = window.location.origin;
    const success = await copyToClipboard(shareUrl);

    if (success) {
      setBottomShareCopied(true);
      setTimeout(() => setBottomShareCopied(false), 2000);
    }
  };

  // Top form submission
  const handleTopSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(topEmail)) {
      showTopMessage("Please enter a valid email address.", "error");
      return;
    }

    setTopIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/collect-email-en`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email: topEmail,
            submitted_at: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showTopMessage(
          "You're on the waitlist! We'll notify you as soon as PerfectSwing launches.",
          "success"
        );
        setShowTopShareButton(true);
        setStatsCount((prev) => prev + 1);
      } else {
        showTopMessage(data.message || "An error occurred.", "error");
      }
    } catch (error) {
      console.error("Top submit error:", error);
      showTopMessage("A network error occurred. Please try again.", "error");
    } finally {
      setTopIsSubmitting(false);
    }
  };

  // Bottom form submission
  const handleBottomSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(bottomEmail)) {
      showBottomMessage("Please enter a valid email address.", "error");
      return;
    }

    setBottomIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/collect-email-en`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email: bottomEmail,
            submitted_at: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showBottomMessage(
          "You're on the waitlist! We'll notify you as soon as PerfectSwing launches.",
          "success"
        );
        setShowBottomShareButton(true);
        setStatsCount((prev) => prev + 1);
      } else {
        showBottomMessage(data.message || "An error occurred.", "error");
      }
    } catch (error) {
      console.error("Bottom submit error:", error);
      showBottomMessage("A network error occurred. Please try again.", "error");
    } finally {
      setBottomIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Perfect Swing - AI Tennis Coach</title>
        <meta
          name="description"
          content="Upload your swing video and our AI will analyze it against professional players. Discover the hidden differences for yourself."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph meta tags for social sharing */}
        <meta property="og:title" content="Perfect Swing - AI Tennis Coach" />
        <meta
          property="og:description"
          content="Watching tennis videos over and over but still confused? Spot your improvement points at a glance"
        />
        <meta
          property="og:image"
          content="https://perfect-swing.vercel.app/og-image-en.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Perfect Swing" />
        <meta property="og:url" content="https://perfect-swing.vercel.app" />
        <meta property="og:type" content="website" />

        {/* KakaoTalk specific meta tags */}
        <meta name="kakao:title" content="Perfect Swing - AI Tennis Coach" />
        <meta
          name="kakao:description"
          content="Watching tennis videos over and over but still confused? Spot your improvement points at a glance"
        />
        <meta
          name="kakao:image"
          content="https://perfect-swing.vercel.app/og-image-en.jpg"
        />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Perfect Swing - AI Tennis Coach" />
        <meta
          name="twitter:description"
          content="Watching tennis videos over and over but still confused? Spot your improvement points at a glance"
        />
        <meta
          name="twitter:image"
          content="https://perfect-swing.vercel.app/og-image-en.jpg"
        />
      </Head>

      <div className={`${styles.container} ${inter.className}`}>
        <div className={styles.mainSection}>
          <div className={styles.content}>
            <div className={styles.leftSection}>
              <div className={styles.mainContent}>
                <h1 className={styles.title}>
                  Watching tennis videos
                  <br />
                  but still confused?
                  <br />
                  <span className={styles.highlight}>
                    Spot your improvement points at a glance
                  </span>
                </h1>

                <p className={styles.description}>
                  Upload your swing video and our AI will analyze it against
                  professional players.
                  <br />
                  Discover the hidden differences for yourself.
                </p>

                <div className={styles.waitlistSection}>
                  <h3 className={styles.waitlistTitle}>Join the waitlist</h3>
                  <div className={styles.launchBadge}>
                    🎾 Launch Second Half of 2025
                  </div>

                  <form className={styles.emailForm} onSubmit={handleTopSubmit}>
                    <input
                      type="email"
                      className={styles.emailInput}
                      placeholder="Your email address"
                      value={topEmail}
                      onChange={(e) => setTopEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={!topIsButtonEnabled || topIsSubmitting}
                      style={{
                        opacity:
                          topIsButtonEnabled && !topIsSubmitting ? "1" : "0.6",
                        cursor:
                          topIsButtonEnabled && !topIsSubmitting
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      {topIsSubmitting ? "Submitting..." : "Get Early Access"}
                    </button>
                  </form>

                  {topMessage.text && (
                    <div
                      className={`${styles.message} ${
                        styles[
                          `message${
                            topMessage.type.charAt(0).toUpperCase() +
                            topMessage.type.slice(1)
                          }`
                        ]
                      }`}
                      style={{ textAlign: "center", marginBottom: "16px" }}
                    >
                      {topMessage.text}
                    </div>
                  )}

                  {showTopShareButton && (
                    <div
                      className={styles.shareContainer}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleTopShare}
                        className={styles.shareButton}
                        style={{
                          backgroundColor: topShareCopied
                            ? "#4CAF50"
                            : "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "12px 24px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        {topShareCopied ? (
                          <>
                            <span>✅</span>
                            Link copied!
                          </>
                        ) : (
                          <>
                            <span>🔗</span>
                            Share with others
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.demoContainer}>
                <div className={styles.phoneMockup}>
                  <div className={styles.phoneScreen}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "25px",
                      }}
                    >
                      <source src="/demo-en.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className={styles.benefitsContainer}>
            <div className={styles.benefitsHeader}>
              <h2 className={styles.benefitsTitle}>
                Perfect Swing
                <br />
                Your Personal AI Tennis Coach
              </h2>
              <p className={styles.benefitsSubtitle}>
                Get professional-level swing analysis right from your smartphone
              </p>
            </div>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <img
                    src="/swing.png"
                    alt="Swing icon"
                    style={{
                      width: "60%",
                      height: "60%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <h3 className={styles.benefitTitle}>
                  See Your Swing Differences at a Glance
                </h3>
                <p className={styles.benefitDescription}>
                  AI visually compares your swing trajectory with the pros.
                  <br />
                  See exactly where you need to improve.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <img
                    src="/single-person.png"
                    alt="Person icon"
                    style={{
                      width: "60%",
                      height: "60%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <h3 className={styles.benefitTitle}>
                  Perfect Analysis Even When Practicing Alone
                </h3>
                <p className={styles.benefitDescription}>
                  Busy schedule or can't find a hitting partner?
                  <br />
                  No problem - we analyze your solo practice videos just as
                  well.
                  <br />
                  Practice anytime, anywhere.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <img
                    src="/shield.png"
                    alt="Shield icon"
                    style={{
                      width: "60%",
                      height: "60%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <h3 className={styles.benefitTitle}>100% Privacy Protection</h3>
                <p className={styles.benefitDescription}>
                  Your uploaded videos and analysis results are only visible to
                  you.
                  <br />
                  We never share your personal information with anyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className={styles.reviewsSection}>
          <div className={styles.reviewsContainer}>
            <h2 className={styles.reviewsTitle}>
              Real Reviews from Early Users
            </h2>

            <div className={styles.reviewsGrid}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>SM</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>Sarah Mitchell</h4>
                      <p className={styles.reviewerLevel}>NTRP 3.5</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "This app works great. Has really helped improve my swing by
                  having the ability to quickly view the video analysis. Highly
                  recommend."
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>MD</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>Michael Davis</h4>
                      <p className={styles.reviewerLevel}>NTRP 3.0</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "It is a very useful app for tennis players. I always take
                  videos of myself and compare them with videos of professional
                  players to find and correct my mistakes. It's a waste of time
                  to practice without this app."
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>LW</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>Lisa Wilson</h4>
                      <p className={styles.reviewerLevel}>NTRP 2.5</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "This app makes it very easy to compare tennis swings. I can
                  see how this will help improve my swing very quickly."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Email Collection Section */}
        <section className={styles.bottomEmailSection}>
          <div className={styles.bottomEmailContainer}>
            <h2 className={styles.bottomEmailTitle}>
              Ready to see what's holding back your swing?
            </h2>
            <p className={styles.bottomEmailSubtitle}>
              Get compared with the pros and discover your key improvement areas
            </p>
            <form
              className={styles.bottomEmailForm}
              onSubmit={handleBottomSubmit}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={bottomEmail}
                onChange={(e) => setBottomEmail(e.target.value)}
                className={styles.bottomEmailInput}
                required
              />
              <button
                type="submit"
                className={styles.bottomEmailButton}
                disabled={!bottomIsButtonEnabled || bottomIsSubmitting}
                style={{
                  opacity:
                    bottomIsButtonEnabled && !bottomIsSubmitting ? "1" : "0.6",
                  cursor:
                    bottomIsButtonEnabled && !bottomIsSubmitting
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {bottomIsSubmitting ? "Processing..." : "Get Early Access"}
              </button>

              {bottomMessage.text && (
                <div
                  className={`${styles.message} ${
                    styles[
                      `message${
                        bottomMessage.type.charAt(0).toUpperCase() +
                        bottomMessage.type.slice(1)
                      }`
                    ]
                  }`}
                  style={{ textAlign: "center", marginBottom: "16px" }}
                >
                  {bottomMessage.text}
                </div>
              )}

              {showBottomShareButton && (
                <div
                  className={styles.shareContainer}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleBottomShare}
                    className={styles.shareButton}
                    style={{
                      backgroundColor: bottomShareCopied
                        ? "#4CAF50"
                        : "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {bottomShareCopied ? (
                      <>
                        <span>✅</span>
                        Link copied!
                      </>
                    ) : (
                      <>
                        <span>🔗</span>
                        Share with others
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <h3 className={styles.footerTitle}>Perfect Swing</h3>
            <p className={styles.footerSubtitle}>
              Your personal AI tennis coach, wherever you practice
            </p>
            <div className={styles.footerLinks}>
              <a href="/privacy" className={styles.footerLink}>
                Privacy Policy
              </a>
            </div>
            <p className={styles.footerCopyright}>
              © 2025 Perfect Swing. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
