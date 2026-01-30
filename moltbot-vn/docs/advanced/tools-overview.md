---
sidebar_position: 1
title: Tổng quan Tools
description: Danh sách 20+ công cụ tích hợp sẵn trong Moltbot (Core Tools). Từ quản lý file, thực thi lệnh đến tìm kiếm web và xử lý hình ảnh.
keywords: [moltbot tools, core capabilities, ai agent tools, web search tool, file system tools]
---

# Tools Overview - Moltbot Capabilities

Moltbot cung cấp **20+ tools** để tương tác với hệ thống, web, và external services.

:::tip[Tại sao Tools quan trọng?]
Tools là "tay chân" của AI - cho phép bot **thực thi hành động thực sự**, không chỉ nói.
:::

## Quick Reference

### Category Overview

| Category | Tools | Use Cases |
|----------|-------|-----------|
| **Filesystem** | `read_file`, `write_file`, `list_dir`, `search_files`, `apply_patch` | Code editing, file management |
| **Execution** | `exec`, `process` | Run commands, scripts, automation |
| **Web** | `web_search`, `web_fetch`, `browser` | Research, scraping, automation |
| **Messaging** | `message`, `sessions_*` | Cross-platform messaging |
| **System** | `canvas`, `image`, `cron`, `gateway` | Visual tools, scheduling, control |

---

## 📁 Filesystem Tools

### `read_file`

**Đọc nội dung file**

```typescript
// Example
{
  "tool": "read_file",
  "path": "/home/user/notes.txt"
}
```

**Parameters:**
- `path` (required): Absolute or relative path
- `encoding` (optional): Default UTF-8

**Use cases:**
- Read logs
- Parse config files
- Analyze code

---

### `write_file`

**Tạo hoặc ghi đè file**

```typescript
{
  "tool": "write_file",
  "path": "./output.txt",
  "content": "Hello World"
}
```

**Parameters:**
- `path` (required)
- `content` (required)
- `mode` (optional): overwrite | append

**Use cases:**
- Save results
- Generate reports
- Create configs

---

### `apply_patch`

**Apply code patches** (diff format)

```typescript
{
  "tool": "apply_patch",
  "file": "./app.js",
  "patch": "--- a/app.js\n+++ b/app.js\n@@ -1,3 +1,4 @@\n..."
}
```

**Use cases:**
- Code refactoring
- Bug fixes
- Version control

**Enable:**
```json
{
  "tools": {
    "exec": {
      "applyPatch": {
        "enabled": true
      }
    }
  }
}
```

---

## ⚙️ Execution Tools

### `exec` (Command Execution)

**Chạy shell commands** - Tool mạnh nhất và nguy hiểm nhất!

```typescript
{
  "tool": "exec",
  "command": "npm install",
  "yieldMs": 10000,
  "background": false
}
```

**Parameters:**
- `command` (required): Shell command
- `yieldMs` (optional): Auto-background timeout (default 10000ms)
- `background` (optional): Run in background immediately
- `timeout` (optional): Kill after N seconds (default 1800)
- `elevated` (optional): Run with elevated permissions
- `host` (optional): `sandbox` | `gateway` | `node`
- `security` (optional): `deny` | `allowlist` | `full`
- `ask` (optional): `off` | `on-miss` | `always`

**Security Modes:**

| Mode | Behavior |
|------|----------|
| `deny` | Block all exec calls |
| `allowlist` | Only allowed commands |
| `full` | Allow everything (⚠️ dangerous) |

**Ask Policies:**

| Policy | When to ask |
|--------|-------------|
| `off` | Never ask (auto-run if allowed) |
| `on-miss` | Ask if not in allowlist |
| `always` | Ask every time |

**Example:**
```bash
# Safe command
{
  "command": "ls -la",
  "security": "allowlist"
}

# Dangerous command (needs approval)
{
  "command": "rm -rf /tmp/cache",
  "ask": "always"
}
```

**Return:**
- Synchronous: stdout/stderr immediately
- Background: `{"status": "running", "sessionId": "xxx"}`

:::danger[SECURITY WARNING]
`exec` có thể **delete files, install malware, steal data**.

**LUÔN LUÔN:**
- Set `ask: "always"` nếu không chắc
- Use `security: "allowlist"`
- Review commands trước khi approve
- Run trong sandbox nếu có thể

Chi tiết: [Exec Security Guide](/docs/advanced/exec-security)
:::

---

### `process` (Background Process Management)

**Quản lý background processes** từ `exec`

