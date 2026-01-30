---
sidebar_position: 2
---

# Setup & Onboarding

Các lệnh để cài đặt và cấu hình Moltbot.

## `setup`

Khởi tạo workspace và kết nối Gateway.

```bash
moltbot setup [options]
```

**Options:**
- `--workspace <dir>`: Đường dẫn workspace (default: `~/clawd`)
- `--wizard`: Chạy onboarding wizard sau khi setup
- `--remote-url <url>`: URL gateway remote (nếu dùng client mode)
- `--remote-token <token>`: Auth token cho remote gateway

## `onboard`

Chạy wizard cài đặt tương tác. Đây là cách **tốt nhất** để bắt đầu.

```bash
moltbot onboard [options]
```

**Common Flags:**
- `--reset`: Reset toàn bộ config cũ trước khi chạy
- `--install-daemon`: Cài đặt gateway service chạy nền (systemd/launchd)
- `--no-install-daemon`: Skip cài service
- `--non-interactive`: Chạy tự động không hỏi (cho scripts)

**Auth Config (Non-interactive):**
- `--anthropic-api-key <key>`: Set Anthropic key
- `--openai-api-key <key>`: Set OpenAI key
- `--gateway-port <port>`: Set port (default 18789)

**Ví dụ Quickstart:**
```bash
moltbot onboard
```

**Ví dụ Scripted Install:**
```bash
moltbot onboard \
  --non-interactive \
  --anthropic-api-key "sk-..." \
  --install-daemon
```

## `configure`

Quản lý configuration keys trực tiếp.

```bash
moltbot configure [section]
```

Nếu chạy không tham số, sẽ mở menu tương tác (TUI) để edit config.

## `config`

Low-level config management (get/set commands).

```bash
# Xem giá trị
moltbot config get tools.exec.enabled

# Set giá trị
moltbot config set tools.exec.enabled true
moltbot config set tools.exec.ask "on-miss"

# Unset (xóa)
moltbot config unset tools.exec
```

## `doctor`

Kiểm tra sức khỏe hệ thống và fix lỗi cơ bản.

```bash
moltbot doctor [options]
```

**Checks:**
- Node.js version
- Gateway connection
- Daemon status
- Plugin integrity
- Network connectivity

**Options:**
- `--deep`: Scan sâu hơn (check system services)
- `--yes`: Tự động apply fixes nếu có thể
- `--no-workspace-suggestions`: Tắt gợi ý tối ưu workspace
