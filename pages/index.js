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

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 버튼 활성화 상태
  const topIsButtonEnabled = validateEmail(topEmail);
  const bottomIsButtonEnabled = validateEmail(bottomEmail);

  // 상단 메시지 표시
  const showTopMessage = (text, type) => {
    setTopMessage({ text, type });
    setTimeout(() => {
      setTopMessage({ text: "", type: "" });
    }, 5000);
  };

  // 하단 메시지 표시
  const showBottomMessage = (text, type) => {
    setBottomMessage({ text, type });
    setTimeout(() => {
      setBottomMessage({ text: "", type: "" });
    }, 5000);
  };

  // 상단 폼 제출 처리
  const handleTopSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(topEmail)) {
      showTopMessage("올바른 이메일 주소를 입력해주세요.", "error");
      return;
    }

    setTopIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/collect-email`,
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
          "사전 예약이 완료되었습니다! 출시되면 가장 먼저 체험해보실 수 있습니다.",
          "success"
        );
        setTopEmail("");
        setStatsCount((prev) => prev + 1);
      } else {
        showTopMessage(data.message || "오류가 발생했습니다.", "error");
      }
    } catch (error) {
      console.error("Top submit error:", error);
      showTopMessage(
        "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
        "error"
      );
    } finally {
      setTopIsSubmitting(false);
    }
  };

  // 하단 폼 제출 처리
  const handleBottomSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(bottomEmail)) {
      showBottomMessage("올바른 이메일 주소를 입력해주세요.", "error");
      return;
    }

    setBottomIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/collect-email`,
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
          "사전 예약이 완료되었습니다! 출시되면 가장 먼저 체험해보실 수 있습니다.",
          "success"
        );
        setBottomEmail("");
        setStatsCount((prev) => prev + 1);
      } else {
        showBottomMessage(data.message || "오류가 발생했습니다.", "error");
      }
    } catch (error) {
      console.error("Bottom submit error:", error);
      showBottomMessage(
        "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
        "error"
      );
    } finally {
      setBottomIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>PerfectSwing - AI 테니스 자세 교정</title>
        <meta
          name="description"
          content="테니스 스윙 궤적을 AI로 분석하여 프로 선수와 비교해주는 혁신적인 서비스"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph 메타 태그 (카카오톡 링크 공유용) */}
        <meta
          property="og:title"
          content="PerfectSwing - AI 테니스 자세 교정"
        />
        <meta
          property="og:description"
          content="테니스 영상, 봐도 봐도 모르겠다면? 한 눈에 내 개선점 확인하기"
        />
        <meta
          property="og:image"
          content="https://perfect-swing.vercel.app/og-image-v2.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="PerfectSwing" />
        <meta property="og:url" content="https://perfect-swing.vercel.app" />
        <meta property="og:type" content="website" />

        {/* 카카오톡 전용 메타 태그 */}
        <meta name="kakao:title" content="PerfectSwing - AI 테니스 자세 교정" />
        <meta
          name="kakao:description"
          content="테니스 영상, 봐도 봐도 모르겠다면? 한 눈에 내 개선점 확인하기"
        />
        <meta
          name="kakao:image"
          content="https://perfect-swing.vercel.app/og-image-v2.jpg"
        />

        {/* Twitter Card 메타 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PerfectSwing - AI 테니스 자세 교정"
        />
        <meta
          name="twitter:description"
          content="테니스 영상, 봐도 봐도 모르겠다면? 한 눈에 내 개선점 확인하기"
        />
        <meta
          name="twitter:image"
          content="https://perfect-swing.vercel.app/og-image-v2.jpg"
        />
      </Head>

      <div className={`${styles.container} ${inter.className}`}>
        <div className={styles.mainSection}>
          <div className={styles.content}>
            <div className={styles.leftSection}>
              <div className={styles.mainContent}>
                <h1 className={styles.title}>
                  테니스 영상,
                  <br />
                  봐도 봐도 모르겠다면?
                  <br />
                  <span className={styles.highlight}>
                    한 눈에 내 개선점 확인하기
                  </span>
                </h1>

                <p className={styles.description}>
                  스윙 영상을 업로드하면 AI가 프로 선수와 비교 분석합니다.
                  <br />
                  숨겨진 차이점을 두 눈으로 확인하세요.
                </p>

                <div className={styles.waitlistSection}>
                  <h3 className={styles.waitlistTitle}>사전 예약 신청</h3>
                  <div className={styles.launchBadge}>
                    🎾 2025년 하반기 출시 예정
                  </div>

                  <form className={styles.emailForm} onSubmit={handleTopSubmit}>
                    <input
                      type="email"
                      className={styles.emailInput}
                      placeholder="이메일 주소를 입력하세요"
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
                      {topIsSubmitting ? "신청 중..." : "앱 출시 알림받기"}
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
                    >
                      {topMessage.text}
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
                      <source src="/demo.mp4" type="video/mp4" />
                      브라우저가 비디오를 지원하지 않습니다.
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
                PerfectSwing
                <br />
                나만의 AI 테니스 코치
              </h2>
              <p className={styles.benefitsSubtitle}>
                스마트폰 하나로 전문가 수준의 스윙 분석을 경험해보세요
              </p>
            </div>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📊</div>
                <h3 className={styles.benefitTitle}>한눈에 보는 스윙 차이</h3>
                <p className={styles.benefitDescription}>
                  AI가 프로와 당신의 스윙 궤적을 시각적으로 보여드립니다.
                  <br />
                  핵심적인 개선점을 직접 느껴보세요.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🏠</div>
                <h3 className={styles.benefitTitle}>혼자서도 완벽한 분석</h3>
                <p className={styles.benefitDescription}>
                  벽치기할 장소도 없어서 빈 스윙만 하고 계시나요?
                  <br />
                  혼자 연습한 영상도 정확하게 분석해드립니다.
                  <br />
                  언제 어디서든 연습하세요.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔒</div>
                <h3 className={styles.benefitTitle}>100% 개인정보 보호</h3>
                <p className={styles.benefitDescription}>
                  업로드한 영상과 분석 결과는 오직 본인만 볼 수 있습니다.
                  <br />
                  개인정보는 절대 외부로 유출되지 않으며, 안전하게 보호됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className={styles.reviewsSection}>
          <div className={styles.reviewsContainer}>
            <h2 className={styles.reviewsTitle}>사전 체험자들의 생생한 후기</h2>

            <div className={styles.reviewsGrid}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>김</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>김○영</h4>
                      <p className={styles.reviewerLevel}>NTRP 3.5</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "혼자 연습할 때마다 제대로 하고 있는지 궁금했는데, 스윙을
                  분석받고 나서 확실히 개선점을 알 수 있었어요."
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>박</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>박○아</h4>
                      <p className={styles.reviewerLevel}>NTRP 3.0</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "옆 코트로 공이 넘어갈까봐 집에서 빈 스윙만 하고 있었는데, 이
                  앱으로 그 영상도 분석받을 수 있어서 놀랐어요. 일관성 없던 제
                  스윙이 많이 안정됐어요. 언제 어디서든 피드백 받을 수 있어서
                  좋아요."
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>정</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>정○훈</h4>
                      <p className={styles.reviewerLevel}>NTRP 2.5</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "테니스 시작한지 6개월 정도 됐는데, 제대로 치고 있는지 확신이
                  없었어요. 게임 전에 스윙을 체크받으니까 잘못된 습관을 바로잡을
                  수 있어서 좋네요!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Email Collection Section */}
        <section className={styles.bottomEmailSection}>
          <div className={styles.bottomEmailContainer}>
            <h2 className={styles.bottomEmailTitle}>
              내 스윙의 개선점이 궁금하다면?
            </h2>
            <p className={styles.bottomEmailSubtitle}>
              프로 선수와 비교해보고 핵심적인 개선점을 찾아보세요
            </p>
            <form
              className={styles.bottomEmailForm}
              onSubmit={handleBottomSubmit}
            >
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
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
                {bottomIsSubmitting ? "처리 중..." : "앱 출시 알림받기"}
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
                >
                  {bottomMessage.text}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <h3 className={styles.footerTitle}>PerfectSwing</h3>
            <p className={styles.footerSubtitle}>
              당신만의 AI 스윙 코치, 언제 어디서든 당신과 함께
            </p>
            <p className={styles.footerCopyright}>
              © 2025 PerfectSwing. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
