---
sidebar_position: 1
title: Pairing & Trust Model
description: Mô hình bảo mật Pairing của Moltbot. Ngăn chặn truy cập trái phép bằng quy trình xác thực người dùng và phân quyền (Trust Model).
keywords: [moltbot pairing, bảo mật ai agent, trust model, xác thực người dùng, pairing flow]
---

# Pairing & Trust Model

Moltbot sử dụng **pairing system** để bảo vệ DMs khỏi unauthorized access.

## Tại sao cần Pairing?

:::danger[Vấn đề: Open DM Bot]
**Không có pairing:**
- Ai cũng có thể chat với bot
- Prompt injection attacks
- Data leakage
- Resource abuse
- Command execution từ strangers

**Với pairing:**
- ✅ Chỉ approved users
- ✅ User identity verified
- ✅ Per-user permissions
- ✅ Audit trail
:::

---

## DM Access Modes

### 1. `pairing` (Default, Recommended)

**User phải được approve** trước khi chat

```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "pairing"
    }
  }
}
```

**Flow:**
```
User: "Hello bot"
Bot: "👋 I don't know you yet. Please pair first."
     
     "Send: /pair"

User: "/pair"
Bot: "Pairing request sent to admin."

[Admin approves in dashboard]

Bot: "✅ Paired! You can chat now."
User: "Hello bot"
Bot: "Hi! How can I help?"
```

**Best for:**
- Personal bots
- Family/friend usage
- Controlled access

---

### 2. `allowlist`

**Chỉ specific users** trong whitelist

```json
{
  "channels": {
    "telegram": {
      "dmPolicy": "allowlist",
      "allowFrom": [
        "@username",
        "123456789",  // User ID
        "+84987654321"  // Phone (WhatsApp)
      ]
    }
  }
}
```

**Flow:**
```
Allowed User: "Hello"
Bot: "Hi! How can I help?"

Unknown User: "Hello"
Bot: [No response]
```

**Best for:**
- Known user set
- Business bots (specific clients)
- Team automation

---

### 3. `open` (⚠️ Dangerous)

**Ai cũng chat được** - NO PROTECTION!

```json
{
  "channels": {
    "telegram": {
      "dmPolicy": "open"
    }
  }
}
```

:::danger[ONLY USE IF]
- Public service bot (read-only info)
- No sensitive data
- No exec/write tools enabled
- Sandbox enforced
- Rate limited

**NEVER** use for:
- Personal bots
- Bots với exec access
- Bots có sensitive data
:::

---

### 4. `disabled`

**Tắt DM hoàn toàn**

```json
{
  "channels": {
    "discord": {
      "dmPolicy": "disabled"
    }
  }
}
```

**Only group chat** - không nhận DMs

---

## Pairing Flow Deep Dive

### Step 1: Request

User send `/pair` command:

```
User → Bot: /pair
```

### Step 2: Validation

Bot checks:
- ✅ User not already paired
- ✅ User not blocked
- ✅ Channel allows pairing

### Step 3: Approval Request

Bot forwards to admin:

**Via Telegram:**
```
🔔 Pairing Request

From: John Doe (@johndoe)
Platform: WhatsApp
Phone: +84987654321
First message: "Hello, I'm John"

Reply:
/approve pair_abc123
/deny pair_abc123
/block +84987654321
```

**Via Dashboard:**
```
http://localhost:18789/approvals

Pending Pairing Requests:
┌─────────────────────────────────────┐
│ John Doe                            │
│ @johndoe                            │
│ WhatsApp: +84987654321              │
│                                     │
│ [Approve] [Deny] [Block]           │
└─────────────────────────────────────┘
```

### Step 4: Approval

Admin clicks **Approve** or replies `/approve pair_abc123`

### Step 5: Notification

```
Bot → User: ✅ Paired successfully!
              You can now chat with me.
```

### Step 6: Session Created

Bot creates user session with:
- User ID
- Platform
- Permissions
- Timestamp

---

## Multi-User Isolation

**Mỗi user có session riêng:**

```json
{
  "sessions": {
    "whatsapp:+84123456789": {
      "userId": "+84123456789",
      "platform": "whatsapp",
      "agent": "main",
      "permissions": ["read", "write"],
      "workspace": "/users/84123456789",
      "paired": true,
      "pairedAt": "2026-01-30T10:00:00Z"
    },
    "telegram:@user2": {
      "userId": "@user2",
      "platform": "telegram",
      "agent": "readonly",
      "permissions": ["read"],
      "paired": true
    }
  }
}
```

**Isolation guarantees:**
- User A không thấy data của User B
- Separate conversation history
- Different agent assignments
- Per-user tool permissions

---

## Agent Routing

**Route users to different agents:**

```json
{
  "agents": {
    "bindings": {
      "whatsapp:+84123456789": "admin",
      "telegram:@user2": "readonly",
      "telegram:@developer": "dev-helper",
      "*": "default"  // Fallback
    }
  }
}
```

**Agent capabilities:**

