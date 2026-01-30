---
sidebar_position: 3
title: 🔵 Tích hợp Zalo (Cá nhân & OA)
sidebar_label: 🔵 Zalo (Cá nhân & OA)
description: Hướng dẫn kết nối Moltbot với Zalo để tạo Chatbot AI tự động. Hỗ trợ cả Zalo cá nhân (via QR Code) và Zalo Official Account (OA).
keywords: [tạo bot zalo, chatbot zalo ai, tích hợp ai vào zalo, moltbot zalo guide, zalo oa chatbot ai, tự động hóa zalo]
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tích hợp Zalo Bot

Zalo là ứng dụng nhắn tin phổ biến nhất tại Việt Nam. Với Moltbot, bạn có thể biến tài khoản Zalo cá nhân hoặc Zalo Official Account (OA) của mình thành một trợ lý AI thông minh, hỗ trợ khách hàng hoặc quản lý công việc 24/7.

<Admonition type="info" title="Hỗ trợ 2 loại tài khoản">
1.  **Zalo Cá nhân (User)**: Đăng nhập đơn giản bằng quét mã QR. Phù hợp cho cá nhân sử dụng hoặc làm trợ lý riêng.
2.  **Zalo OA (Business)**: Kết nối qua API chính thức. Phù hợp cho doanh nghiệp cần quản lý khách hàng chuyên nghiệp.
</Admonition>

---

## 🧘 Phương án 1: Zalo Cá nhân (QR Code)

Đây là cách nhanh nhất để đưa AI vào Zalo mà không cần đăng ký thủ tục phức tạp.

### Bước 1: Login qua CLI
Mở terminal và chạy lệnh:

```bash
moltbot channels login zalouser
```

### Bước 2: Quét mã QR
1.  Một mã QR sẽ hiển thị ngay trên terminal (hoặc qua link dashboard).
2.  Mở Zalo trên điện thoại -> Chọn Quét mã QR.
3.  Xác nhận đăng nhập trên điện thoại.

### Bước 3: Kiểm tra trạng thái
```bash
moltbot channels list
```
Nếu thấy dòng `✓ zalouser (tên của bạn) - Connected` là thành công!

---

## 🏢 Phương án 2: Zalo Official Account (API)

Dành cho các shop hoặc doanh nghiệp muốn dùng Bot chính thống.

### Bước 1: Tạo ứng dụng trên Zalo Developers
1.  Truy cập [Zalo Developers Portal](https://developers.zalo.me/).
2.  Tạo "Ứng dụng mới".
3.  Trong mục **Official Account**, chọn OA mà bạn muốn tích hợp.

### Bước 2: Lấy Access Token & Secret Key
Bạn sẽ cần:
-   **OA ID**
-   **App ID**
-   **Secret Key**
-   **Access Token** (Cần refresh thường xuyên hoặc dùng Long-lived token).

### Bước 3: Cấu hình Moltbot
Mở `moltbot.json` và thêm cấu hình:

```json
{
  "channels": {
    "zalo-oa": {
      "enabled": true,
      "appId": "YOUR_APP_ID",
      "secretKey": "YOUR_SECRET_KEY",
      "oaId": "YOUR_OA_ID"
    }
  }
}
```

---

## 🛡️ Bảo mật & Quản lý truy cập

Moltbot cung cấp các cơ chế bảo mật cực kỳ quan trọng để bảo vệ tài khoản Zalo của bạn khỏi việc bị spam hoặc lạm dụng AI Token.

### 1. Chế độ Pairing (Khuyên dùng)
Khi có người lạ nhắn tin, Moltbot sẽ không trả lời ngay. Nó sẽ gửi 1 yêu cầu phê duyệt cho bạn. Sau khi bạn chọn **Approve**, Bot mới bắt đầu chat với người đó.

### 2. Allowlist (Danh sách cho phép)
Bạn có thể chỉ định chỉ những số điện thoại hoặc UserID cụ thể mới được dùng Bot:

```json
{
  "channels": {
    "zalouser": {
      "allowedUsers": ["84987654321", "UserID_xyz"]
    }
  }
}
```

---

## ✨ Các tính năng AI trên Zalo

### 🤖 Tự động trả lời khách hàng
Cấu hình Agent với các "Instruction" cụ thể về sản phẩm. Bot sẽ tự vấn khách, báo giá và thậm chí là chốt đơn thay bạn.

### 📁 Xử lý Tài liệu & Hình ảnh
-   **Gửi ảnh**: Bot có thể đọc menu, hóa đơn hoặc phân tích ảnh sản phẩm khách gửi.
-   **Gửi file**: Bot có thể tóm tắt hợp đồng gửi qua Zalo ngay lập tức.

### ⏰ Nhắc lịch & Thông báo (Proactive)
Dùng Moltbot để đặt lịch nhắc khách hàng:
*"Nhắc tôi nhắn tin cho anh Nam sau 2 tiếng nữa để hỏi về hợp đồng"* -> Đúng 2 tiếng sau Bot sẽ nhắn cho bạn hoặc nhắn thẳng cho anh Nam nếu bạn cho phép.

---

## ❓ Câu hỏi thường gặp (FAQ)

**Q: Dùng Zalo cá nhân có bị khóa tài khoản không?**
A: Moltbot mô phỏng hành vi người dùng một cách an toàn. Tuy nhiên, bạn không nên dùng Bot để spam hàng loạt hoặc gửi tin nhắn rác. Hãy dùng với mục đích trợ lý để đảm bảo an toàn cao nhất.

**Q: Bot có hiểu tiếng Việt không?**
A: Moltbot dùng các model hàng đầu như Claude 3.5 Sonnet hoặc GPT-4o, nên khả năng hiểu và viết tiếng Việt cực kỳ tự nhiên, có cảm xúc và đúng ngữ pháp.

**Q: Tại sao mã QR không hiện?**
A: Hãy đảm bảo terminal của bạn hỗ trợ hiển thị ký tự đặc biệt hoặc truy cập vào link Dashboard local `http://localhost:18789` để quét.

---

## Bước tiếp theo
- [Cấu hình AI Agent chuyên sâu](/docs/advanced/tools-overview)
- [Quản lý nhiều Agent (Multi-Agent)](/docs/concepts/multi-agent)
- [Bảo mật & Sandbox](/docs/gateway/sandboxing)
