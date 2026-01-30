---
sidebar_position: 2
title: Yêu cầu hệ thống (System Req)
description: Cấu hình phần cứng và phần mềm yêu cầu để chạy Moltbot. Node.js v22+, Docker, RAM tối thiểu và các API Keys cần thiết (Claude, Brave).
keywords: [moltbot requirements, cấu hình tối thiểu, nodejs 22, api keys setup, vps requirements]
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# System Requirements

Trước khi cài đặt Moltbot, đảm bảo hệ thống của bạn đáp ứng các tiêu chuẩn sau đây để đảm bảo hiệu suất tốt nhất và an toàn.

## 💻 Hệ điều hành

<Tabs defaultValue="macos" values={[
  {label: '🍎 macOS', value: 'macos'},
  {label: '🐧 Linux', value: 'linux'},
  {label: '🪟 Windows', value: 'windows'},
]}>
  <TabItem value="macos">
    <div className="card shadow--md margin-bottom--md">
      <div className="card__body">
        <h4>Version 12.0+ (Monterey)</h4>
        <p>✅ <strong>Cực kỳ khuyên dùng</strong> cho người mới bắt đầu.</p>
        <p>Môi trường Unix-based native hỗ trợ tốt nhất cho development tools mà không cần config phức tạp.</p>
      </div>
    </div>
  </TabItem>
  <TabItem value="linux">
    <div className="card shadow--md margin-bottom--md">
      <div className="card__body">
        <h4>Ubuntu 20.04+, Debian 11+</h4>
        <p>✅ <strong>Tốt nhất cho Production/Server</strong>.</p>
        <p>Hiệu năng cao nhất, không có overhead của GUI. Khuyên dùng cho VPS (DigitalOcean, Hetzner).</p>
      </div>
    </div>
  </TabItem>
  <TabItem value="windows">
    <div className="card shadow--md margin-bottom--md">
      <div className="card__body">
        <h4>Yêu cầu WSL2</h4>
        <p>✅ Chạy qua <strong>Windows Subsystem for Linux (Ubuntu)</strong>.</p>
        <p><strong>Lưu ý:</strong> Không hỗ trợ PowerShell/CMD native. Bạn <em>bắt buộc</em> phải cài WSL2 để chạy Gateway.</p>
      </div>
    </div>
  </TabItem>
</Tabs>


### ⚠️ Hỗ trợ thử nghiệm
*   **Raspberry Pi OS (ARM64)**
*   **Arch Linux**
*   **Fedora 35+**


---

## ⚙️ Phần cứng

### Tối thiểu (Testing only):

- **CPU:** Dual-core 2GHz+
- **RAM:** 2GB
- **Disk:** 5GB free space
- **Network:** Stable internet connection

### Khuyến nghị (Production):

- **CPU:** Quad-core 2.5GHz+
- **RAM:** 4GB+ (8GB ideal)
- **Disk:** 20GB+ SSD
- **Network:** 10Mbps+ stable

:::tip[Gợi ý VPS]
Nếu chạy trên VPS:
- **DigitalOcean:** Droplet $6/month (2GB RAM)
- **Vultr:** Cloud Compute $6/month
- **Hetzner:** CX21 €5.83/month (4GB RAM) - Tốt nhất trong tầm giá
:::

---

## 🛠️ Phần mềm yêu cầu

### 1. Node.js

**Version:** ≥ 22.x (STRICT REQUIREMENT - không optional!)

**Check version hiện tại:**
```bash
node --version
npm --version
```

:::danger[CRITICAL]
Moltbot **KHÔNG CHẠY** với Node < 22. 

Reasons:
- Native Fetch API required
- Modern ES modules
- Performance improvements

Nếu bạn có Node 18/20, **BẮT BUỘC phải upgrade** lên 22+
:::

**Cài đặt Node.js 22:**

<details>
<summary><b>Ubuntu/Debian</b></summary>

```bash
# Dùng NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # v22.x.x
npm --version   # 10.x.x
```
</details>

<details>
<summary><b>macOS</b></summary>

```bash
# Option 1: Homebrew (khuyên dùng)
brew install node@22
brew link node@22

# Option 2: NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```
</details>

<details>
<summary><b>Windows (WSL2)</b></summary>

