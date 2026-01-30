---
sidebar_position: 1
title: Chức năng cốt lõi
description: Khám phá các tính năng mạnh mẽ của Moltbot - AI Agent tự chủ. Chủ động nhắc việc, bộ nhớ dài hạn (Vector DB), quản lý file hệ thống và đa nhiệm Multi-Agent.
keywords: [moltbot features, chức năng moltbot, vector database ai, proactive ai agent, quản lý file tự động]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';

# ⚡ Chức năng cốt lõi

**Moltbot** định nghĩa lại khái niệm trợ lý ảo: không chỉ là một *chatbot* gửi tin nhắn, mà là một **AI Agent** có khả năng hành động thực sự.

## 🎯 3 Trụ Cột Sức Mạnh

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card shadow--tl h-100 feature-card">
      <div className="card__header">
        <h3>🏃 Chủ Động (Proactive)</h3>
      </div>
      <div className="card__body">
        <p>Không đợi lệnh. Moltbot tự động nhắc lịch, báo cáo Task, và theo dõi tiến độ công việc thay bạn.</p>
      </div>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card shadow--tl h-100 feature-card">
      <div className="card__header">
        <h3>🧠 Bộ Nhớ Dài Hạn</h3>
      </div>
      <div className="card__body">
        <p>Vector Database tích hợp giúp Bot nhớ mọi context từ quá khứ. Không bao giờ phải nhắc lại việc đã bàn.</p>
      </div>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card shadow--tl h-100 feature-card">
      <div className="card__header">
        <h3>🛠️ Hành Động Thực</h3>
      </div>
      <div className="card__body">
        <p>Truy cập File System, chạy Script, quản lý Server. Từ lời nói biến thành hành động cụ thể.</p>
      </div>
    </div>
  </div>
</div>

---

## 🚀 Khám phá chi tiết

