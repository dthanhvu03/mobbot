---
sidebar_position: 1
title: Tích hợp Đa kênh (Telegram, Zalo, Discord) | Channels Guide
description: Kết nối Moltbot với 20+ nền tảng chat phổ biến nhất. Hướng dẫn chi tiết setup Telegram Bot, Zalo OA (Zalo cá nhân), Discord, WhatsApp và Slack. Quản lý AI Agent từ bất kỳ đâu.
keywords: [moltbot channels, telegram bot setup, zalo bot api, hướng dẫn tạo bot zalo, kết nối discord, chatops ai, whatsapp automation, auto reply bot, ai agent đa kênh]
image: https://mobbot.vercel.app/img/docusaurus-social-card.jpg
---

# Channels Overview - 20+ Platforms

Moltbot hỗ trợ **20+ messaging platforms**, cho phép bạn điều khiển bot từ bất kỳ đâu.

## Quick Comparison

| Platform | Setup Method | Time | Plugin? | Best For |
|----------|-------------|------|---------|----------|
| **Telegram** | Bot token | 5 min | ❌ Built-in | Easiest start |
| **WhatsApp** | QR scan | 3 min | ❌ Built-in | Most popular |
| **Zalo** 🇻🇳 | Bot API / QR | 5-20 min | ✅ Required | Vietnam market |
| **Discord** | Bot token | 10 min | ❌ Built-in | Gaming/Dev communities |
| **Slack** | OAuth | 10 min | ❌ Built-in | Team collaboration |
| **Signal** | CLI setup | 15 min | ❌ Built-in | Privacy-focused |
| **Google Chat** | Service account | 15 min | ❌ Built-in | Enterprise |
| **Microsoft Teams** | Bot Framework | 20 min | ✅ Plugin | Enterprise |
| **iMessage** | imsg CLI | 5 min | ❌ Built-in | macOS only |
| **BlueBubbles** | REST API | 10 min | ❌ Built-in | iMessage (better) |
| **Mattermost** | Bot token | 15 min | ✅ Plugin | Self-hosted teams |
| **LINE** | Bot API | 15 min | ✅ Plugin | Japan/Thailand |
| **Matrix** | Homeserver | 20 min | ✅ Plugin | Federated |
| **Nostr** | NIP-04 | 10 min | ✅ Plugin | Decentralized |
| **Nextcloud Talk** | App token | 15 min | ✅ Plugin | Self-hosted |
| **Twitch** | IRC | 10 min | ✅ Plugin | Streaming |
| **Tlon** | Urbit | 30 min | ✅ Plugin | Urbit network |

---

## Recommended Starting Points

### 🚀 Beginner-Friendly

1. **Telegram** - Easiest setup, bot token trong 5 phút
2. **WhatsApp** - QR scan, instant setup
3. **Zalo** (for Vietnam) - QR scan personal hoặc Bot API

### 💼 Business/Enterprise

1. **Slack** - Team collaboration
2. **Google Chat** - G Suite integration
3. **Microsoft Teams** - Microsoft ecosystem
4. **Zalo Bot API** - Vietnam business

### 🔒 Privacy-Focused

1. **Signal** - End-to-end encryption
2. **Matrix** - Federated, open source
3. **Nextcloud Talk** - Self-hosted

### 🌍 Regional

- **Vietnam:** Zalo
- **Japan/Thailand:** LINE
- **Global:** WhatsApp, Telegram
- **Gaming:** Discord
- **Enterprise:** Slack, Teams, Google Chat

---

## Setup Guides

### Core Platforms (Built-in)

#### WhatsApp
[Full Guide →](/docs/channels/whatsapp)

**Quick setup:**
```bash
moltbot channels login whatsapp
# QR code appears → Scan with phone → Done!
```

#### Telegram
[Full Guide →](/docs/channels/telegram)

