import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Admonition from '@theme/Admonition';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Moltbot VN 🇻🇳</h1>
        <p className="hero__subtitle">
          Tài liệu tiếng Việt cho <span style={{color: '#bef264'}}>AI Agent tự chủ</span> (Self-Hosted)
        </p>
        <p className={styles.description}>
          Hướng dẫn cài đặt, quản lý và tối ưu hóa Moltbot (Clawdbot). <br/>
          Chạy local, bảo mật dữ liệu, kết nối đa kênh.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quick-start">
            🚀 Bắt đầu sau 5 phút
          </Link>
          <Link
            className="button button--secondary button--outline button--lg margin-left--md"
            to="/docs/intro">
            📖 Đọc tài liệu
          </Link>
        </div>
      </div>
    </header>
  );
}

function WarningBanner() {
  return (
    <div className="container margin-top--md">
      <Admonition type="danger" title="⚠️ CẢNH BÁO AN TOÀN QUAN TRỌNG">
        <p style={{marginBottom: 0}}>
          Moltbot là AI Agent có quyền thực thi lệnh terminal và truy cập file hệ thống. 
          <strong> Chỉ chạy trên môi trường cách ly (VM, VPS, Docker).</strong> 
          Không chạy trực tiếp trên máy tính làm việc chính của bạn.
          <br/>
          <Link to="/docs/security/best-practices">👉 Đọc hướng dẫn bảo mật</Link>
        </p>
      </Admonition>
    </div>
  );
}

const QuickPaths = () => (
  <section className="container margin-top--xl margin-bottom--xl">
    <h2 className="text--center margin-bottom--lg">Bạn muốn bắt đầu từ đâu?</h2>
    <div className="row">
      {/* Beginner Path */}
      <div className="col col--4">
        <div className="card h-100 shadow--md">
          <div className="card__header">
            <h3>🚀 Người Mới (Beginner)</h3>
          </div>
          <div className="card__body">
            <p>Chưa từng dùng AI Agent? Bắt đầu từ con số 0.</p>
            <ul>
              <li>Cài đặt Moltbot trong 5 phút</li>
              <li>Kết nối Telegram/Zalo</li>
              <li>Chat thử với bot</li>
            </ul>
          </div>
          <div className="card__footer">
            <Link to="/docs/getting-started/quick-start" className="button button--primary button--block">
              Hướng dẫn cơ bản →
            </Link>
          </div>
        </div>
      </div>

      {/* Advanced Path */}
      <div className="col col--4">
        <div className="card h-100 shadow--md">
          <div className="card__header">
            <h3>🛠️ Chuyên Sâu (Advanced)</h3>
          </div>
          <div className="card__body">
            <p>Tối ưu hóa và mở rộng khả năng của bot.</p>
            <ul>
              <li>Config nâng cao (Plugins)</li>
              <li>Multi-Agent Routing</li>
              <li>Bảo mật & Sandbox</li>
            </ul>
          </div>
          <div className="card__footer">
            <Link to="/docs/advanced/tools-overview" className="button button--info button--block">
              Tính năng nâng cao →
            </Link>
          </div>
        </div>
      </div>

      {/* Enterprise Path */}
      <div className="col col--4">
        <div className="card h-100 shadow--md">
          <div className="card__header">
            <h3>🏢 Doanh Nghiệp (Biz)</h3>
          </div>
          <div className="card__body">
            <p>Triển khai cho team và khách hàng.</p>
            <ul>
              <li>Deploy Production (VPS/Docker)</li>
              <li>Tích hợp Zalo OA / Slack</li>
              <li>Quy trình CSKH tự động</li>
            </ul>
          </div>
          <div className="card__footer">
            <Link to="/docs/deployment/overview" className="button button--success button--block">
              Hướng dẫn Deploy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CommunitySection = () => (
  <section className="hero hero--dark">
    <div className="container text--center">
      <h2>🤝 Tham gia Cộng đồng Moltbot VN</h2>
      <p>Nơi trao đổi, hỏi đáp và chia sẻ kinh nghiệm sử dụng AI Agent.</p>
      <div className={styles.buttons}>
        <Link
          className="button button--primary button--lg"
          href="https://t.me/moltbotvn">
          Tham gia Telegram
        </Link>
        <Link
          className="button button--secondary button--lg margin-left--md"
          href="https://discord.gg/moltbot-vn">
          Join Discord
        </Link>
      </div>
    </div>
  </section>
);

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Trang chủ`}
      description="Tài liệu Moltbot (Clawdbot) tiếng Việt đầy đủ nhất. Hướng dẫn cài đặt, sử dụng và tối ưu hóa AI Agent tự chủ.">
      <HomepageHeader />
      <WarningBanner />
      <main>
        <HomepageFeatures />
        <QuickPaths />
        <CommunitySection />
      </main>
    </Layout>
  );
}
