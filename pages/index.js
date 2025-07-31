import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [statsCount, setStatsCount] = useState(500);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 버튼 활성화 상태
  const isButtonEnabled = validateEmail(email) && isPrivacyChecked;

  // 메시지 표시
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showMessage("올바른 이메일 주소를 입력해주세요.", "error");
      return;
    }

    if (!isPrivacyChecked) {
      showMessage("개인정보 수집 및 이용에 동의해주세요.", "error");
      return;
    }

    setIsSubmitting(true);

    // 모의 API 호출 (실제로는 Supabase 연동)
    setTimeout(() => {
      showMessage(
        "얼리 액세스 신청이 완료되었습니다! 출시 소식을 이메일로 알려드리겠습니다.",
        "success"
      );
      setEmail("");
      setIsPrivacyChecked(false);
      setIsSubmitting(false);
      setStatsCount((prev) => prev + 1);
    }, 2000);
  };

  const handleDemoClick = () => {
    showMessage("데모 영상은 곧 공개됩니다!", "info");
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.mainContent}>
              <h1 className={styles.title}>
                내 테니스 스윙, 프로와 뭐가 다를까?
                <br />
                <span className={styles.highlight}>
                  AI 궤적 분석이 답합니다.
                </span>
              </h1>

              <p className={styles.description}>
                더 이상 막연한 감으로 고민하지 마세요. 당신의 스윙 영상을
                업로드하면, AI가 프로 선수의 정교한 궤적과 내 스윙을 나란히
                비교해드립니다. 지금껏 몰랐던 미세한 차이점을 발견하고, 명확하고
                간단한 피드백으로 오늘부터 달라지는 테니스를 경험하세요.
              </p>

              <div className={styles.waitlistSection}>
                <h3 className={styles.waitlistTitle}>얼리 액세스 신청</h3>
                <div className={styles.launchBadge}>
                  🎾 2025년 1분기 출시 예정
                </div>

                <form className={styles.emailForm} onSubmit={handleSubmit}>
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
                    disabled={!isButtonEnabled || isSubmitting}
                    style={{
                      opacity: isButtonEnabled && !isSubmitting ? "1" : "0.6",
                      cursor:
                        isButtonEnabled && !isSubmitting
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    {isSubmitting ? "신청 중..." : "얼리 액세스 신청하기"}
                  </button>
                </form>

                <div className={styles.privacyNote}>
                  <input
                    type="checkbox"
                    id="privacy"
                    className={styles.privacyCheckbox}
                    checked={isPrivacyChecked}
                    onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                  />
                  <label htmlFor="privacy">
                    개인정보 수집 및 이용에 동의합니다. 언제든 구독 해지
                    가능합니다.
                  </label>
                </div>

                <div className={styles.stats}>
                  <span className={styles.statsIcon}>👥</span>
                  <span className={styles.statsText}>
                    <strong>{statsCount}+</strong> 테니스 선수들이 이미
                    참여했습니다
                  </span>
                </div>

                {message.text && (
                  <div
                    className={`${styles.message} ${
                      styles[
                        `message${
                          message.type.charAt(0).toUpperCase() +
                          message.type.slice(1)
                        }`
                      ]
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.demoContainer}>
              <div className={styles.phoneMockup}>
                <div className={styles.phoneScreen}>
                  <div
                    className={styles.demoPlaceholder}
                    onClick={handleDemoClick}
                  >
                    <div className={styles.demoIcon}>🎾</div>
                    <p>데모 영상이 들어갈 공간</p>
                    <small>AI 궤적 분석 화면 미리보기</small>
                  </div>
                </div>
              </div>
              <p className={styles.demoCaption}>
                간단히 영상을 업로드하고 AI 분석을 시작하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