**Operations:**
- `list`: List all background processes
- `poll`: Check status + new output
- `log`: Get full logs (với offset/limit)
- `write`: Send stdin
- `kill`: Terminate process
- `clear`: Remove from list
- `remove`: Force delete

**Example:**
```typescript
// Start background
exec({ command: "npm start", background: true })
// Returns: { sessionId: "abc123" }

// Poll status
process({ action: "poll", sessionId: "abc123" })
// Returns: { status: "running", newOutput: "..." }

// Get logs
process({ action: "log", sessionId: "abc123", offset: 0, limit: 100 })

// Kill
process({ action: "kill", sessionId: "abc123" })
```

**Use cases:**
- Long-running scripts
- Dev servers
- Build processes
- Monitoring

**Scope:** Per-agent isolation - mỗi agent chỉ thấy processes của mình

---

## 🌐 Web Tools

### `web_search` (Brave Search)

**Tìm kiếm web** qua Brave API

```typescript
{
  "tool": "web_search",
  "query": "moltbot github",
  "count": 5
}
```

**Parameters:**
- `query` (required)
- `count` (optional): 1-10, default từ `tools.web.search.maxResults`

**Requirements:**
- Brave API key: `BRAVE_API_KEY` env var
- Enable: `tools.web.search.enabled: true`
- Free tier: 2,000 queries/month

**Setup:**
```bash
moltbot configure --section web
# Hoặc
export BRAVE_API_KEY="your-key"
```

**Cache:** 15 minutes default

---

### `web_fetch` (URL Scraping)

**Fetch và extract content** từ URLs

```typescript
{
  "tool": "web_fetch",
  "url": "https://example.com",
  "extractMode": "markdown",
  "maxChars": 50000
}
```

**Parameters:**
- `url` (required)
- `extractMode` (optional): `markdown` | `text`
- `maxChars` (optional): Truncate long pages

**Use cases:**
- Scrape documentation
- Parse articles
- Extract data

**Limitations:**
- No JavaScript execution (use `browser` for JS-heavy sites)
- Cache: 15 minutes
- Check robots.txt compliance

**Enable:**
```json
{
  "tools": {
    "web": {
      "fetch": {
        "enabled": true
      }
    }
  }
}
```

---

### `browser` (Browser Automation)

**Control real browser** (Playwright/Puppeteer)

```typescript
{
  "tool": "browser",
  "action": "navigate",
  "url": "https://example.com"
}
```

**Actions:**
- `navigate`: Go to URL
- `click`: Click element
- `type`: Type text
- `screenshot`: Capture page
- `evaluate`: Run JavaScript

**Use cases:**
- Test web apps
- Automate forms
- Scrape JS sites
- Take screenshots

**Requirements:**
- Browser binary (Chrome/Chromium)
- Enable: `browser.enabled: true`

:::warning
Browser automation tốn resources. Recommend chạy trên node riêng, không phải gateway.
:::

---

## 💬 Messaging Tools

### `message` (Cross-Platform Send)

**Gửi messages** qua bất kỳ channel nào

```typescript
{
  "tool": "message",
  "target": "+84987654321",  // Phone or user ID
  "message": "Hello from Moltbot!",
  "channel": "whatsapp"
}
```

**Parameters:**
- `target` (required): Phone number, user ID, or chat ID
- `message` (required): Text content
- `channel` (optional): Auto-detect if omitted
- `media` (optional): URLs or paths

**Supported targets:**
- Phone: `+84987654321` (WhatsApp, Zalo)
- Telegram: `@username` or chat ID
- Discord: User ID or channel ID

**Use cases:**
- Notifications
- Scheduled messages (với cron)
- Cross-platform forwarding

---

### `sessions_*` (Session Management)

**Quản lý chat sessions**

**Tools:**
- `sessions_list`: List all sessions
- `sessions_history`: Get message history
- `sessions_send`: Send to session
- `sessions_spawn`: Create new session
- `session_status`: Check session state

**Example:**
```typescript
// List sessions
sessions_list({ channel: "telegram" })

// Get history
sessions_history({ sessionId: "abc", limit: 50 })

// Send
sessions_send({ sessionId: "abc", message: "Hi!" })
```

---

## 🎨 System Tools

### `canvas` (Visual Tools)

**Create visual content** - charts, diagrams, UI mockups

```typescript
{
  "tool": "canvas",
  "type": "chart",
  "data": {...}
}
```

**Supports:**
- Charts (bar, line, pie)
- Diagrams (flowchart, mermaid)
- UI previews

