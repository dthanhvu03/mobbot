---
sidebar_position: 2
title: Multi-Agent Routing
description: Cơ chế định tuyến thông minh (Routing) trong Moltbot. Phân phối tin nhắn đến đúng Agent dựa trên Channel, User hoặc Nội dung.
keywords: [moltbot routing, multi-agent bindings, phân luồng tin nhắn, ai router, agent assignment]
---

# Multi-Agent Routing

Cách Moltbot phân chia công việc cho nhiều Agents (Nhân cách).

## The Concept

Một Gateway có thể chạy **Nhiều Agent**. Ví dụ:
- **Home Agent:** Quản lý nhà cửa, nhắc lịch (Friendly, permissions thấp).
- **Work Agent:** Coding, server management (Professional, high permissions).

## Routing Rules (`bindings`)

Gateway quyết định Agent nào xử lý tin nhắn dựa trên `bindings`.

Location: `~/.clawdbot/moltbot.json`

```json
{
  "agents": {
    "list": [
      { "id": "home", "name": "House Bot" },
      { "id": "work", "name": "Dev Bot" }
    ],
    "bindings": [
      // Rule 1: WhatsApp cá nhân -> Home Agent
      {
        "agentId": "home",
        "match": {
          "channel": "whatsapp",
          "accountId": "personal"
        }
      },
      // Rule 2: Telegram công ty -> Work Agent
      {
        "agentId": "work",
        "match": {
          "channel": "telegram"
        }
      },
      // Rule 3: Specific User -> Work Agent (Override)
      {
        "agentId": "work",
        "match": {
          "channel": "whatsapp",
          "peer": { "id": "boss_phone_number" }
        }
      }
    ]
  }
}
```

## Logic Xử Lý

Khi tin nhắn đến:
1. Gateway duyệt danh sách `bindings` từ trên xuống.
2. Rule đầu tiên **Match** sẽ thắng.
3. Nếu không rule nào match -> dùng **Default Agent**.

## Use Cases

### 1. Home vs Work Partitioning
Tách biệt hoàn toàn data. "Home Agent" không thể access workspace của "Work Agent".

### 2. High Security Zone
Tạo một "Secure Agent" chỉ cho phép access từ Telegram ID của bạn, có quyền `exec`. Các channel khác dùng "Guest Agent" chỉ có quyền `read`.

### 3. Topic-based Routing (Advanced)
(Sắp ra mắt) Routing dựa trên nội dung tin nhắn (Classifier).