<Tabs groupId="core-features" className="unique-tabs-look">
  <TabItem value="brain" label="🧠 Trợ Lý Thông Minh" default>
    <div className="row">
      <div className="col col--6">
        <h3>Tư vấn & Đối thoại</h3>
        <p>Như một chatbot thông thường nhưng với context dài hạn:</p>
        <CodeBlock language="text" children={
          'Bạn: Tôi thích Python và đang học ML\n' +
          'Bot: Noted! Tôi sẽ nhớ điều này.\n\n' +
          '(3 ngày sau)\n' +
          'Bạn: Gợi ý project cho tôi\n' +
          'Bot: Dựa trên việc bạn thích Python và đang học ML...\n' +
          '     Build image classifier với PyTorch nhé?'
        } />
      </div>
      <div className="col col--6">
        <h3>Siêu Trí Nhớ (Vector DB)</h3>
        <ul>
            <li>✅ <strong>Lưu trữ vĩnh viễn:</strong> Toàn bộ lịch sử chat.</li>
            <li>✅ <strong>Semantic Search:</strong> Tìm lại thông tin theo ngữ nghĩa.</li>
            <li>✅ <strong>Zero Token Limit:</strong> Không bị giới hạn context window.</li>
        </ul>
        <Admonition type="tip" title="Thực tế">
          <p>Hỏi: <em>"Tháng trước tôi có nói gì về project X không?"</em></p>
          <p>Bot sẽ lục lại ký ức và trả lời chính xác từng chi tiết!</p>
        </Admonition>
      </div>
    </div>
  </TabItem>
  
  <TabItem value="hands" label="🛠️ Tự Động Hóa">
    <div className="row">
      <div className="col col--6">
        <h3>Quản lý File System</h3>
        <p>Bot có thể thao tác trực tiếp với file trên máy của bạn (trong Sandbox an toàn).</p>
        <ul>
            <li>📂 <strong>Organize:</strong> Sắp xếp folder lộn xộn.</li>
            <li>🔍 <strong>Search:</strong> Tìm file theo nội dung.</li>
            <li>💾 <strong>Backup:</strong> Tự động sao lưu định kỳ.</li>
        </ul>
        <CodeBlock language="bash" children={
          'Bạn: "Dọn dẹp folder Downloads giúp tôi"\n' +
          'Bot:\n' +
          '✅ Created: /Images, /Docs, /Installers\n' +
          '✅ Moved: 45 files pdf -> /Docs\n' +
          '✅ Moved: 120 images -> /Images\n' +
          '✨ Done in 2.3s'
        } />
      </div>
      <div className="col col--6">
        <h3>Lịch & Nhắc nhở</h3>
      </div>
      <div className="col col--6">
        <h3>Lịch & Nhắc nhở</h3>
        <p>Proactive reminders không cần setup app phức tạp.</p>
        <ul>
            <li>🔔 <strong>Smart Reminders:</strong> "Nhắc tôi gửi mail lúc 5h chiều"</li>
            <li>📅 <strong>Recurring:</strong> "Báo cáo tiến độ mỗi sáng thứ 2"</li>
            <li>👀 <strong>Proactive:</strong> Tự nhắc khi sắp đến deadline.</li>
        </ul>
      </div>
    </div>
  </TabItem>
  
  <TabItem value="eyes" label="👁️ Phân Tích Data">
    <div className="text--center margin-bottom--md">
      <h3>Vision & Data Processing</h3>
      <p>Gửi ảnh, file PDF hoặc Excel để Bot phân tích.</p>
    </div>
    
    <div className="row">
      <div className="col col--4">
        <div className="card shadow--md">
            <div className="card__header"><h4>📸 Vision Analysis</h4></div>
            <div className="card__body">
                <p>Gửi ảnh biểu đồ ➡️ Nhận phân tích xu hướng và dự báo.</p>
            </div>
        </div>
      </div>
      <div className="col col--4">
        <div className="card shadow--md">
            <div className="card__header"><h4>📄 Document QA</h4></div>
            <div className="card__body">
                <p>Upload PDF ➡️ Chat với nội dung tài liệu, trích xuất thông tin.</p>
            </div>
        </div>
      </div>
      <div className="col col--4">
        <div className="card shadow--md">
            <div className="card__header"><h4>📊 Data Parsing</h4></div>
            <div className="card__body">
                <p>JSON, CSV, Excel ➡️ Convert format hoặc query dữ liệu.</p>
            </div>
        </div>
      </div>
    </div>
  </TabItem>
</Tabs>

## 🔌 Kết nối không giới hạn

<Tabs groupId="channels">
  <TabItem value="chat-apps" label="💬 Chat Apps" default>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Type</th>
            <th>Setup</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong style={{color: '#0088cc'}}>Telegram</strong></td>
            <td>Native</td>
            <td>Bot Token</td>
            <td>✅ Excellent</td>
          </tr>
          <tr>
            <td><strong style={{color: '#25D366'}}>WhatsApp</strong></td>
            <td>Web Wrapper</td>
            <td>QR Scan</td>
            <td>✅ Good</td>
          </tr>
          <tr>
            <td><strong style={{color: '#5865F2'}}>Discord</strong></td>
            <td>Bot</td>
            <td>Token</td>
            <td>✅ Good</td>
          </tr>
          <tr>
            <td><strong style={{color: '#E01E5A'}}>Slack</strong></td>
            <td>App</td>
            <td>Token + Socket</td>
            <td>✅ Enterprise</td>
          </tr>
        </tbody>
      </table>
    </div>
  </TabItem>
  <TabItem value="integration" label="🔗 Integrations">
    <Admonition type="info" title="Hệ sinh thái mở">
      <p>Moltbot không chỉ chat. Nó kết nối với thế giới digital của bạn.</p>
    </Admonition>
    <ul>
        <li>📧 <strong>Gmail:</strong> Đọc mail, draft mail, thông báo mail quan trọng.</li>
        <li>🗓️ <strong>Calendar:</strong> Google Calendar, iCloud Calendar.</li>
        <li>💻 <strong>GitHub/GitLab:</strong> Monitor PRs, check issues, trigger CI/CD.</li>
        <li>🌐 <strong>Webhook:</strong> Nhận tín hiệu từ bất kỳ nguồn nào (IFTTT, Zapier).</li>
    </ul>
  </TabItem>
