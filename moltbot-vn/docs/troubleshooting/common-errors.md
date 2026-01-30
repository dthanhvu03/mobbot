---
title: Khắc phục lỗi thường gặp - Troubleshooting Moltbot
sidebar_label: 🔧 Lỗi thường gặp
description: Tổng hợp các lỗi phổ biến khi cài đặt và sử dụng Moltbot (Clawdbot) và cách khắc phục triệt để. Permission denied, Port in use, Node version error.
keywords: [lỗi moltbot, troubleshooting moltbot, permission denied, eaddrinuse 18789, nodejs error]
sidebar_position: 1
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🔧 Khắc phục lỗi thường gặp (Troubleshooting)

Trong quá trình cài đặt và vận hành Moltbot, bạn có thể gặp một số vấn đề kỹ thuật. Dưới đây là danh sách các lỗi phổ biến nhất và giải pháp **đã được kiểm chứng**.

## 🔴 1. Lỗi "EADDRINUSE: address already in use"

**Triệu chứng:**
Khi chạy lệnh `moltbot gateway`, terminal báo lỗi và thoát ngay lập tức.

```bash
Error: listen EADDRINUSE: address already in use :::18789
```

**Nguyên nhân:**
Cổng (Port) mặc định `18789` của Moltbot đang bị chiếm dụng bởi một tiến trình khác (hoặc chính Moltbot instance cũ chưa tắt hẳn).

**Giải pháp:**

<Tabs groupId="os">
  <TabItem value="unix" label="🐧 Linux/macOS" default>
    **Bước 1: Tìm process đang chiếm port**
    ```bash
    lsof -i :18789
    ```
    
    **Bước 2: Kill process đó**
    ```bash
    kill -9 [PID]
    # Ví dụ: kill -9 12345
    ```

    **Hoặc dùng lệnh tắt nhanh:**
    ```bash
    npx kill-port 18789
    ```
  </TabItem>
  <TabItem value="win" label="🪟 Windows (Powershell)">
    **Bước 1: Tìm process**
    ```powershell
    netstat -ano | findstr :18789
    ```
    
    **Bước 2: Kill process**
    ```powershell
    taskkill /PID [PID] /F
    ```
  </TabItem>
</Tabs>

<Admonition type="tip" title="Cách đổi Port">
  Nếu không muốn kill process cũ, bạn có thể chạy Moltbot trên port khác:
  ```bash
  moltbot gateway --port 19000
  ```
</Admonition>

---

## 🔴 2. Lỗi "Permission denied" (EACCES)

**Triệu chứng:**
```bash
Error: EACCES: permission denied, mkdir '/root/.moltbot'
```
Hoặc không thể cài đặt global package.

**Nguyên nhân:**
Bạn đang cài đặt Moltbot với quyền `root` nhưng lại chạy với user thường, hoặc ngược lại. Vấn đề này rất phổ biến trên **Ubuntu** và **WSL2**.

**Giải pháp:**

**Cách 1: Fix quyền Owner (Khuyên dùng)**
```bash
# Chuyển quyền sở hữu thư mục config về user hiện tại
sudo chown -R $USER:$USER ~/.moltbot
sudo chown -R $USER:$USER ~/.npm
```

**Cách 2: Dùng NPM không cần Sudo**
Xem hướng dẫn [cài đặt Node.js chuẩn](/docs/getting-started/requirements#appendix-cài-đặt-nodejs) để tránh lỗi permission vĩnh viễn.

---

## 🔴 3. Lỗi Node.js Version cũ

**Triệu chứng:**
```bash
SyntaxError: Unexpected token '??='
# hoặc
ReferenceError: fetch is not defined
```

**Nguyên nhân:**
Moltbot yêu cầu **Node.js v22+** để sử dụng các tính năng mới nhất của Javascript và Native Fetch API. Bạn đang dùng Node 18, 16 hoặc thấp hơn.

**Giải pháp:**
Bắt buộc phải nâng cấp.

```bash
# Kiểm tra version hiện tại
node -v 

# Nâng cấp bằng NVM (Linux/macOS)
nvm install 22
nvm use 22
nvm alias default 22

# Windows
# Tải installer mới nhất từ nodejs.org
```

---

## 🔴 4. Bot không trả lời (No Response)

**Triệu chứng:**
Chat trên Terminal hoặc Telegram nhưng Bot im lặng, không có tin nhắn trả lời, cũng không báo lỗi.

**Checklist kiểm tra:**

1.  **Kiểm tra Credit:** API Key của Anthropic có còn credit không? (Vào console.anthropic.com check Billing).
2.  **Kiểm tra Logs:**
    Mở terminal mới và chạy:
    ```bash
    moltbot logs --follow
    ```
    Xem lỗi gì đang bắn ra real-time.
3.  **Gateway Status:** Đảm bảo gateway vẫn đang chạy (không bị crash ngầm).

---

## 🏗️ Cần hỗ trợ thêm?

Nếu lỗi của bạn không có trong danh sách trên:

1.  **Chụp ảnh màn hình lỗi.**
2.  **Copy file log:** `~/.moltbot/logs/error.log`
3.  **Gửi lên [Discord Community](https://discord.gg/moltbot-vn)** kênh `#support`.

<Admonition type="info" title="Lưu ý khi báo lỗi">
  Hãy che đi **API Key** và các thông tin nhạy cảm trước khi post log lên cộng đồng!
</Admonition>