**Output:** Hosted on `canvasHost` (port 18793)

---

### `image` (Image Operations)

**Image processing**

```typescript
{
  "tool": "image",
  "action": "resize",
  "path": "./photo.jpg",
  "width": 800
}
```

**Actions:**
- `resize`: Scale images
- `crop`: Cut sections
- `convert`: Change format
- `optimize`: Compress

---

### `cron` (Scheduler)

**Schedule recurring tasks**

```typescript
{
  "tool": "cron",
  "schedule": "0 9 * * *",  // Every 9am
  "command": "moltbot message send --target me --message 'Good morning!'"
}
```

**Format:** Standard cron syntax
- `* * * * *` = minute hour day month weekday
- `0 9 * * *` = 9:00 AM daily
- `*/15 * * * *` = Every 15 minutes

**Use cases:**
- Daily reports
- Reminders
- Backups
- Health checks

---

### `gateway` (Gateway Control)

**Control Gateway** via RPC

```typescript
{
  "tool": "gateway",
  "action": "restart"
}
```

**Actions:**
- `status`: Check health
- `restart`: Reload config
- `logs`: Get gateway logs
- `config`: View/update config

**Scope:** Admin only

---

## 🔒 Tool Security

### Per-Agent Tool Control

Mỗi agent có thể có tool permissions riêng:

```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "tools": {
          "allowed": ["read_file", "web_search", "message"],
          "denied": ["exec", "browser"]
        }
      },
      {
        "id": "admin",
        "tools": {
          "allowed": "*",
          "elevated": true
        }
      }
    ]
  }
}
```

### Tool Profiles

**Base allowlist** để share across agents:

```json
{
  "tools": {
    "profiles": {
      "readonly": ["read_file", "list_dir", "web_search"],
      "safe": ["read_file", "write_file", "web_search", "message"],
      "full": "*"
    }
  },
  "agents": {
    "list": [
      {
        "id": "helper",
        "tools": {
          "profile": "safe"
        }
      }
    ]
  }
}
```

### Disabling Tools

```json
{
  "tools": {
    "exec": {
      "enabled": false  // Disable tất cả exec
    },
    "browser": {
      "enabled": false
    }
  }
}
```

---

## 🚀 Best Practices

### 1. Start Safe

**Mới bắt đầu:**
```json
{
  "tools": {
    "exec": {
      "security": "allowlist",
      "ask": "always"
    }
  }
}
```

**Khi đã quen:**
```json
{
  "tools": {
    "exec": {
      "security": "allowlist",
      "ask": "on-miss",
      "allowlist": [
        "npm install",
        "git status",
        "ls -la"
      ]
    }
  }
}
```

### 2. Sandbox Unknown Agents

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "enabled": true,
        "workspace": "/sandbox"
      }
    }
  }
}
```

### 3. Monitor Tool Usage

```bash
# Check logs
moltbot logs --filter tools --follow

# Audit
moltbot security audit --deep
```

### 4. Rate Limiting

```json
{
  "tools": {
    "web": {
      "search": {
        "rateLimit": {
          "requests": 10,
          "perMinutes": 1
        }
      }
    }
  }
}
```

---

## 📚 Next Steps

- [Exec Security Deep Dive](/docs/advanced/exec-security)
- [Browser Automation Guide](/docs/advanced/browser)
- [Cron & Scheduling](/docs/advanced/cron)
- [Custom Tool Development (Đang cập nhật)](#)

---

## ❓ FAQ

<details>
<summary><b>Làm sao biết agent đang dùng tool nào?</b></summary>

```bash
moltbot logs --filter tools --follow
```

Hoặc check trong dashboard: `http://localhost:18789`

</details>

<details>
<summary><b>Tool bị disable, làm sao enable?</b></summary>

```bash
moltbot configure
# Navigate to tools section → enable tool
```

Hoặc edit `~/.clawdbot/moltbot.json`:
```json
{
  "tools": {
    "exec": {
      "enabled": true
    }
  }
}
```

</details>

<details>
<summary><b>exec tool không chạy, báo "denied"?</b></summary>

Check security settings:

```bash
moltbot config get tools.exec
```

Likely: `security: "deny"` hoặc `enabled: false`

Fix:
```bash
moltbot configure --section tools --set exec.enabled=true
moltbot configure --section tools --set exec.security=allowlist
```

</details>

---

_Cần help? [Discord #tools](https://discord.gg/moltbot-vn) | [Telegram](https://t.me/moltbotvn)_
