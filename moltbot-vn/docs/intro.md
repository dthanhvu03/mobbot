---
sidebar_position: 1
title: Giới thiệu về Moltbot
description: Moltbot là gì? Hướng dẫn đi đầy đủ về Trợ lý AI tự chủ (Autonomous Agent) chạy trên máy tính của bạn. Thay thế ChatGPT với khả năng truy cập file và bảo mật cao.
keywords: [moltbot là gì, clawdbot, ai agent, trợ lý ảo local, self-hosted ai]
image: img/docusaurus-social-card.jpg
---

import Admonition from '@theme/Admonition';

# 🤖 Moltbot: Trợ lý AI Tự Chủ

**Moltbot** (tiền thân là Clawdbot) là một trợ lý AI cá nhân thế hệ mới, được thiết kế để **hoạt động nền liên tục 24/7**, không chỉ trả lời câu hỏi mà còn **thực thi hành động thực tế** trên máy tính của bạn thông qua kiến trúc Gateway an toàn.

<Admonition type="tip" title="AI Không Chỉ Để Chat">
  <p>Moltbot không giống như ChatGPT hay Claude trên web. Nó sống trong máy tính của bạn, có khả năng quản lý file, chạy script, và kết nối với thế giới thực thông qua các API.</p>
</Admonition>

## ✨ Tại sao chọn Moltbot?

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>🚀 Tự Chủ (Autonomous)</h3>
      <p>Không cần bạn ra lệnh từng bước. Moltbot có thể nhận task, tự lên kế hoạch (planning), và thực thi các bước phức tạp trong khi bạn tập trung việc khác.</p>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>�️ Cơ Chế Pairing Bảo Mật</h3>
      <p>Mô hình bảo mật "Pairing" đảm bảo chỉ có <strong>BẠN</strong> mới có thể ra lệnh cho Bot. Mọi hành động quan trọng (như xóa file, chạy lệnh shell) đều cần sự chấp thuận.</p>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>🌐 Đa Nền Tảng & Liền Mạch</h3>
      <p>Chat với Moltbot từ bất cứ đâu: <strong>Telegram, Zalo, Discord, Slack</strong>. Nó luôn online và đồng bộ ngữ cảnh qua mọi thiết bị.</p>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>⚡ Kiến Trúc Gateway Local</h3>
      <p>Gateway chạy trực tiếp trên máy local của bạn, đảm bảo quyền riêng tư tối đa và độ trễ thấp nhất. Dữ liệu nhạy cảm không rời khỏi máy của bạn trừ khi cần thiết.</p>
    </div>
  </div>
</div>

## 📊 So sánh nhanh

| TÍNH NĂNG | 🤖 AI CHATBOT WEB | 🦞 MOLTBOT VN |
|-----------|-------------------|---------------|
| **Truy cập File System** | ❌ Không thể | ✅ Có (với Sandbox & Approval) |
| **Hoạt động 24/7** | ❌ Theo phiên (Session based) | ✅ Daemon Service (Always-on) |
| **Kết nối Chat App** | ❌ Không (hoặc hạn chế) | ✅ Native (Telegram, Zalo, etc.) |
| **Chạy Script/Code** | ⚠️ Hạn chế (Sandbox cloud) | ✅ Full Power (Local Machine) |
| **Quyền riêng tư** | ☁️ Cloud lưu trữ | 🏠 Local-first |

## ⚠️ Cảnh Báo Bảo Mật

<Admonition type="danger" title="DÀNH CHO NGƯỜI DÙNG KỸ THUẬT">
  <p>Moltbot là một công cụ mạnh mẽ với khả năng truy cập hệ thống sâu.</p>
  <ul>
    <li><strong>KHÔNG</strong> chạy trên máy tính chứa dữ liệu cực kỳ nhạy cảm nếu chưa cấu hình Sandbox kỹ lưỡng.</li>
    <li><strong>KHUYẾN NGHỊ</strong> chạy trên Docker, VPS hoặc máy ảo chuyên dụng để cách ly.</li>
    <li>Luôn kiểm tra kỹ các lệnh terminal mà Bot đề xuất thực thi.</li>
  </ul>
</Admonition>

## 🏁 Bắt đầu hành trình

Bạn đã sẵn sàng sở hữu một trợ lý AI thực thụ? Hãy làm theo các bước sau:

1.  **Chuẩn bị**: Xem [Yêu cầu hệ thống](/docs/getting-started/requirements) (Node.js v22+).
2.  **Cài đặt**: Chọn phương án [Docker](/docs/installation/docker) (Nhanh & An toàn) hoặc [NPM](/docs/deployment/production) (Full control).
3.  **Khởi chạy**: Xem hướng dẫn [Quick Start](/docs/getting-started/quick-start) để có Bot đầu tiên sau 5 phút.

---

<Admonition type="info" title="Lịch sử phát triển">
  <p>Dự án được đổi tên từ <strong>Clawdbot</strong> sang <strong>Moltbot</strong> để tránh tranh chấp thương hiệu và thể hiện sự "lột xác" (moulting) - biểu tượng cho sự trưởng thành và thích nghi liên tục của AI Agent.</p>
</Admonition>