**Quick setup:**
1. Create bot via [@BotFather](https://t.me/BotFather)
2. Get token
3. Configure:
```bash
moltbot channels login telegram
# Paste token → Done!
```

#### Discord
[Full Guide →](/docs/channels/discord)

**Quick setup:**
1. Create app at [Discord Developer Portal](https://discord.com/developers/applications)
2. Get bot token
3. Configure:
```bash
moltbot channels login discord
```

#### Zalo 🇻🇳
[Full Guide →](/docs/channels/zalo)

**Quick setup (Personal):**
```bash
moltbot channels login zalouser
# QR scan → Done!
```

---

### Extended Platforms (Plugins)

#### Microsoft Teams

**Install:**
```bash
npm install -g @moltbot-ext/channel-msteams
```

**Setup:** Xem [Teams Guide (Đang cập nhật)](#)

#### LINE

**Install:**
```bash
npm install -g @moltbot-ext/channel-line
```

**Setup:** Xem [LINE Guide (Đang cập nhật)](#)

#### Matrix

**Install:**
```bash
npm install -g @moltbot-ext/channel-matrix
```

**Setup:** Xem [Matrix Guide (Đang cập nhật)](#)

---

## Features Comparison

### Text & Media Support

| Platform | Text | Images | Files | Voice | Video | Stickers |
|----------|------|--------|-------|-------|-------|----------|
| WhatsApp | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Telegram | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Signal | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Zalo | ✅ | ✅ | ✅ | ⚠️ | ❌ | ✅ |

### Group Support

| Platform | Groups | Mentions | Admin | Threads |
|----------|--------|----------|-------|---------|
| WhatsApp | ✅ | ✅ | ⚠️ | ❌ |
| Telegram | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ | ✅ |
| Signal | ✅ | ✅ | ❌ | ❌ |

---

## Access Control

### DM Policies

Mọi channel đều hỗ trợ 4 DM access modes:

1. **pairing** (default, recommended)
   ```json
   {"dmPolicy": "pairing"}
   ```
   User phải được approve trước

2. **allowlist**
   ```json
   {
     "dmPolicy": "allowlist",
     "allowFrom": ["+84987654321", "user_id"]
   }
   ```
   Chỉ users trong list

3. **open** (⚠️ dangerous)
   ```json
   {"dmPolicy": "open"}
   ```
   Ai cũng chat được

4. **disabled**
   ```json
   {"dmPolicy": "disabled"}
   ```
   Tắt DM hoàn toàn

### Group Mention Gating

```json
{
  "groups": {
    "*": {
      "requireMention": true  // Phải @ bot
    },
    "group_123": {
      "requireMention": false  // Bot luôn nghe
    }
  }
}
```

---

## Multi-Channel Strategy

### Scenario 1: Personal Use

```
Telegram → Quick commands
WhatsApp → Main conversations  
Zalo → Vietnam contacts
```

### Scenario 2: Business

```
Slack → Internal team
Google Chat → Enterprise clients
Zalo → Vietnam customers
WhatsApp → International clients
```

### Scenario 3: Privacy-First

```
Signal → Personal
Matrix → Communities
Nextcloud → Team collaboration
```

---

## Troubleshooting

### Channel Not Connecting

```bash
# 1. Check status
moltbot channels list

# 2. Check logs
moltbot logs --filter channels

# 3. Re-login
moltbot channels login <platform>
```

### Messages Not Sending

**Common issues:**
- Gateway not running: `moltbot status`
- Token expired: Re-login
- Rate limited: Check platform limits
- Network blocked: Check firewall

### Multi-Channel Issues

**Conflict resolution:**
- Each channel runs independently
- No cross-talk by default
- Use agent routing for multi-channel

---

## Next Steps

1. Pick your platform(s)
2. Follow setup guide
3. Configure access control
4. Test with messages
5. Join community for tips!

---

## Resources

- [Security Best Practices](/docs/security/best-practices)
- [Multi-Agent Routing](/docs/concepts/multi-agent)
- [Hướng dẫn sửa lỗi](/docs/troubleshooting/common-errors)

---

_Need help? Join [Discord](https://discord.gg/moltbot-vn) or [Telegram](https://t.me/moltbotvn)_
