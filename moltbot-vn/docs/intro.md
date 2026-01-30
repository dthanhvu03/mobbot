---
sidebar_position: 1
sidebar_label: 🏠 Moltbot là gì?
title: Moltbot là gì? Tổng quan hoàn chỉnh về Trợ lý AI Tự Chủ | Moltbot VN
description: Moltbot (Clawdbot) là AI Agent tự host, có khả năng quản lý file, chạy script và kết nối Telegram/Zalo. Hướng dẫn tiếng Việt đầy đủ nhất cho người mới.
keywords: [moltbot là gì, clawdbot là gì, ai agent tự host, trợ lý ảo local, self-hosted ai, tạo chatbot telegram ai, so sánh moltbot chatgpt]
image: /img/docusaurus-social-card.jpg
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🤖 Moltbot là gì? Tổng quan hoàn chỉnh

**Moltbot** (tiền thân là Clawdbot) là một **trợ lý AI cá nhân thế hệ mới**, được thiết kế để hoạt động 24/7 ngay trên máy tính của bạn. Không giống ChatGPT hay Claude trên web, Moltbot có khả năng **thực thi hành động thực tế**: quản lý file, chạy script, gửi tin nhắn tự động và còn nhiều hơn thế.

<Admonition type="tip" title="💡 Tóm tắt nhanh">
**Moltbot = AI Brain (Claude/GPT) + Execution Engine (Tools) + Chat Interface (Telegram/Zalo)**

Kết quả: Một trợ lý AI có thể **LÀM VIỆC** thay bạn, không chỉ **TRẢ LỜI** câu hỏi.
</Admonition>

---

## ✨ Tại sao chọn Moltbot?

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>🚀 Tự Chủ (Autonomous)</h3>
      <p>Không cần bạn ra lệnh từng bước. Moltbot có thể nhận task phức tạp, tự lên kế hoạch (planning), và thực thi trong khi bạn tập trung việc khác.</p>
      <p><strong>Ví dụ:</strong> <em>"Tìm trong thư mục Downloads tất cả file PDF trên 10MB, nén lại và gửi link qua Telegram cho tôi"</em></p>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>🛡️ Bảo Mật Pairing</h3>
      <p>Mô hình bảo mật "Pairing" đảm bảo chỉ có <strong>BẠN</strong> mới có thể ra lệnh cho Bot. Mọi hành động nguy hiểm (như xóa file, chạy lệnh shell) đều cần bạn phê duyệt.</p>
      <p><a href="/docs/security/pairing-model">→ Tìm hiểu Pairing Model</a></p>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>🌐 Đa Nền Tảng</h3>
      <p>Chat với Moltbot từ <strong>Telegram, Zalo, Discord, Slack</strong>... Moltbot luôn online và đồng bộ ngữ cảnh qua mọi thiết bị của bạn.</p>
      <p><a href="/docs/channels/overview">→ Xem các kênh hỗ trợ</a></p>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--md shadow--md h-100">
      <h3>⚡ Gateway Local</h3>
      <p>Gateway chạy trên máy local của bạn, đảm bảo quyền riêng tư tối đa. Dữ liệu nhạy cảm không rời khỏi máy trừ khi cần gọi API AI.</p>
      <p><a href="/docs/gateway/configuration">→ Cấu hình Gateway</a></p>
    </div>
  </div>
</div>

---

## 📊 So sánh: Moltbot vs ChatGPT/Claude Web

Nhiều người hỏi: *"Tại sao không dùng ChatGPT hay Claude trên web cho tiện?"*. Đây là sự khác biệt:

| TÍNH NĂNG | 🌐 AI CHATBOT WEB | 🦞 MOLTBOT |
|-----------|-------------------|------------|
| **Truy cập File System** | ❌ Không thể | ✅ Có (với Sandbox & Approval) |
| **Hoạt động 24/7** | ❌ Theo phiên (Session based) | ✅ Daemon Service (Always-on) |
| **Kết nối Chat App** | ❌ Không (hoặc hạn chế) | ✅ Native (Telegram, Zalo, Discord) |
| **Chạy Script/Code** | ⚠️ Hạn chế (Sandbox cloud) | ✅ Full Power (Local Machine) |
| **Quyền riêng tư** | ☁️ Cloud lưu trữ | 🏠 Local-first |
| **Chi phí** | 💰 $20/tháng cố định | 💰 Pay-as-you-go (API) |
| **Nhớ ngữ cảnh dài hạn** | ⚠️ Hạn chế | ✅ Vector Database tích hợp |

<Admonition type="info" title="Khi nào nên dùng Moltbot?">
- Bạn muốn AI **làm việc thay bạn**, không chỉ trả lời câu hỏi
- Bạn cần AI **truy cập file, chạy code** trên máy local
- Bạn muốn **1 Bot phục vụ mọi nơi** (Telegram, Zalo, Discord...)
- Bạn quan tâm đến **quyền riêng tư** dữ liệu
</Admonition>

---

## 🎯 Use Cases thực tế

### 👨‍💻 Cho Developer
- **Code Review tự động**: Gửi file code qua Telegram → Nhận phản hồi về bug và cải tiến
- **DevOps**: Giám sát server, restart service, backup database theo lịch
- **Git Automation**: Tự động tạo commit message, review PR

### 🏢 Cho Doanh nghiệp nhỏ
- **Trả lời khách hàng 24/7**: Kết nối Zalo OA → Bot tư vấn sản phẩm tự động
- **Quản lý đơn hàng**: Đọc email đặt hàng → Tạo file Excel tổng hợp
- **Báo cáo tự động**: Mỗi sáng nhận báo cáo doanh số qua Telegram

