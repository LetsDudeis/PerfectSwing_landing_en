import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState("");
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
  const isButtonEnabled = validateEmail(email);

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

    if (!validateEmail(email)) {
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
            email,
            submitted_at: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showTopMessage(
          "베타 체험 신청이 완료되었습니다! 출시되면 가장 먼저 체험해보실 수 있습니다.",
          "success"
        );
        setEmail("");
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

    if (!validateEmail(email)) {
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
            email,
            submitted_at: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showBottomMessage(
          "베타 체험 신청이 완료되었습니다! 출시되면 가장 먼저 체험해보실 수 있습니다.",
          "success"
        );
        setEmail("");
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
      </Head>

      <div className={`${styles.container} ${inter.className}`}>
        <div className={styles.mainSection}>
          <div className={styles.content}>
            <div className={styles.leftSection}>
              <div className={styles.mainContent}>
                <h1 className={styles.title}>
                  내 테니스 스윙,
                  <br />
                  프로와 뭐가 다를까?
                  <br />
                  <span className={styles.highlight}>
                    AI 궤적 분석이 답합니다.
                  </span>
                </h1>

                <p className={styles.description}>
                  스윙 영상을 업로드하면 AI가 프로 선수와 비교 분석해드립니다.
                  <br />
                  미세한 차이점을 발견하고 명확한 개선점을 제시받으세요.
                </p>

                <div className={styles.waitlistSection}>
                  <h3 className={styles.waitlistTitle}>베타 체험 신청</h3>
                  <div className={styles.launchBadge}>
                    🎾 2025년 하반기 출시 예정
                  </div>

                  <form className={styles.emailForm} onSubmit={handleTopSubmit}>
                    <input
                      type="email"
                      className={styles.emailInput}
                      placeholder="이메일 주소를 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={!isButtonEnabled || topIsSubmitting}
                      style={{
                        opacity:
                          isButtonEnabled && !topIsSubmitting ? "1" : "0.6",
                        cursor:
                          isButtonEnabled && !topIsSubmitting
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      {topIsSubmitting ? "신청 중..." : "베타 체험 신청하기"}
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
                  <div className={styles.phoneScreen}></div>
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
                  AI가 프로와 당신의 스윙을 정밀 비교 분석하여 차이점을 한눈에
                  보여드립니다. 복잡한 이론 설명 없이 직관적인 시각화로
                  이해하세요.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🏠</div>
                <h3 className={styles.benefitTitle}>혼자서도 완벽한 분석</h3>
                <p className={styles.benefitDescription}>
                  박스볼이나 벽치기할 장소도 없어서 집에서 빈 스윙만 하고
                  계시나요? 혼자 연습한 영상도 정확하게 분석해드립니다. 언제
                  어디서든 연습하세요.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📤</div>
                <h3 className={styles.benefitTitle}>쉽게 공유하기</h3>
                <p className={styles.benefitDescription}>
                  분석 결과를 SNS나 친구들과 간편하게 공유하여 함께 성장하세요.
                  개선 과정을 기록하고 성취감을 나눠보세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className={styles.reviewsSection}>
          <div className={styles.reviewsContainer}>
            <h2 className={styles.reviewsTitle}>
              테니스 플레이어들의 생생한 후기
            </h2>

            <div className={styles.reviewsGrid}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>김</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>김○○</h4>
                      <p className={styles.reviewerLevel}>NTRP 3.5</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "혼자 연습할 때마다 제대로 하고 있는지 궁금했는데,
                  PerfectSwing으로 내 스윙을 분석받고 나서 확실히 개선점을 알 수
                  있었어요. 프로와 비교해주는 기능이 정말 신기해요!"
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>박</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>박○○</h4>
                      <p className={styles.reviewerLevel}>NTRP 3.0</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "코트 예약이 어려워서 집에서 빈 스윙만 하고 있었는데, 이
                  앱으로 그 영상도 분석받을 수 있어서 놀랐어요. 일관성 없던 제
                  스윙이 많이 안정됐어요. 언제 어디서든 피드백 받을 수 있어서
                  좋아요."
                </p>
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>이</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>이○○</h4>
                      <p className={styles.reviewerLevel}>NTRP 2.5</p>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>⭐⭐⭐⭐⭐</div>
                </div>
                <p className={styles.reviewText}>
                  "테니스 시작한지 6개월 정도 됐는데, 제대로 치고 있는지 확신이
                  없었어요. PerfectSwing으로 기본기를 체크받으니까 잘못된 습관을
                  바로잡을 수 있어서 좋네요!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Email Collection Section */}
        <section className={styles.bottomEmailSection}>
          <div className={styles.bottomEmailContainer}>
            <h2 className={styles.bottomEmailTitle}>
              내 스윙의 문제점이 궁금하다면?
            </h2>
            <p className={styles.bottomEmailSubtitle}>
              프로 선수와 비교해보고 정확한 개선점을 찾아보세요
            </p>
            <form
              className={styles.bottomEmailForm}
              onSubmit={handleBottomSubmit}
            >
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.bottomEmailInput}
                required
              />
              <button
                type="submit"
                className={styles.bottomEmailButton}
                disabled={!isButtonEnabled || bottomIsSubmitting}
                style={{
                  opacity: isButtonEnabled && !bottomIsSubmitting ? "1" : "0.6",
                  cursor:
                    isButtonEnabled && !bottomIsSubmitting
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {bottomIsSubmitting ? "처리 중..." : "베타 체험 신청하기"}
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
