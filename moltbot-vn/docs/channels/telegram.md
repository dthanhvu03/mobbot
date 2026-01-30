---
sidebar_position: 2
title: 📬 Tích hợp Telegram Bot
sidebar_label: 📬 Telegram Bot
description: Hướng dẫn chi tiết cách kết nối Moltbot với Telegram. Từ việc lấy Token từ BotFather đến cấu hình bảo mật đa người dùng và tích hợp AI Agent vào nhóm Telegram.
keywords: [tạo bot telegram, tích hợp ai telegram, chatbot telegram ai, hướng dẫn moltbot telegram, telegram bot api việt nam]
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tích hợp Telegram Bot

Telegram là nền tảng được khuyến nghị nhất khi bắt đầu với Moltbot vì tính ổn định cao, API mạnh mẽ và hoàn toàn miễn phí.

<Admonition type="tip" title="Tại sao chọn Telegram?">
- **Dễ nhất**: Chỉ cần 1 Token là chạy ngay.
- **Mượt nhất**: Hỗ trợ đầy đủ định dạng file, ảnh, và nút bấm (Inline Buttons).
- **An toàn**: Bạn có thể giới hạn chính xác ai mới được phép trò chuyện với Bot.
</Admonition>

---

## Bước 1: Lấy Token từ @BotFather

Để Moltbot có thể "nói chuyện" trên Telegram, bạn cần tạo một con Bot ảo thông qua Bot chính thức của Telegram.

1.  Mở ứng dụng Telegram và tìm kiếm người dùng **[@BotFather](https://t.me/BotFather)**.
2.  Gửi lệnh `/newbot` để bắt đầu.
3.  **Đặt tên cho Bot**: Đây là tên hiển thị (Ví dụ: `Moltbot Của Tôi`).
4.  **Đặt Username**: Phải kết thúc bằng chữ `bot` (Ví dụ: `my_molt_ai_bot`).
5.  BotFather sẽ gửi cho bạn một chuỗi ký tự gọi là **HTTP API Token**. Hãy lưu nó lại thật kỹ!

---

## Bước 2: Cấu hình Moltbot

Sau khi đã có Token, bạn có hai cách để kết nối:

### Cách 1: Sử dụng CLI (Nhanh nhất)

Mở terminal trên máy bạn đã cài Moltbot và chạy lệnh:

```bash
moltbot channels login telegram
```

Nhập Token khi được yêu cầu. Moltbot sẽ tự động kiểm tra kết nối và lưu vào cấu hình.

### Cách 2: Chỉnh sửa file `moltbot.json`

Mở file cấu hình (thường ở `~/.clawdbot/moltbot.json`) và thêm vào mục `channels`:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "YOUR_TELEGRAM_TOKEN_HERE"
    }
  }
}
```

---

## Bước 3: Bảo mật & Giới hạn người dùng

Mặc định, bất kỳ ai biết username Bot của bạn đều có thể nhắn tin. Để đảm bảo an toàn (tránh tiêu tốn token AI bừa bãi), bạn **PHẢI** giới hạn quyền truy cập.

### Chỉ cho phép người dùng cụ thể

Bạn có thể lấy `user_id` bằng cách nhắn tin cho Bot `@userinfobot`. Sau đó cấu hình:

```json
{
  "channels": {
    "telegram": {
      "allowedUsers": ["123456789", "987654321"]
    }
  }
}
```

### Chế độ Pairing (Khuyên dùng)

Moltbot có tính năng "Pairing". Khi một người lạ nhắn tin, Bot sẽ không trả lời mà gửi một yêu cầu phê duyệt đến dashboard hoặc máy chủ Gateway. Bạn chỉ cần Approve một lần để cho phép họ.

---

## Các tính năng nổi bật trên Telegram

### 📄 Xử lý File & Tài liệu
Gửi một file PDF hoặc văn bản cho Bot, kèm theo yêu cầu "Tóm tắt file này giúp tôi". Moltbot sẽ đọc nội dung và trả lời ngay trong chat.

### 🖼️ Thị giác máy tính (Vision)
Gửi ảnh cho Bot. Nếu bạn dùng model hỗ trợ Vision (như Claude 3.5 Sonnet), Bot có thể mô tả ảnh, trích xuất text từ ảnh (OCR) hoặc phân tích biểu đồ.

### 👥 Hoạt động trong Nhóm (Groups)
Thêm Bot vào nhóm và cấu hình:
- **Mention-only**: Bot chỉ trả lời khi được `@mention`.
- **Always-listening**: Bot lắng nghe mọi tin nhắn (Cẩn thận chi phí API!).

---

## Xử lý sự cố thường gặp

### 🔴 Bot không trả lời
- **Kiểm tra status**: Chạy `moltbot status` xem Gateway có đang online không.
- **Kiểm tra Token**: Thử lệnh `moltbot logs --filter telegram` để xem có lỗi "Unauthorized" không.
- **Mạng**: Đảm bảo máy chủ của bạn không chặn kết nối tới `api.telegram.org`.

---

## Bước tiếp theo
- [Tích hợp Zalo](/docs/channels/zalo)
- [Cấu hình AI Agent nâng cao](/docs/advanced/tools-overview)
- [Hướng dẫn bảo mật](/docs/security/best-practices)
