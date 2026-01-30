---
sidebar_position: 1
title: Bắt đầu nhanh (5 phút)
description: Hướng dẫn cài đặt Moltbot (Clawdbot) chỉ trong 5 phút. Hỗ trợ Windows (WSL2), macOS và Linux. Tự động hóa AI Agent đầu tiên của bạn ngay hôm nay.
keywords: [cài đặt moltbot, hướng dẫn sử dụng moltbot, moltbot quick start, setup ai agent]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# 🚀 Bắt đầu nhanh (5 phút)

Bắt đầu với Moltbot trong vòng 5 phút! Hướng dẫn này sẽ giúp bạn cài đặt và chạy bot đầu tiên của mình.

<Admonition type="danger" title="ĐỌC KỸ TRƯỚC KHI BẮT ĐẦU">
  <ul>
    <li><strong>An toàn là trên hết</strong>: Đảm bảo bạn đã đọc <a href="/security">Security Alerts</a>.</li>
    <li><strong>Môi trường</strong>: Chỉ cài trên <strong>máy ảo (VM)</strong> hoặc <strong>VPS riêng</strong>. Không dùng máy tính làm việc chính để test.</li>
    <li><strong>Thông tin xác thực</strong>: Không sử dụng mật khẩu/API key môi trường production.</li>
  </ul>
</Admonition>

## 🛠️ Chuẩn bị

### Yêu cầu tối thiểu
*   **OS**: macOS, Linux, hoặc Windows (WSL2)
*   **Runtime**: Node.js **v22.x** trở lên
*   **Memory**: 2GB RAM (4GB Recommended)
*   **Key**: Anthropic Claude API Key

