---
sidebar_position: 1
title: Triển khai Railway
description: Hướng dẫn deploy Moltbot lên Railway.app chỉ với 1 click. Giải pháp cloud hosting miễn phí/giá rẻ tốt nhất cho AI Agent.
keywords: [deploy moltbot railway, moltbot cloud, hosting ai agent, railway template]
---

# Deploy on Railway

Deploy Moltbot lên Railway chỉ với **1 click**.

## Quick Start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moltbot-railway-template)

1. Click nút **Deploy** ở trên.
2. Railway sẽ yêu cầu bạn set các biến môi trường (Variables):
   - `SETUP_PASSWORD`: Mật khẩu để truy cập setup wizard (Bắt buộc).
   - `ANTHROPIC_API_KEY`: Web setup sẽ hỏi sau, hoặc set luôn ở đây.
3. Chờ deploy xong (khoảng 2 phút).

## Configuration

Sau khi deploy, bạn sẽ nhận được một domain (e.g., `moltbot-production.up.railway.app`).

### Access Setup Wizard
Truy cập: `https://<your-domain>/setup`

Login bằng `SETUP_PASSWORD` bạn đã set. Wizard sẽ hướng dẫn bạn cấu hình các bước còn lại.

### Persistent Storage
Template mặc định đã cấu hình **Volume** tại `/data`.
- Mọi config và workspace sẽ được lưu ở đây.
- Dữ liệu **không mất** khi redeploy.

### Updating
Railway tự động build lại khi có commit mới nếu bạn fork repo. Hoặc bạn có thể trigger redeploy thủ công.

## Troubleshooting

**Logs:**
Xem logs trực tiếp trong Railway Dashboard để debug lỗi khởi động.

**Networking:**
Mặc định Gateway chạy port `18789` (WebSocket) và `80/443` (HTTP). Railway handle HTTPS termination cho bạn.
