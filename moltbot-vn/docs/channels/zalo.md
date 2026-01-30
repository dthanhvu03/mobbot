---
sidebar_position: 1
title: Tích hợp Zalo Bot (Official & Personal)
description: Hướng dẫn chi tiết kết nối Moltbot với Zalo. Hỗ trợ Official Account (OA) qua API và Personal Account qua QR Code Login.
keywords: [zalo bot api, moltbot zalo, chatbot zalo ai, tự động hóa zalo, zalo oa integration]
---

# Tích hợp Zalo với Moltbot

:::info[Tại sao Zalo quan trọng?]
**Zalo là nền tảng nhắn tin #1 tại Việt Nam** với 75M+ người dùng active.

Nếu bạn muốn dùng Moltbot để tương tác với khách hàng, đồng nghiệp, hoặc bạn bè tại VN → **Zalo là MUST HAVE!**
:::

## 2 Cách tích hợp Zalo

Moltbot hỗ trợ 2 phương pháp kết nối Zalo:

### 1. Zalo Bot API (Official)

✅ **Best for:** Business, Official Account  
📦 **Plugin:** `@moltbot-ext/channel-zalo`  
⏱️ **Setup time:** 15-20 phút  

**Pros:**
- Chính thức từ Zalo
- Stable, reliable
- Phù hợp cho doanh nghiệp

**Cons:**
- Cần đăng ký Zalo Bot Platform
- Approval process
- Features giới hạn hơn personal

---

### 2. Zalo Personal (QR Login)

✅ **Best for:** Personal use  
📦 **Plugin:** `@moltbot-ext/channel-zalouser`  
⏱️ **Setup time:** 5 phút  

**Pros:**
- Setup cực nhanh (QR scan)
- Full features như dùng Zalo bình thường
- Không cần approval

**Cons:**
- Unofficial (risk bị ban nếu abuse)
- Phụ thuộc vào Zalo Web protocol
- Chỉ dùng cho personal

:::warning[Khuyến nghị]
- **Business/Professional:** Dùng Zalo Bot API
- **Personal/Testing:** Dùng Zalo Personal (QR)
:::

---

## Setup Zalo Bot API (Official)

### Bước 1: Tạo Zalo Bot

1. Truy cập: https://developers.zalo.me/
2. Đăng nhập với Zalo account
3. Tạo app mới → Chọn "Official Account"
4. Điền thông tin app:
   - Tên app
   - Icon
   - Mô tả
5. Submit để review (thường mất 1-2 ngày)

### Bước 2: Lấy Bot Token

Sau khi app được approve:

1. Vào App Dashboard
2. Settings → Tokens
3. Copy **Bot Access Token**

### Bước 3: Install Plugin

```bash
# Install plugin Zalo
npm install -g @moltbot-ext/channel-zalo

# Or nếu dùng pnpm
pnpm add -g @moltbot-ext/channel-zalo
```

### Bước 4: Configure Token

**Option 1: Via config file**

Thêm vào `~/.clawdbot/moltbot.json`:

```json
{
  "channels": {
    "zalo": {
      "enabled": true,
      "botToken": "YOUR_ZALO_BOT_TOKEN",
      "dmPolicy": "pairing"
    }
  }
}
```

**Option 2: Via environment variable**

```bash
export ZALO_BOT_TOKEN="YOUR_ZALO_BOT_TOKEN"
```

### Bước 5: Restart Gateway

```bash
moltbot gateway restart
# Or nếu đang chạy manual
moltbot gateway --port 18789
```

### Bước 6: Test

Gửi tin nhắn tới Official Account của bạn trên Zalo:

```
Xin chào bot!
```

Bot sẽ trả lời nếu setup đúng! 🎉

---

## Setup Zalo Personal (QR Login)

### Bước 1: Install Plugin

```bash
npm install -g @moltbot-ext/channel-zalouser
```

### Bước 2: Login via QR

```bash
moltbot channels login zalouser
```

**Sẽ hiện QR code** → Mở Zalo app → Quét QR → Login thành công!

### Bước 3: Test

Nhắn tin với chính mình hoặc bạn bè:

```
Hey, đây là Moltbot!
```

---

## Configuration Chi tiết

### Access Control (DM)

Giới hạn ai được phép chat với bot:

```json
{
  "channels": {
    "zalo": {
      "dmPolicy": "pairing",  // pairing | allowlist | open
      "allowFrom": [
        "0123456789",  // Phone numbers
        "user_id_123"
      ]
    }
  }
}
```

**DM Policies:**
- `pairing` (recommend): User phải được approve trước
- `allowlist`: Chỉ phone numbers trong list
- `open`: Ai cũng chat được (⚠️ nguy hiểm)

