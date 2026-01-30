---
slug: xay-chatbot-telegram-30-phut
title: Xây dựng Chatbot Telegram với Moltbot trong 30 phút
authors: [moltbot-vn]
tags: [tutorial, telegram, beginner]
---

# Xây dựng Chatbot Telegram với Moltbot trong 30 phút

Telegram là nền tảng **dễ nhất** để bắt đầu với Moltbot. Không cần QR scan như WhatsApp, không cần OAuth phức tạp như Discord.

Chỉ cần **bot token** là xong!

<!--truncate-->

## Tại sao chọn Telegram?

✅ **Setup nhanh nhất** - Token + paste = done  
✅ **API mạnh** - File sharing, inline buttons, webhooks  
✅ **Miễn phí** - Không limit messages  
✅ **Cross-platform** - Desktop, mobile, web  
✅ **Developer-friendly** - Docs tốt, community lớn

---

## Bước 1: Tạo Bot trên Telegram (5 phút)

### 1.1. Mở [@BotFather](https://t.me/BotFather)

BotFather là "cha đẻ" của mọi bot Telegram. Mở app Telegram và search `@BotFather`

### 1.2. Tạo bot mới

Gửi lệnh:
```
/newbot
```

Bot sẽ hỏi:
```
BotFather: Alright, a new bot. How are we going to call it? 
           Please choose a name for your bot.

Bạn: Moltbot VN Assistant
```

### 1.3. Chọn username

```
BotFather: Good. Now let's choose a username for your bot. 
           It must end in `bot`. Like this: TetrisBot or tetris_bot.

Bạn: moltbot_vn_assistant_bot
```

:::tip[Username rules]
- Phải kết thúc bằng `bot`
- Chỉ chứa a-z, 0-9, và underscore
- Phải unique (chưa ai dùng)
:::

### 1.4. Lấy token

BotFather sẽ trả lời:
```
Done! Congratulations on your new bot. 

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567

For a description of the Bot API, see this page: 
https://core.telegram.org/bots/api
```

**QUAN TRỌNG:** Copy token này! Sẽ dùng ngay sau.

---

## Bước 2: Kết nối Bot với Moltbot (10 phút)

Giả sử bạn đã cài Moltbot ([Quick Start](/docs/getting-started/quick-start))

### 2.1. Login channel

```bash
moltbot channels login telegram
```

### 2.2. Paste token

```
? Enter your Telegram bot token: 
[Paste token ở đây]
```

### 2.3. Verify connection

```bash
moltbot channels list
```

Output:
```
✓ telegram (@moltbot_vn_assistant_bot) - Connected
```

🎉 **Done!** Bot đã kết nối.

---

## Bước 3: Test bot (2 phút)

### 3.1. Tìm bot của bạn

Trong Telegram, search username: `@moltbot_vn_assistant_bot`

### 3.2. Start conversation

Click **Start** hoặc gửi:
```
/start
```

Bot sẽ trả lời:
```
Xin chào! Tôi là Moltbot - trợ lý AI chạy trên máy của bạn.
Tôi có thể giúp gì cho bạn?
```

### 3.3. Thử nghiệm

```
Bạn: Xin chào! Bạn có thể làm gì?

Bot: Chào bạn! Tôi có thể:
     - Trả lời câu hỏi
     - Quản lý files trên máy
     - Tìm kiếm thông tin
     - Nhắc nhở lịch trình
     - Và nhiều hơn nữa!
     
     Bạn muốn thử tính năng nào?
```

✅ **Hoạt động!**

---

## Bước 4: Customize bot (10 phút)

### 4.1. Đổi ảnh đại diện

Gửi trong chat với BotFather:
```
/setuserpic
```

Chọn bot → Gửi ảnh

### 4.2. Thêm description

```
/setdescription
```

Example:
```
Trợ lý AI cá nhân chạy trên Moltbot.
Hỗ trợ tiếng Việt, tự động hóa công việc hàng ngày.
```

### 4.3. Set commands

```
/setcommands
```

Paste:
```
start - Bắt đầu conversation
help - Hiện hướng dẫn
status - Check bot status
settings - Cấu hình bot
```

Giờ user có thể thấy menu commands:

![Commands Menu](https://i.imgur.com/example.png)

### 4.4. About text

```
/setabouttext
```

Example:
```
Moltbot VN - Self-hosted AI assistant
https://moltbot-vn.dev
```

---

## Bước 5: Advanced features (Optional)

### 5.1. Inline buttons

Tạo interactive messages:

```javascript
// Trong Moltbot config hoặc plugin
{
  "text": "Chọn action:",
  "buttons": [
    {"text": "📁 List files", "callback": "list_files"},
    {"text": "📅 Check calendar", "callback": "check_cal"}
  ]
}
```

### 5.2. File sharing

```
Bạn: Gửi cho tôi file report.pdf

Bot: ✅ Đây nhé!
[Sends file]
```

### 5.3. Image analysis

```
Bạn: [Gửi ảnh]
     Phân tích ảnh này

Bot: Đây là biểu đồ cột thể hiện...
     - Trục X: Tháng
     - Trục Y: Doanh thu
     - Trend: Tăng đều
```

### 5.4. Voice messages (if configured)

```
Bạn: [Gửi voice message]

Bot: [Transcribe]
     Bạn nói: "Nhắc tôi meeting lúc 3PM"
     
     ✅ Đã set reminder!
```

---

## Use Cases thực tế

### 1. Personal Assistant

```
8AM: Bot: 🌅 Chào buổi sáng!
         Hôm nay bạn có 3 meetings.
         Weather: 28°C, Sunny

You: Tóm tắt emails chưa đọc

Bot: Bạn có 12 emails:
     [Top 3 important ones...]
```

### 2. File Manager

```
You: Tìm file "presentation.pptx"

Bot: Tìm thấy 2 files:
     1. ~/Documents/presentation.pptx (modified today)
     2. ~/Downloads/presentation.pptx (3 days ago)
     
     Bạn cần file nào?

You: File 1

Bot: [Sends file via Telegram]
```

### 3. Quick Notes

```
You: Note: Mua sữa về nhà

Bot: ✅ Đã lưu note.
     Total notes hôm nay: 5

You: Show notes hôm nay

Bot: 📝 Notes:
     1. Meeting prep - 9AM
     2. Call client - 11AM
     ...
     5. Mua sữa về nhà - Just now
```

### 4. Reminders

```
You: Remind me "Gửi báo cáo" at 5PM

Bot: ✅ Set reminder cho 5PM hôm nay

[5PM]
Bot: 🔔 Reminder: Gửi báo cáo
```

---

## Tips & Best Practices

### 1. Security

❌ **ĐỪNG:**
- Share bot token publicly
- Add bot vào group chưa trust
- Cho phép strangers chat với bot

✅ **NÊN:**
```bash
# Giới hạn users được phép
moltbot config set telegram.allowedUsers "123456789,987654321"

# Mã hóa sensitive responses
moltbot config set telegram.encryption true
```

### 2. Rate Limiting

Telegram giới hạn:
- 30 messages/second per bot
- 20 messages/minute per chat

Moltbot auto-handle, nhưng nếu cần:

```bash
moltbot config set telegram.rateLimit.enabled true
moltbot config set telegram.rateLimit.messagesPerSecond 20
```

### 3. Error Handling

```bash
# Auto-retry failed messages
moltbot config set telegram.retryFailed true

# Alert on errors
moltbot config set telegram.errorNotify true
```

### 4. Logging

```bash
# Log all messages (for debugging)
moltbot config set telegram.logMessages true

# Log location
~/.moltbot/logs/telegram-YYYY-MM-DD.log
```

---

## Troubleshooting

### Bot không trả lời

**Check:**
```bash
# Gateway running?
moltbot status

# Channel connected?
moltbot channels list

# Logs
moltbot logs --filter telegram
```

**Common issues:**
- Gateway stopped → `moltbot gateway`
- Token invalid → Re-login
- Network issues → Check firewall

### "Unauthorized" error

Token sai hoặc bot bị delete.

**Fix:**
1. Create new bot qua BotFather
2. Re-login: `moltbot channels login telegram`

### Messages delayed

**Possible causes:**
- High API usage → Check rate limits
- Poor network → Test: `ping api.telegram.org`
- Gateway overloaded → Check `moltbot status`

---

## Next Steps

🎉 **Chúc mừng!** Bạn đã có chatbot Telegram hoạt động!

### Tiếp theo:

1. **Add WhatsApp:** [WhatsApp Integration Guide](/docs/installation/whatsapp)
2. **Automation:** [Setup Cron Jobs](/docs/advanced/automation)
3. **Plugins:** [Gmail Integration](/docs/advanced/plugins)
4. **Deploy:** [Production Setup](/docs/installation/production)

### Join community:

- 💬 [Telegram Group](https://t.me/moltbotvn) - Hỏi đáp real-time
- 🌟 Share bot của bạn trong [Showcase](/showcase)
- 📖 Đọc thêm [Use Cases](/showcase)

---

**Có câu hỏi?** Comment bên dưới hoặc hỏi trong Telegram group!