</Tabs>

---

## 🤖 Hệ thống Multi-Agent

Chia tách công việc rõ ràng với các "Nhân cách" (Personas) khác nhau.

<Tabs groupId="personas">
  <TabItem value="dev" label="👨‍💻 DevBot">
    <CodeBlock language="javascript" children={
      '// Agent chuyển code & deploy\n' +
      'const DevBot = {\n' +
      '  role: "Senior DevOps",\n' +
      '  permissions: ["read_code", "write_code", "exec_terminal"],\n' +
      '  tools: ["git", "docker", "npm"],\n' +
      '  style: "Precise, Technical, Concise"\n' +
      '}'
    } />
  </TabItem>
  <TabItem value="marketing" label="📢 MarketBot">
    <CodeBlock language="javascript" children={
      '// Agent chuyên viết content\n' +
      'const MarketBot = {\n' +
      '  role: "Content Creator",\n' +
      '  permissions: ["web_search", "read_docs"],\n' +
      '  tools: ["twitter_api", "canva_plugin"],\n' +
      '  style: "Engaging, Creative, Friendly"\n' +
      '}'
    } />
  </TabItem>
  <TabItem value="secretary" label="👩‍💼 Secretary">
    <CodeBlock language="javascript" children={
      '// Agent trợ lý cá nhân\n' +
      'const Secretary = {\n' +
      '  role: "Personal Assistant",\n' +
      '  permissions: ["calendar", "email"],\n' +
      '  tools: ["gmail", "gcal", "reminders"],\n' +
      '  style: "Polite, Organized, Proactive"\n' +
      '}'
    } />
  </TabItem>
</Tabs>

---

## ⚡ Hiệu năng & Giới hạn

<div className="row">
  <div className="col col--6">
    <Admonition type="success" title="Điểm mạnh (Pros)">
      <ul>
        <li>✅ <strong>File Ops:</strong> Xử lý file tức thì (mili-giây).</li>
        <li>✅ <strong>Memory:</strong> Truy xuất ký ức &lt; 1s.</li>
        <li>✅ <strong>Privacy:</strong> 100% Local-first (trừ API call).</li>
        <li>✅ <strong>Uptime:</strong> Chạy 24/7 ổn định với PM2.</li>
      </ul>
    </Admonition>
  </div>
  <div className="col col--6">
    <Admonition type="warning" title="Hạn chế (Cons)">
      <ul>
        <li>❌ <strong>Reasoning:</strong> Phụ thuộc vào độ thông minh của Model (Claude).</li>
        <li>❌ <strong>Real-time Video:</strong> Chưa hỗ trợ stream video thời gian thực.</li>
        <li>❌ <strong>Heavy Compute:</strong> Không dùng để training AI (chỉ inference/logic).</li>
      </ul>
    </Admonition>
  </div>
</div>

## So sánh nhanh

| Feature | 🦞 Moltbot | 🤖 ChatGPT Web | 🧠 Claude Web |
|---------|------------|---------------|--------------|
| **Self-hosted** | ✅ Yes | ❌ No | ❌ No |
| **Long-term Memory** | ✅ Vector DB | ⚠️ Limited | ⚠️ Limited |
| **File System** | ✅ Direct Access | ❌ Upload only | ❌ Upload only |
| **Proactive** | ✅ Yes | ❌ No | ❌ No |
| **Multi-platform** | ✅ Telegram/Zalo... | ❌ Web/App | ❌ Web |
| **Chi phí API** | 💰 Pay-as-you-go | 💰 $20/mo | 💰 $20/mo |

:::info[Next Steps]
Sẵn sàng trải nghiệm? 👉 [**Cài đặt ngay**](/docs/getting-started/quick-start) hoặc xem [**Advanced Automation**](/docs/advanced/automation).
:::