### Group Chat

Enable bot trong group:

```json
{
  "channels": {
    "zalo": {
      "groups": {
        "*": {
          "requireMention": true  // Phải @ bot mới trả lời
        },
        "group_id_abc": {
          "requireMention": false  // Bot luôn nghe
        }
      }
    }
  }
}
```

### Message Formatting

Zalo hỗ trợ formatting cơ bản:

```javascript
// Bot sẽ auto-format markdown to Zalo style
**Bold text**       → Zalo bold
*Italic text*       → Zalo italic
[Link](url)         → Zalo link
```

---

## Features & Limits

### ✅ Supported

| Feature | Zalo Bot API | Zalo Personal |
|---------|-------------|--------------|
| Text messages | ✅ | ✅ |
| Images | ✅ | ✅ |
| Files | ✅ | ✅ |
| Voice messages | ⚠️ Limited | ✅ |
| Stickers | ❌ | ✅ |
| Group chat | ✅ | ✅ |
| Read receipts | ✅ | ✅ |

### ⚠️ Limits

**Zalo Bot API:**
- 10,000 messages/day (free tier)
- Image size: < 5MB
- File size: < 10MB

**Zalo Personal:**
- No official limits
- But có thể bị rate limit nếu spam

---

## Troubleshooting

### Bot không trả lời

**Check:**
```bash
# 1. Gateway running?
moltbot status

# 2. Zalo channel connected?
moltbot channels list | grep zalo

# 3. Check logs
moltbot logs --filter zalo --follow
```

**Common issues:**
- Token invalid → Re-configure
- Not approved yet → Check Zalo dashboard
- Network blocked → Check firewall

### "Unauthorized" error

**Zalo Bot API:**
- Token expired → Get new token
- App not approved → Wait for review

**Zalo Personal:**
- Session expired → Re-login: `moltbot channels login zalouser`
- Account locked → Check Zalo app

### Messages delayed

- Zalo API có thể slow trong peak hours
- Check network: `ping api.zalo.me`
- Gateway overloaded: `moltbot health`

---

## Best Practices

### 1. Pairing Mode

**Luôn dùng pairing** cho DMs:

```json
{
  "channels": {
    "zalo": {
      "dmPolicy": "pairing"
    }
  }
}
```

User phải send `/pair` trước khi chat → Security!

### 2. Rate Limiting

Tránh spam để không bị Zalo ban:

```json
{
  "channels": {
    "zalo": {
      "rateLimit": {
        "enabled": true,
        "messagesPerMinute": 20
      }
    }
  }
}
```

### 3. Error Notifications

Alert khi có lỗi:

```json
{
  "channels": {
    "zalo": {
      "errorNotify": true,
      "notifyChannel": "telegram"  // Notify qua Telegram
    }
  }
}
```

### 4. Logging

Log all messages cho audit:

```json
{
  "channels": {
    "zalo": {
      "logMessages": true
    }
  }
}
```

Logs save tại: `~/.clawdbot/logs/zalo-YYYY-MM-DD.log`

---

## Use Cases cho VN Market

### 1. Customer Support Bot

```
Customer: Sản phẩm ABC giá bao nhiêu?
Bot: Sản phẩm ABC hiện giá 500,000 VND.
     Bạn muốn đặt hàng không?
```

### 2. Order Tracking

```
You: Track order #12345
Bot: 📦 Order #12345
     Status: Đang giao
     Expected: 2 ngày nữa
     Shipper: 0987654321
```

### 3. Appointment Booking

```
Customer: Đặt lịch khám ngày mai
Bot: Tôi tìm thấy 3 slots trống:
     1. 9:00 AM
     2. 2:00 PM
     3. 4:30 PM
     Bạn chọn slot nào?
```

### 4. Team Collaboration

Group chat với team:

```
@bot Deploy production
Bot: ✅ Deploying...
     [Progress bar]
     ✅ Deployed successfully!
     URL: https://prod.example.com
```

---

## Resources

- [Zalo Developer Docs](https://developers.zalo.me/docs)
- [Moltbot Channels Guide](/docs/channels/overview)
- [Plugin GitHub](https://github.com/moltbot-ext/channel-zalo)

---

## Cộng đồng

Tham gia thảo luận:

- 💬 [Discord #zalo-integration](https://discord.gg/moltbot-vn)
- 📱 [Telegram VN Group](https://t.me/moltbotvn)
- 🇻🇳 [Facebook Group](https://facebook.com/groups/moltbotvn)

---

_Cập nhật: 30 Jan 2026 - Moltbot VN Team_