### 🧑‍🎓 Cho cá nhân
- **Trợ lý lịch trình**: Nhắc nhở cuộc họp, deadline
- **Nghiên cứu**: Tìm kiếm web, tóm tắt tài liệu dài
- **Quản lý file**: Dọn dẹp, sắp xếp, backup tự động

---

## ⚠️ Cảnh Báo Bảo Mật Quan Trọng

<Admonition type="danger" title="⚠️ DÀNH CHO NGƯỜI DÙNG KỸ THUẬT">

Moltbot là một công cụ mạnh mẽ với khả năng truy cập hệ thống sâu. **KHÔNG** nên dùng nếu bạn:

- Hoàn toàn mới với command line / terminal
- Không có thời gian để học và cấu hình
- Muốn giải pháp "cài là chạy" ngay lập tức

**KHUYẾN NGHỊ:**

- 🐳 Chạy trong [Docker](/docs/deployment/docker) hoặc VPS riêng
- 🔒 Cấu hình [Allowlist](/docs/advanced/exec-security) cho các lệnh được phép
- 👁️ Luôn review các lệnh Bot đề xuất trước khi approve

</Admonition>

Đọc thêm: [Best Practices Bảo mật](/docs/security/best-practices)

---

## 🏁 Bắt đầu với Moltbot

Bạn đã sẵn sàng? Hãy làm theo các bước sau:

<Tabs>
  <TabItem value="quick" label="⚡ Nhanh (5 phút)" default>
    1. Cài Node.js v22+ ([Yêu cầu hệ thống](/docs/getting-started/requirements))
    2. Chạy: `npm install -g moltbot`
    3. Chạy: `moltbot onboard --install-daemon`
    4. Làm theo wizard setup
    
    → [Xem Quick Start đầy đủ](/docs/getting-started/quick-start)
  </TabItem>
  <TabItem value="docker" label="🐳 Docker (Khuyên dùng)">
    1. Cài Docker trên máy
    2. Clone docker-compose template
    3. Thêm API keys vào `.env`
    4. Chạy: `docker compose up -d`
    
    → [Xem hướng dẫn Docker](/docs/deployment/docker)
  </TabItem>
  <TabItem value="manual" label="🔧 Thủ công (Full control)">
    1. Clone repo từ GitHub
    2. Cài dependencies với `npm install`
    3. Build: `npm run build`
    4. Cấu hình `moltbot.json` thủ công
    
    → [Xem Production Setup](/docs/deployment/production)
  </TabItem>
</Tabs>

---

## ❓ Câu hỏi thường gặp (FAQ)

<details>
<summary><b>Moltbot có miễn phí không?</b></summary>

**Moltbot là open-source và miễn phí.** Tuy nhiên, bạn cần trả phí API cho nhà cung cấp AI (Anthropic Claude hoặc OpenAI GPT). Chi phí thường khoảng $10-50/tháng tùy mức độ sử dụng.

</details>

<details>
<summary><b>Moltbot khác gì với Auto-GPT, AgentGPT?</b></summary>

**Auto-GPT/AgentGPT**: Chạy task một lần, không có bộ nhớ dài hạn, không kết nối chat app.

**Moltbot**: Chạy liên tục như daemon, có bộ nhớ Vector DB, kết nối native với Telegram/Zalo.

</details>

<details>
<summary><b>Tôi cần máy tính cấu hình như thế nào?</b></summary>

**Tối thiểu**: 2GB RAM, 1 CPU core.

**Khuyến nghị**: 4GB RAM, 2 CPU cores.

Không cần GPU vì AI inference chạy trên cloud (API).

</details>

<details>
<summary><b>Có thể chạy Moltbot trên VPS giá rẻ?</b></summary>

Hoàn toàn có thể! VPS $5-6/tháng (DigitalOcean, Vultr, Hetzner) là đủ. Xem [hướng dẫn deploy lên VPS](/docs/deployment/production).

</details>

<details>
<summary><b>Moltbot có hỗ trợ tiếng Việt không?</b></summary>

Moltbot sử dụng Claude/GPT làm "bộ não", nên khả năng hiểu và viết tiếng Việt cực kỳ tự nhiên. Website tài liệu này cũng hoàn toàn bằng tiếng Việt.

</details>

---

## 📚 Tiếp theo

<div className="row">
  <div className="col col--4">
    <div className="card padding--md">
      <h3>🚀 Bắt đầu nhanh</h3>
      <p>Có Bot đầu tiên sau 5 phút</p>
      <a href="/docs/getting-started/quick-start">Quick Start →</a>
    </div>
  </div>
  <div className="col col--4">
    <div className="card padding--md">
      <h3>📬 Kết nối Telegram</h3>
      <p>Tích hợp Bot với Telegram</p>
      <a href="/docs/channels/telegram">Telegram Guide →</a>
    </div>
  </div>
  <div className="col col--4">
    <div className="card padding--md">
      <h3>🔒 Bảo mật trước tiên</h3>
      <p>Cấu hình an toàn cho Bot</p>
      <a href="/docs/security/best-practices">Security →</a>
    </div>
  </div>
</div>

---

<Admonition type="info" title="📜 Lịch sử phát triển">
Dự án được đổi tên từ **Clawdbot** sang **Moltbot** để tránh tranh chấp thương hiệu và thể hiện sự "lột xác" (moulting) - biểu tượng cho sự trưởng thành và thích nghi liên tục của AI Agent.
</Admonition>
