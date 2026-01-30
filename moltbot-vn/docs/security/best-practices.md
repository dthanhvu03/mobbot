---
title: Security Best Practices
description: Hướng dẫn bảo mật AI Agent chạy local. Cách sử dụng Sandbox, bảo vệ API Key và ngăn chặn Remote Code Execution (RCE) trên Moltbot.
keywords: [bảo mật ai agent, moltbot security, sandbox configuration, api key safety, prevent rce]
sidebar_position: 1
---

import Admonition from '@theme/Admonition';

# 🛡️ Security Best Practices

An toàn thông tin là ưu tiên số 1 khi chạy một AI Agent có khả năng "thực thi hành động" như Moltbot. Tài liệu này hướng dẫn bạn cách **Harden (tăng cứng)** hệ thống.

## 1. Cơ chế Pairing (Human-in-the-Loop)

Mặc định, Moltbot hoạt động ở chế độ **"Pairing Mode"**.

- **Nguyên lý:** Mỗi khi AI muốn thực hiện một hành động có rủi ro cao (system mutation), nó phải xin phép BẠN.
- **Rủi ro cao gồm:**
    - Ghi/Xóa/Sửa file.
    - Cài đặt package mới.
    - Chạy lệnh shell (terminal).
    - Gửi dữ liệu ra internet.

<Admonition type="danger" title="CẢNH BÁO QUAN TRỌNG">
  Tuyệt đối **KHÔNG tắt chế độ Pairing** (`auto_approve: true`) trừ khi bạn đang chạy trong môi trường Sandbox hoàn toàn cô lập (Docker/VM) và chấp nhận rủi ro mất dữ liệu.
</Admonition>

## 2. Sandbox Configuration

Để giới hạn phạm vi truy cập của Bot, hãy cấu hình **Workspace Root**.

Dưới đây là một cấu hình mẫu an toàn trong `config.json`:

```json
{
  "sandbox": {
    // Chỉ cho phép bot truy cập vào thư mục này
    "fs_root": "/home/user/moltbot_workspace",
    
    // Whitelist các lệnh được phép chạy auto (nếu cần)
    "safe_commands": ["ls", "cat", "echo", "grep"],
    
    // Block các lệnh nguy hiểm dù có pairing (Layer 2 defense)
    "blocked_commands": ["rm -rf /", "mkfs", "dd"]
  }
}
```

## 3. Quản lý API Key

Lộ API Key (Anthropic, OpenAI) là rủi ro phổ biến nhất.

### ✅ DOs (Nên làm):
- Lưu key trong biến môi trường (`.env` hoặc export).
- Sử dụng công cụ quản lý Secret nếu deploy production.
- Đặt **Usage Limit** (Giới hạn chi tiêu) trên Anthropic Console (ví dụ: $50/tháng) để tránh bị "bùng" tiền nếu lộ key.

### ❌ DON'Ts (Không nên):
- Không hard-code key vào source code plugin.
- Không gửi file `config.json` chứa key qua chat/email.
- Không commit file cấu hình lên Public GitHub.

## 4. Network Security (Cho Production)

Nếu bạn expose Moltbot Gateway ra internet (để chat từ xa):

1.  **Dùng Reverse Proxy:** Luôn đứng sau Nginx/Caddy vói SSL (HTTPS).
2.  **Authentication:** Bắt buộc bật **Basic Auth** hoặc **Bearer Token** trên Nginx. Moltbot Gateway mặc định không có Auth layer phức tạp (design choice để giữ core nhẹ).
3.  **VPN:** Cách an toàn nhất là **không expose port**, mà dùng **Tailscale** hoặc **WireGuard** để kết nối vào mạng nội bộ.

## 5. RCE Protection (Remote Code Execution)

Moltbot có khả năng viết code và chạy code. Về cơ bản, nó là một công cụ RCE "có kiểm soát".

Để ngăn chặn AI bị "lừa" (Prompt Injection) để chạy lệnh xấu:
1.  Luôn đọc kỹ lệnh Bot đề xuất trước khi gõ `y` (Yes).
2.  Không copy-paste prompt lạ từ internet vào Moltbot terminal.
3.  Giới hạn quyền của user chạy Moltbot (Không chạy bằng `root`).

---

<Admonition type="info" title="Báo cáo lỗ hổng">
  Nếu bạn tìm thấy lỗ hổng bảo mật, vui lòng email trực tiếp cho team tại: `security@moltbot.vn`. Chúng tôi có chương trình Bug Bounty.
</Admonition>