```json
{
  "agents": {
    "list": [
      {
        "id": "admin",
        "tools": {
          "allowed": "*",
          "elevated": true
        }
      },
      {
        "id": "readonly",
        "tools": {
          "allowed": ["read_file", "web_search"],
          "denied": ["exec", "write_file"]
        }
      },
      {
        "id": "dev-helper",
        "tools": {
          "allowed": ["exec", "read_file", "write_file"],
          "exec": {
            "security": "allowlist",
            "allowlist": ["git *", "npm *"]
          }
        }
      }
    ]
  }
}
```

---

## Group Chat Control

### Mention Gating

**Require @ mention** để bot respond:

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "*": {
          "requireMention": true,
          "mentionPatterns": ["@bot", "@moltbot"]
        }
      }
    }
  }
}
```

**Behavior:**
```
User: "What's the weather?"
Bot: [No response - not mentioned]

User: "@bot what's the weather?"
Bot: "Current weather in Hanoi: 25°C..."
```

### Per-Group Config

```json
{
  "groups": {
    "group_id_abc": {
      "requireMention": false,  // Always listen
      "allowedCommands": ["weather", "news"],
      "deniedCommands": ["exec", "deploy"]
    },
    "group_id_xyz": {
      "requireMention": true,
      "maxMessagesPerHour": 10  // Rate limit
    }
  }
}
```

---

## Trust Hierarchy

```
┌─────────────────────────┐
│   Owner (You)           │  Full access
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Paired Users          │  Trusted, approved
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Allowlist Users       │  Pre-approved
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Unknown Users         │  Require pairing
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Blocked Users         │  Banned
└─────────────────────────┘
```

---

## Security Best Practices

### 1. Always Use Pairing

**Default config:**
```json
{
  "channels": {
    "*": {
      "dmPolicy": "pairing"
    }
  }
}
```

### 2. Review Pairing Requests

**Don't auto-approve!** Review:
- Who is requesting?
- From where?
- First message context
- Platform verified?

### 3. Separate Public/Private

```json
{
  "agents": {
    "list": [
      {
        "id": "private",
        "dmPolicy": "pairing"
      },
      {
        "id": "public",
        "dmPolicy": "open",
        "tools": {
          "allowed": ["read_file"],
          "denied": ["exec", "write_file"]
        }
      }
    ]
  }
}
```

### 4. Monitor Paired Users

```bash
# List paired users
moltbot users list --paired

# Audit activity
moltbot audit --user "+84987654321" --since "1 week"

# Unpair suspicious user
moltbot users unpair "+84987654321"
```

### 5. Block Malicious Users

```bash
# Block user
moltbot users block "+84999999999"

# Unblock
moltbot users unblock "+84999999999"

# View blocklist
moltbot users list --blocked
```

---

## Advanced Features

### Time-Limited Pairing

**Auto-unpair after duration:**

```json
{
  "pairing": {
    "ttl": 2592000000,  // 30 days in ms
    "renewalRequired": true
  }
}
```

User must re-pair every 30 days.

### Approval Delegation

**Multiple admins:**

```json
{
  "pairing": {
    "approvers": [
      "telegram:@admin1",
      "whatsapp:+84111111111"
    ],
    "requiredApprovals": 1  // Or 2 for dual approval
  }
}
```

### Auto-Pairing for Domains

**Auto-approve company emails:**

```json
{
  "pairing": {
    "autoApprove": {
      "emailDomains": ["@company.com"],
      "phonePatterns": ["+8498*"]
    }
  }
}
```

---

## Troubleshooting

### User Can't Pair

**Symptoms:**
```
User: /pair
Bot: [No response]
```

**Check:**
```bash
# Is pairing enabled?
moltbot config get channels.whatsapp.dmPolicy

# Is user blocked?
moltbot users list --blocked | grep +84987654321

# Check logs
moltbot logs --filter pairing
```

### Pairing Stuck

**User requested but no approval prompt:**

```bash
# Check pending requests
moltbot pairing pending

# Force approval
moltbot pairing approve +84987654321
```

### Paired But Can't Chat

**User paired nhưng bot không respond:**

```bash
# Check session
moltbot sessions show whatsapp:+84987654321

# Check agent assignment
moltbot users show +84987654321 --verbose

# Re-pair
moltbot users unpair +84987654321
# User send /pair again
```

---

## Compliance & Privacy

### GDPR Considerations

**User data stored:**
- User ID (phone/username)
- Pairing timestamp
- Chat history
- Agent assignments

**User rights:**
```bash
# Export user data
moltbot users export +84987654321 --format json

# Delete user data
moltbot users delete +84987654321 --purge

# Anonymize
moltbot users anonymize +84987654321
```

### Audit Trail

```bash
# View pairing history
moltbot audit --event pairing --since "30 days"

# Export for compliance
moltbot audit export --format csv --output audit.csv
```

---

## Resources

- [Access Control Examples](https://github.com/moltbot-vn/examples/access-control)
- [Tools Security](/docs/advanced/exec-security)
- [Multi-Agent Guide](/docs/concepts/multi-agent)

---

_Questions? [Discord #security](https://discord.gg/moltbot-vn)_