- Cài WSL2 trước: [Microsoft Guide](https://learn.microsoft.com/en-us/windows/wsl/install)
- Trong WSL terminal, follow hướng dẫn Ubuntu ở trên

</details>

### 2. Git (Optional nhưng khuyên dùng)

```bash
# Ubuntu/Debian
sudo apt-get install git

# macOS
brew install git

# Verify
git --version
```

### 3. Build Tools

**Linux:**
```bash
sudo apt-get install build-essential python3
```

**macOS:**
```bash
xcode-select --install
```

**Windows (WSL2):**
```bash
sudo apt-get install build-essential
```

### 4. Brave Search API Key (Optional nhưng khuyên dùng)

**For:** Web search tool (`web_search`)

**Lấy API key:**
1. Đăng ký tại: https://brave.com/search/api/
2. Free tier: 2,000 queries/month
3. Configure: `moltbot configure --section web`

**Lưu ở đâu:**
```bash
# Via environment variable
export BRAVE_API_KEY="your-key-here"

# Or via wizard khi setup
moltbot onboard
```

:::tip
Không có Brave API key vẫn dùng được Moltbot, chỉ thiếu web search feature.
:::

---

## 🔑 API Keys cần thiết

### 1. Anthropic Claude API (BẮT BUỘC)

Moltbot sử dụng Claude để suy luận AI.

**Lấy API key:**
1. Đăng ký tại: https://console.anthropic.com
2. Verify email và thêm payment method
3. Tạo API key: Settings → API Keys → Create Key
4. Copy và lưu an toàn

**Giá:**
- Pay-as-you-go (trả theo sử dụng)
- Claude 3.5 Sonnet: ~$3-15/1M tokens
- Ước tính: $10-50/tháng cho usage thông thường

:::warning[Bảo mật API Key]
- **KHÔNG** commit API key vào Git
- **KHÔNG** chia sẻ key với người khác
- Lưu trong environment variables hoặc secret manager
:::

### 2. Channel-specific Keys (OPTIONAL)

Tùy vào platform bạn muốn kết nối:

| Platform | Cần gì | Lấy ở đâu |
|----------|--------|-----------|
| **Telegram** | Bot Token | [@BotFather](https://t.me/BotFather) |
| **Discord** | Bot Token + Application ID | [Discord Developer Portal](https://discord.com/developers/applications) |
| **Slack** | Bot Token + App Token | [Slack API](https://api.slack.com/apps) |
| **WhatsApp** | ❌ (QR scan) | N/A |
| **Google Chat** | Service Account | [Google Cloud Console](https://console.cloud.google.com) |

---

## 🌐 Network Requirements

### Ports cần mở:

| Port | Purpose | Required |
|------|---------|----------|
| **18789** | Gateway WebSocket | ✅ Yes |
| **18793** | Canvas file server | Optional (for nodes) |
| **443** | HTTPS API calls | ✅ Yes |
| **80** | HTTP redirects | Optional |

**Notes:**
- Port 18789: Gateway WS endpoint (`ws://127.0.0.1:18789`)
- Port 18793: HTTP server cho Canvas UI (default `canvasHost.port`)
- Cả 2 ports đều bind localhost by default (secure)

### Firewall Rules:

**Outbound (Required):**
```bash
# Cho phép kết nối đến:
- api.anthropic.com (Claude API)
- api.telegram.org (nếu dùng Telegram)
- discord.com (nếu dùng Discord)
```

**Inbound (Optional):**
```bash
# Chỉ cần nếu muốn access dashboard từ remote
- Port 18789 (hoặc custom port)
```

:::danger[Security]
**ĐỪNG** expose port 18789 ra public Internet!

Nếu cần remote access:
- Dùng VPN (Tailscale, WireGuard)
- SSH tunnel: `ssh -L 18789:localhost:18789 user@server`
- Nginx reverse proxy với authentication
:::

---

## 📦 Disk Space Planning

### Breakdown:

```
Moltbot installation:     ~500MB
Node modules:             ~200MB
Conversation history:     ~50MB/1000 messages
Vector database:          ~100MB/10k messages
Logs:                     ~10MB/week
Plugins:                  Varies

Total recommended:        5GB+ (20GB for production)
```

### Auto-cleanup:

```bash
# Set log rotation
moltbot config set logs.maxSize 100MB
moltbot config set logs.maxAge 30d

# Vector DB cleanup
moltbot config set memory.retention 90d
```

---

## 🔒 Security Considerations

### Môi trường cài đặt:

❌ **ĐỪNG CÀI TRÊN:**
- Máy chính làm việc
- Máy có dữ liệu quan trọng
- Server production có data nhạy cảm

✅ **NÊN CÀI TRÊN:**
- Máy ảo riêng (VM)
- VPS dedicated cho Moltbot
- Docker container với volume isolation
- Raspberry Pi riêng

### Isolation:

```bash
# Tạo user riêng
sudo useradd -m -s /bin/bash moltbot
sudo su - moltbot

# Giới hạn permissions
chmod 700 ~/.moltbot
umask 077
```

---

## ✅ Readiness Checklist

Trước khi bắt đầu cài đặt, check:

- [ ] Node.js ≥ 22.x installed
- [ ] npm ≥ 10.x installed
- [ ] Git installed (optional)
- [ ] Build tools installed
- [ ] Anthropic API key ready
- [ ] Môi trường isolated (VM/VPS)
- [ ] Minimum 5GB disk space
- [ ] Stable internet connection
- [ ] Đã đọc [Security Alerts](/security)

---

## 🚀 Sẵn sàng cài đặt?

Chọn phương pháp cài đặt phù hợp:

1. **[Quick Start](/docs/getting-started/quick-start)** - Cài trong 5 phút (khuyên dùng cho mới)
2. **[Docker Installation](/docs/deployment/docker)** - Isolated, dễ manage
3. **[Production Deployment](/docs/deployment/production)** - Full control

---

## ❓ Câu hỏi thường gặp

<details>
<summary><b>Tôi có thể dùng Node.js 18 không?</b></summary>

Không khuyến khích. Moltbot cần Node 22+ cho:

- Native Fetch API
- Modern ES modules
- Performance improvements

Một số features có thể không hoạt động với Node 18.

</details>

<details>
<summary><b>RAM 2GB có đủ không?</b></summary>

Đủ cho testing, nhưng:

- Limit số conversations đồng thời
- Memory có thể bị full nếu nhiều plugins
- Recommend 4GB+ cho stable

</details>

<details>
<summary><b>Có cần GPU không?</b></summary>

**KHÔNG.** Moltbot dùng API cloud (Anthropic), không chạy model local.

GPU chỉ cần nếu bạn muốn:

- Run local LLM (advanced)
- Image/video processing intensive

</details>

<details>
<summary><b>Windows native có được không?</b></summary>

Hiện tại **chỉ qua WSL2**. Native Windows support đang được phát triển.

WSL2 performance rất tốt, gần như native Linux.
</details>

---

_Còn thắc mắc? Hỏi trong [Discord #support](https://discord.gg/moltbot-vn)_
