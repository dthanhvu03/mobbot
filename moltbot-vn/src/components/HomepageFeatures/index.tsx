import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🤖 AI Agent Tự Chủ',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Không chỉ chat. Moltbot có khả năng <strong>thực hiện hành động</strong>: quản lý file, 
        chạy script, tìm kiếm web và tự động hóa quy trình làm việc của bạn.
      </>
    ),
  },
  {
    title: '🧠 Bộ Nhớ Dài Hạn',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Tích hợp sẵn Vector Database giúp bot <strong>ghi nhớ mọi cuộc hội thoại</strong>. 
        Bot hiểu ngữ cảnh dự án và thói quen của bạn mà không cần nhắc lại.
      </>
    ),
  },
  {
    title: '📱 Đa Kênh Tích Hợp',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Kết nối Telegram, Zalo, Discord, WhatsApp, Slack... 
        Điều khiển AI Agent của bạn từ <strong>bất kỳ ứng dụng chat nào</strong> bạn thích.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