:::tip[Check Node version]
```bash
node --version  # Should be v22.x or higher
npm --version
```
Nếu chưa có Node 22, xem [Cài đặt Node.js](#appendix-cài-đặt-nodejs)
:::

---

## Bước 1: Cài đặt Moltbot CLI

<Tabs groupId="install-method">
  <TabItem value="script" label="📜 Install Script (Khuyên dùng)" default>
    <p>Cách nhanh nhất để cài đặt Moltbot với official script.</p>
    
    <Tabs groupId="os">
      <TabItem value="unix" label="🐧 Unix/Linux/macOS" default>
        ```bash
        curl -fsSL https://molt.bot/install.sh | bash
        ```
      </TabItem>
      <TabItem value="win" label="🪟 Windows (PowerShell)">
        ```powershell
        iwr -useb https://molt.bot/install.ps1 | iex
        ```
      </TabItem>
    </Tabs>

    <Admonition type="info" title="Tại sao dùng install script?">
      <ul>
        <li>Auto-detect platform</li>
        <li>Install đúng version</li>
        <li>Setup PATH automatically</li>
        <li>Nhanh hơn npm</li>
      </ul>
    </Admonition>
  </TabItem>
  <TabItem value="npm" label="📦 NPM Global">
    <p>Cài đặt thông qua Node Package Manager.</p>

    ```bash
    npm install -g moltbot@latest
    # or
    pnpm add -g moltbot@latest
    ```
  </TabItem>
</Tabs>

**Kiểm tra cài đặt:**
```bash
moltbot --version
```

---

## Bước 2: Onboarding (Thiết lập ban đầu)

Chạy trình hướng dẫn tự động:

```bash
moltbot onboard --install-daemon
```

**Điều này sẽ:**
- ✅ Tạo cấu trúc thư mục cho Moltbot
- ✅ Yêu cầu bạn nhập API key (Anthropic)
- ✅ Setup daemon process
- ✅ Tạo config files

:::info[Lấy API key]
1. Đăng ký tại [console.anthropic.com](https://console.anthropic.com)
2. Tạo API key trong Settings
3. Copy và paste khi được hỏi
4. **Lưu ý:** Bạn sẽ trả theo usage (pay-as-you-go)
:::

---

## Bước 3: Khởi động Gateway

Gateway là trung tâm điều khiển của Moltbot:

```bash
moltbot gateway --port 18789
```

**Output mong đợi:**
```
✓ Gateway started at http://localhost:18789
✓ Dashboard available at http://localhost:18789/dashboard
✓ Ready to accept connections
```

<Admonition type="tip" title="Chạy nền (Background Mode)">
  <Tabs groupId="process-manager">
    <TabItem value="nohup" label="Standard (nohup)" default>
      ```bash
      # Linux/macOS
      nohup moltbot gateway --port 18789 &
      ```
    </TabItem>
    <TabItem value="pm2" label="PM2 (Khuyên dùng)">
      ```bash
      npm install -g pm2
      pm2 start moltbot -- gateway --port 18789
      pm2 save
      ```
    </TabItem>
  </Tabs>
</Admonition>

---

## Bước 4: Kết nối kênh chat

<Tabs groupId="chat-channels">
  <TabItem value="telegram" label="🔵 Telegram" default>
    <p>Đơn giản nhất, setup trong 1 phút.</p>
    
    ```bash
    moltbot channels login telegram
    ```
    
    **Hướng dẫn:**
    1. Tạo bot mới qua [@BotFather](https://t.me/BotFather)
    2. Gửi `/newbot` và làm theo hướng dẫn
    3. Copy bot token
    4. Paste vào Moltbot CLI
  </TabItem>
  <TabItem value="whatsapp" label="🟢 WhatsApp">
    <p>Quét QR code để đăng nhập.</p>

    ```bash
    moltbot channels login whatsapp
    ```
    
    **QR code sẽ hiện ra** → Quét bằng WhatsApp trên điện thoại
  </TabItem>
  <TabItem value="discord" label="🟣 Discord">
    <p>Dành cho cộng đồng/server.</p>

    ```bash
    moltbot channels login discord
    ```
    
    Cần Discord bot token - xem [Discord Bot Setup Guide](/docs/installation/discord-setup)
  </TabItem>
</Tabs>

---

## Bước 5: Thử nghiệm đầu tiên

<Tabs groupId="test-method">
  <TabItem value="cli" label="Terminal / CLI" default>
    ```bash
    moltbot chat
    ```
    
    **Gõ thử:**
    ```
    You: Xin chào! Bạn là ai?
    Bot: Chào bạn! Tôi là trợ lý AI chạy trên máy của bạn...
    ```
  </TabItem>
  <TabItem value="chat-app" label="Telegram / WhatsApp">
    **Gửi tin nhắn cho bot:**
    ```
    Xin chào!
    ```
    
    Bot sẽ trả lời ngay!
  </TabItem>
</Tabs>

---

## Bước 6: Thử tính năng thực tế

### File Management
```
Bạn: Liệt kê 5 file mới nhất trong thư mục Downloads của tôi
```
Bot sẽ:
1. Truy cập thư mục Downloads
2. List files
3. Gửi lại kết quả

### Calendar Check (nếu đã setup)
```
Bạn: Hôm nay lịch của tôi có gì?
```

### Web Search
```
Bạn: Tìm tin tức mới nhất về AI agents
```

---

## Dashboard Web

Mở browser và truy cập: `http://localhost:18789/dashboard`

- 📊 **Sessions:** Các cuộc hội thoại active
- 🔌 **Channels:** Kênh đã kết nối
- 📝 **Logs:** Real-time logs
- ⚙️ **Settings:** Cấu hình

---

## Troubleshooting nhanh

<details>
  <summary>Gateway không start được</summary>
  
  Check port có bị chiếm không:
  ```bash
  netstat -tuln | grep 18789
  ```
  
  Hoặc dùng port khác:
  ```bash
  moltbot gateway --port 19000
  ```
</details>

<details>
  <summary>Chat không phản hồi</summary>
  
  1. Check gateway đang chạy: `ps aux | grep moltbot`
  2. Check logs: `moltbot logs`
  3. Verify API key still valid
</details>

<details>
  <summary>"Permission denied" errors</summary>
  
  Cấp quyền cho CLI:
  ```bash
  chmod +x $(which moltbot)
  ```
</details>

---

## Next Steps

🎉 **Chúc mừng!** Bạn đã có Moltbot chạy được rồi!

### Tiếp theo nên làm:
1. **Đọc [Core Concepts](/docs/core-concepts/architecture)** - Hiểu cách Moltbot hoạt động
2. **Setup [Advanced Features](/docs/advanced/plugins)** - Plugins, hooks, automation
3. **Xem [Use Cases](/showcase)** - Học từ cộng đồng
4. **Bảo mật:** Đọc kỹ [Security Best Practices](/docs/security/best-practices)

### Join cộng đồng:
- 💬 [Discord](https://discord.gg/moltbot-vn)
- 📱 [Telegram Group](https://t.me/moltbotvn)
- 📘 [Facebook Group](https://facebook.com/groups/moltbotvn)

---

## Appendix: Cài đặt Node.js

<Tabs groupId="nodejs-os">
  <TabItem value="ubuntu" label="Ubuntu/Debian" default>
    ```bash
    # Dùng NodeSource
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Verify
    node --version  # v22.x
    ```
  </TabItem>
  <TabItem value="macos" label="macOS">
    ```bash
    # Dùng Homebrew
    brew install node@22
    ```
  </TabItem>
  <TabItem value="windows" label="Windows (WSL2)">
    Làm theo hướng dẫn Ubuntu ở trên trong WSL terminal.
  </TabItem>
</Tabs>

:::tip[Pro Tips]
- Setup PM2 để auto-restart gateway khi server reboot
- Dùng tmux/screen để chạy gateway trong background
- Backup config folder định kỳ
- Monitor API usage trên Anthropic dashboard
:::
